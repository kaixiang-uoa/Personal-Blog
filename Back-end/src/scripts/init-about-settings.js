import mongoose from "mongoose";
import dotenv from "dotenv";
import Setting from "../models/Setting.js";
import { logger } from "../utils/logger.js";

// load environment variables
dotenv.config();

// About page settings initial data - using 'about' group
const aboutSettings = [
  {
    key: "about.intro",
    value:
      "<p>Hello! I'm a passionate developer with a love for technology and innovation. I enjoy creating solutions that make a difference and sharing my knowledge with others.</p>",
    group: "about",
    description: "About page introduction",
  },
  {
    key: "about.intro_zh",
    value:
      "<p>你好！我是一名热爱技术和创新的开发者。我喜欢创造能够产生影响的解决方案，并与他人分享我的知识。</p>",
    group: "about",
    description: "About page introduction (Chinese)",
  },
  {
    key: "about.contact",
    value: JSON.stringify({
      email: "your.email@example.com",
      phone: "",
      location: "",
    }),
    group: "about",
    description: "Contact information",
  },
  {
    key: "about.skills",
    value: JSON.stringify([
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "Express",
      "MongoDB",
      "HTML",
      "CSS",
      "Tailwind CSS",
      "Git",
      "GitHub",
      "CI/CD",
    ]),
    group: "about",
    description: "Professional skills",
  },
  {
    key: "about.education",
    value: JSON.stringify([
      {
        degree: "Bachelor of Science in Computer Science",
        institution: "Your University",
        year: "20XX-20XX",
        description: "",
      },
    ]),
    group: "about",
    description: "Education background",
  },
  {
    key: "about.experience",
    value: JSON.stringify([
      {
        position: "Software Developer",
        company: "Company A",
        period: "20XX-Present",
        description: "Job responsibilities and achievements",
      },
      {
        position: "Intern",
        company: "Company B",
        period: "20XX-20XX",
        description: "",
      },
    ]),
    group: "about",
    description: "Work experience",
  },
  {
    key: "about.projects",
    value: JSON.stringify([
      {
        name: "Project A",
        description: "Description of project A",
        link: "https://github.com/yourusername/projectA",
        tech: ["React", "Node.js", "MongoDB"],
      },
    ]),
    group: "about",
    description: "Project experience",
  },
  {
    key: "about.social",
    value: JSON.stringify({
      github: "https://github.com/yourusername",
      linkedin: "",
      twitter: "",
      website: "",
    }),
    group: "about",
    description: "Social media links",
  },
];

// connect to database and create settings
const initAboutSettings = async () => {
  try {
    // connect to database
    console.log(
      "MongoDB URI:",
      process.env.MONGODB_URI.substring(0, 20) + "...",
    );
    await mongoose.connect(process.env.MONGODB_URI);
    logger.info("✅ MongoDB connected for initializing about settings");

    // check if About settings already exist
    const existingSettings = await Setting.find({
      key: { $regex: /^about\./ },
    });

    if (existingSettings.length > 0) {
      logger.info(
        `About settings already exist (${existingSettings.length} found)`,
      );
      logger.info("Skip creating new settings");
    } else {
      // create About settings
      await Setting.insertMany(aboutSettings);
      logger.info(
        `✅ Successfully created ${aboutSettings.length} about settings`,
      );
    }
  } catch (err) {
    console.error("❌ Failed to initialize about settings:", err);
    console.error("Error details:", err.message);
    console.error("Stack trace:", err.stack);
  } finally {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
    logger.info("MongoDB disconnected");
    process.exit(0);
  }
};

// run initialization
initAboutSettings();
