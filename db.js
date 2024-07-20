const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const url = process.env.MONGODB_URI;
        await mongoose.connect(url);
        console.log('MongoDB connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
