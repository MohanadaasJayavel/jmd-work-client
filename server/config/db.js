// config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
//     MONGO_URI=mongodb://localhost:27017/taskmanager
// mongodb://127.0.0.1:27017/myDatabase
// PORT=5000
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
