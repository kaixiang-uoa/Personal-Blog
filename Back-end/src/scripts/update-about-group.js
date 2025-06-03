import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Setting from '../models/Setting.js';
import { logger } from '../utils/logger.js';

// load environment variables
dotenv.config();

// update About page settings group
const updateAboutSettings = async () => {
  try {
    // connect to database
    console.log('MongoDB URI:', process.env.MONGODB_URI.substring(0, 20) + '...');
    await mongoose.connect(process.env.MONGODB_URI);
    logger.info('✅ MongoDB connected for updating about settings group');
    
    // find all keys starting with 'about.'
    const aboutSettings = await Setting.find({ key: { $regex: /^about\./ } });
    
    if (aboutSettings.length === 0) {
      logger.info('No about settings found to update');
    } else {
      // batch update all about settings group
      const result = await Setting.updateMany(
        { key: { $regex: /^about\./ } },
        { $set: { group: 'about' } }
      );
      
      logger.info(`✅ Successfully updated ${result.modifiedCount} about settings to 'about' group`);
    }
  } catch (err) {
    console.error('❌ Failed to update about settings group:', err);
    console.error('Error details:', err.message);
    console.error('Stack trace:', err.stack);
  } finally {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
    logger.info('MongoDB disconnected');
    process.exit(0);
  }
};

// run update script
updateAboutSettings(); 