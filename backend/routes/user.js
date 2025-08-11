// backend/routes/user.js
const express = require('express');
// Corrected path and explicit .js extension for consistency
const { User, Account } = require('../db.js');
const router = express.Router();

// Example of a signup route (assuming it's in this file)
router.post('/signup', async (req, res) => {
    try {
        const { username, password, firstName, lastName } = req.body;

        // Basic validation (you should add more robust validation)
        if (!username || !password || !firstName || !lastName) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ message: "Username already taken" });
        }

        const newUser = new User({
            username,
            password, // In a real app, hash this password!
            firstName,
            lastName
        });

        await newUser.save();

        // Create an account for the new user with an initial balance
        const newAccount = new Account({
            userId: newUser._id,
            balance: 1000 // Initial balance
        });
        await newAccount.save();

        console.log("User and account created successfully!");
        res.status(201).json({ message: "User created successfully", userId: newUser._id });

    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});


// New route to fetch all users (for testing/admin) - as discussed previously
router.get('/allusers', async (req, res) => {
    try {
        const users = await User.find({});
        res.json({ users });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Error fetching users", error: error.message });
    }
});


module.exports = router;
