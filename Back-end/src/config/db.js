import mongoose from 'mongoose';
import { logger } from '../utils/logger.js'; 

const databaseConnect = async () =>{
    try{
        const connect = await mongoose.connect(process.env.MONGODB_URI);
        logger.info(`✅ MongoDB connected: ${connect.connection.host}`);
    }catch(err){
        console.log(err);
        logger.error('❌ MongoDB connection failed:', err.message);
        process.exit(1); // stop process.
    }
}

export default databaseConnect;