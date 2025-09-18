import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';

async function testDbConnection() {
  try {
    // 1. Connect to database
    console.log('Connecting to database...');
    console.log(process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Database connected successfully');

    // 2. Test database connection
    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();
    console.log(
      'Database collections list:',
      collections.map((c) => c.name),
    );
  } catch (error) {
    console.error('Error occurred:', error);
  } finally {
    // Close database connection
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
}

// Execute test
testDbConnection();
