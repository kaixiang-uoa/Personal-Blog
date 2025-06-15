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
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
      "ES001", // system error
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
        "EV003",
      );
    }

    // other unknown error
    return error(
      res,
      "media.getFailed",
      500,
      err,
      ErrorTypes.INTERNAL,
      "ES001",
    );
  }
};

// upload media files
export const uploadMedia = async (req, res) => {
  try {
    // add debug logs
    console.log("Upload request received:");
    console.log("Files:", req.files);
    console.log("Body:", req.body);
    console.log("Headers:", req.headers);

    // check if files were uploaded
    if (!req.files || req.files.length === 0) {
      console.log("No files found in request");
      return error(res, "media.noFile", 400);
    }

    // handle multiple file uploads
    const mediaFiles = [];

    // create media records for each file
    for (const file of req.files) {
      console.log("Processing file:", {
        originalname: file.originalname,
        filename: file.filename,
        path: file.path,
        size: file.size,
        mimetype: file.mimetype,
      });

      const { originalname, filename, path: filePath, size, mimetype } = file;

      // create media record, ensure field names match model definition
      const media = await Media.create({
        filename,
        originalname,
        mimetype,
        size,
        path: filePath,
        url: `/api/v1/media/uploads/${filename}`, // 修改 URL 路径
        uploadedBy: req.user.id,
      });

      mediaFiles.push(media);
    }

    return success(res, { media: mediaFiles }, 201, "media.uploaded");
  } catch (err) {
    console.error("Upload error:", err);
    return error(res, "media.uploadFailed", 500, err.message);
  }
};

// update media file information
export const updateMedia = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, altText } = req.body;

    const media = await Media.findById(id);

    if (!media) {
      return error(res, "media.notFound", 404);
    }

    // update fields
    if (title) media.title = title;
    if (description) media.description = description;
    if (altText) media.altText = altText;

    await media.save();

    return success(res, media, 200, "media.updated");
  } catch (err) {
    return error(res, "media.updateFailed", 500, err.message);
  }
};

// delete media file
export const deleteMedia = async (req, res) => {
  try {
    const { id } = req.params;
    const { ids } = req.body;

    // handle batch deletion
    if (ids && Array.isArray(ids)) {
      const mediaItems = await Media.find({ _id: { $in: ids } });

      // delete physical files
      for (const media of mediaItems) {
        const filePath = path.join(
          __dirname,
          "..",
          "..",
          "uploads",
          path.basename(media.path),
        );
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }

      // delete database records
      await Media.deleteMany({ _id: { $in: ids } });

      return success(res, null, 200, "media.deleted");
    }

    // single deletion
    const media = await Media.findById(id);

    if (!media) {
      return error(res, "media.notFound", 404);
    }

    // delete physical file
    const filePath = path.join(
      __dirname,
      "..",
      "..",
      "uploads",
      path.basename(media.path),
    );
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // delete database record
    await Media.findByIdAndDelete(id);

    return success(res, null, 200, "media.deleted");
  } catch (err) {
    return error(res, "media.deleteFailed", 500, err.message);
  }
};
