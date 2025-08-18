import Media from "../models/Media.js";
import {
  success,
  error,
  createErrorWithCode,
} from "../utils/responseHandler.js";
import { ErrorTypes } from "../middleware/errorMiddleware.js";
import {
  getPaginationParams,
  createPaginationResponse,
} from "../utils/paginationHelper.js";
import { s3, bucketConfig } from "../config/s3.js";
import {
  logUploadRequest,
  logFileProcessing,
  logUploadError,
} from "../utils/uploadLogger.js";
import { generatePublicUrl } from "../utils/s3UrlGenerator.js";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";

// get all media files
export const getAllMedia = async (req, res) => {
  try {
    const { type } = req.query;
    const query = {};

    // add type to query if specified
    if (type) {
      query.fileType = type;
    }

    // using paginationHelper to get pagination params
    const { page, limit, skip } = getPaginationParams(req, {
      defaultLimit: 10,
      maxLimit: 50,
    });

    const options = {
      skip,
      limit,
      sort: { createdAt: -1 },
      populate: { path: "uploadedBy", select: "username" },
    };

    // parallel execution of query and count to improve performance
    const [media, total] = await Promise.all([
      Media.find(query)
        .skip(options.skip)
        .limit(options.limit)
        .sort(options.sort)
        .populate(options.populate),
      Media.countDocuments(query),
    ]);

    // using paginationHelper to create standard response format
    const result = createPaginationResponse({ page, limit, total }, media);

    return success(res, result, 200, "media.listSuccess");
  } catch (err) {
    // using standard error code
    return error(
      res,
      "media.listFailed",
      500,
      err,
      ErrorTypes.INTERNAL,
      "ES001" // system error
    );
  }
};

// get single media file
export const getMediaById = async (req, res) => {
  try {
    const { id } = req.params;

    // input validation
    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      throw createErrorWithCode("EV003", "Invalid media ID format", { id });
    }

    const media = await Media.findById(id).populate("uploadedBy", "username");

    if (!media) {
      // using standard resource not found error code
      throw createErrorWithCode("ER001", null, { resource: "media", id });
    }

    return success(res, media, 200);
  } catch (err) {
    // if it is already formatted error, pass it directly
    if (err.code && err.statusCode) {
      return error(res, "media.getFailed", err.statusCode, err, null, err.code);
    }

    // database error
    if (err.name === "CastError") {
      return error(
        res,
        "media.invalidId",
        400,
        err,
        ErrorTypes.VALIDATION,
        "EV003"
      );
    }

    // other unknown error
    return error(
      res,
      "media.getFailed",
      500,
      err,
      ErrorTypes.INTERNAL,
      "ES001"
    );
  }
};

// upload media files - Handles file upload to AWS S3 and creates media records in database
export const uploadMedia = async (req, res) => {
  try {
    logUploadRequest(req);

    // check if files were uploaded
    if (!req.files || req.files.length === 0) {
      console.log("No files found in request");
      return error(res, "media.noFile", 400);
    }

    // handle multiple file uploads
    const mediaFiles = [];

    // create media records for each file
    for (const file of req.files) {
      logFileProcessing(file);

      // Debug: Check if file.key exists
      // Check if file.key is missing
      if (!file.key) {
        throw new Error("File key is missing - S3 upload may have failed");
      }

      // Generate public URL using our utility function
      const publicUrl = generatePublicUrl(file.key);

      // create media record
      const media = await Media.create({
        filename: file.key,
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        path: file.key,
        url: publicUrl, // Use generated public URL
        uploadedBy: req.user.id,
      });

      mediaFiles.push(media);
    }

    return success(res, { media: mediaFiles }, 201, "media.uploaded");
  } catch (err) {
    logUploadError(err);

    return error(res, "media.uploadFailed", 500, err.message);
  }
};

// update media file information
export const updateMedia = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      alt,
      alt_en,
      alt_zh,
      caption,
      caption_en,
      caption_zh,
    } = req.body;

    const media = await Media.findById(id);

    if (!media) {
      return error(res, "media.notFound", 404);
    }

    // update fields
    if (title !== undefined) media.title = title;
    if (description !== undefined) media.description = description;
    if (alt !== undefined) media.alt = alt;
    if (alt_en !== undefined) media.alt_en = alt_en;
    if (alt_zh !== undefined) media.alt_zh = alt_zh;
    if (caption !== undefined) media.caption = caption;
    if (caption_en !== undefined) media.caption_en = caption_en;
    if (caption_zh !== undefined) media.caption_zh = caption_zh;

    await media.save();

    return success(res, media, 200, "media.updated");
  } catch (err) {
    return error(res, "media.updateFailed", 500, err.message);
  }
};

// get media by URL - Optimized query for alt text retrieval
export const getMediaByUrl = async (req, res) => {
  try {
    const { url } = req.query;

    if (!url) {
      return error(res, "media.urlRequired", 400);
    }

    // Optimized query with lean() for better performance
    const media = await Media.findOne(
      { url },
      { alt: 1, alt_en: 1, alt_zh: 1, _id: 0 }
    ).lean();

    if (!media) {
      return success(res, null, 200, "media.notFound");
    }

    return success(res, media, 200, "media.found");
  } catch (err) {
    return error(res, "media.getFailed", 500, err.message);
  }
};

// delete media file - Handles deletion of files from both AWS S3 and database
export const deleteMedia = async (req, res) => {
  try {
    const { id } = req.params;
    const { ids } = req.body;

    // handle batch deletion
    if (ids && Array.isArray(ids)) {
      const mediaItems = await Media.find({ _id: { $in: ids } });

      // delete files from S3
      const deletePromises = mediaItems.map(async media => {
        try {
          await s3.send(
            new DeleteObjectCommand({
              Bucket: bucketConfig.bucketName,
              Key: media.path,
            })
          );
        } catch (s3Error) {
          // If file doesn't exist in S3, continue with database deletion
          if (s3Error.name === "NoSuchKey") {
            return;
          }
          throw s3Error;
        }
      });

      // Wait for all S3 deletions to complete
      await Promise.all(deletePromises);

      // delete database records
      await Media.deleteMany({ _id: { $in: ids } });

      return success(res, null, 200, "media.deleted");
    }

    // single deletion
    const media = await Media.findById(id);

    if (!media) {
      return error(res, "media.notFound", 404);
    }

    try {
      // delete file from S3
      await s3.send(
        new DeleteObjectCommand({
          Bucket: bucketConfig.bucketName,
          Key: media.path,
        })
      );

      // delete database record
      await Media.findByIdAndDelete(id);

      return success(res, null, 200, "media.deleted");
    } catch (s3Error) {
      // If S3 deletion fails but file doesn't exist, still delete from database
      if (s3Error.name === "NoSuchKey") {
        await Media.findByIdAndDelete(id);
        return success(res, null, 200, "media.deleted");
      }

      throw s3Error;
    }
  } catch (err) {
    return error(res, "media.deleteFailed", 500, err.message);
  }
};
