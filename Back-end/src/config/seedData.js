import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import databaseConnect from "./db.js";
import logger from "./logger.js";

// get current file directory path (ES module compatible way)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import models
import User from "../models/User.js";

// Load environment variables
dotenv.config();

const createAdminUser = async () => {
  try {
    // check if admin user already exists
    const adminExists = await User.findOne({ role: "admin" });

    if (adminExists) {
      logger.info("Admin user already exists, skipping creation");
      return;
    }

    // create admin user
    const adminUser = await User.create({
      username: process.env.ADMIN_USERNAME || "admin",
      email: process.env.ADMIN_EMAIL || "admin@example.com",
      password: process.env.ADMIN_PASSWORD || "Admin@123",
      role: "admin",
      displayName: "System Administrator",
      isActive: true,
    });

    logger.info("Admin user created successfully:", {
      username: adminUser.username,
      email: adminUser.email,
    });
  } catch (error) {
    logger.error("Error creating admin user:", error);
    throw error;
  }
};

const seedDatabase = async () => {
  try {
    await databaseConnect();

    logger.info("🔄 Starting database seeding...");

    // clear all data
    await User.deleteMany({});

    logger.info("✅ Database cleared successfully");

    // create admin user
    await createAdminUser();

    logger.info("🎉 Database seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    logger.error("❌ Database seeding failed:", error);
    logger.error("Error details:", error.stack);
    process.exit(1);
  }
};

// if directly run this file, execute seed script
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  seedDatabase();
}

export default seedDatabase;
