const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI;
        
        // If MONGO_URI points to localhost or is empty, use in-memory MongoDB
        if (!mongoURI || mongoURI.includes('127.0.0.1') || mongoURI.includes('localhost')) {
            const { MongoMemoryServer } = require('mongodb-memory-server');
            const mongod = await MongoMemoryServer.create();
            const uri = mongod.getUri();
            await mongoose.connect(uri);
            console.log('✅ MongoDB Memory Server connected (demo mode)');
            console.log('   Data will reset on server restart.');
        } else {
            // Use real MongoDB (Atlas or external)
            await mongoose.connect(mongoURI);
            console.log('✅ MongoDB connected:', mongoURI.replace(/\/\/(.+?):(.+?)@/, '//***:***@'));
        }
    } catch (error) {
        console.error('❌ MongoDB connection FAILED:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
