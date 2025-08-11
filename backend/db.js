const mongoose = require('mongoose');

// Use the environment variable for the MongoDB connection string
// If not set (e.g., during local development without Docker Compose),
// fall back to a default localhost string, but the Docker Compose
// setup will provide 'mongodb://mongodb:27017/paytm'
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/paytm";

mongoose.connect(mongoURI)
.then(() => {
    console.log("MongoDB connected successfully!");
})
.catch(err => {
    console.error("MongoDB connection error:", err);
    // Optionally exit the process if the database connection is critical
    // process.exit(1);
});

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

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

const Account = mongoose.model('Account', accountSchema);
const User = mongoose.model('User', userSchema);

module.exports = {
    User,
    Account
};
