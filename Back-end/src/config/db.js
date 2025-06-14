import mongoose from "mongoose";
import { logger } from "../utils/logger.js";

const databaseConnect = async () => {
  // use default value if environment variable is not set
  const mongoUri =
    process.env.MONGODB_URI || "mongodb://localhost:27017/blogdb";

  try {
    const connect = await mongoose.connect(mongoUri);
    // Log connection success in a simpler format
    logger.info(`MongoDB connected: ${connect.connection.host}`);
    return connect;
  } catch (err) {
    logger.error(`MongoDB connection failed: ${err.message}`);
    process.exit(1); // stop process.
  }
};

export default databaseConnect;
