const mongoose = require('mongoose');

// Create a Schema for Users
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
});

// Create a model from the schema
const User = mongoose.model('User', userSchema);

// Attempt to connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://0.0.0.0:27017/paytm', {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        console.log('Connected to MongoDB successfully');
        return true;
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        return false;
    }
};

// Export the connection function and User model
module.exports = {
    connectDB,
    User
};