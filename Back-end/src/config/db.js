const mongoose = require('mongoose');

const databaseConnect = async () =>{
    try{
        const connect = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`✅ MongoDB connected: ${connect.connection.host}`);
    }catch(err){
        console.log('❌ MongoDB connection failed:', err.message);
        process.exit(1); // stop process.
    }
}

module.exports = databaseConnect;