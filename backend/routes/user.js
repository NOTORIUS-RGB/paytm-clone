// backend/routes/user.js
const express = require('express');
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");
const zod = require("zod");
// Corrected path and explicit .js extension for consistency
const { User, Account } = require('../db.js');
const router = express.Router();

const signupBody = zod.object({
    username: zod.string().email(),
	firstName: zod.string(),
	lastName: zod.string(),
	password: zod.string()
})

const signinBody = zod.object({
    username: zod.string().email(),
	password: zod.string()
})

const updateBody = zod.object({
	password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

// Example of a signup route (assuming it's in this file)
router.post('/signup', async (req, res) => {
    const { success } = signupBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    try {
        const { username, password, firstName, lastName } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(411).json({
                message: "Email already taken/Incorrect inputs"
            })
        }

        const newUser = new User({
            username,
            password, // In a real app, hash this password!
            firstName,
            lastName
        });

        await newUser.save();

        const userId = newUser._id;

        // Create an account for the new user with an initial balance
        /// ----- Give them some random balance
        const randomBalance = 1 + Math.random() * 10000;

        const newAccount = new Account({
            userId: newUser._id,
            balance: randomBalance
        });
        await newAccount.save();

        const token = jwt.sign({
            userId: userId.toString()
        }, JWT_SECRET);

        console.log("User and account created successfully!");
        res.json({
            message: "User created successfully",
            token: token
        })

    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

router.post("/signin", async (req, res) => {
    const { success } = signinBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if (user) {
        const token = jwt.sign({
            userId: user._id.toString()
        }, JWT_SECRET);
  
        res.json({
            token: token
        })
        return;
    }

    res.status(411).json({
        message: "Error while logging in"
    })
})

router.get("/bulk", authMiddleware, async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

router.put("/", authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body)
    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }

    await User.updateOne(req.body, {
        id: req.userId
    })

    res.json({
        message: "Updated successfully"
    })
})

router.get("/me", authMiddleware, async (req, res) => {
    const user = await User.findById(req.userId);
    if (user) {
        res.json({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName
        });
    } else {
        res.status(404).json({
            message: "User not found"
        });
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
