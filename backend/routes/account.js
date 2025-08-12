// backend/routes/account.js
const express = require('express');
const { authMiddleware } = require('../middleware');
const { Account, User } = require('../db.js');
const mongoose = require('mongoose');

const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
    try {
        console.log("Looking for account with userId:", req.userId);
        
        const account = await Account.findOne({
            userId: new mongoose.Types.ObjectId(req.userId)
        });

        console.log("Found account:", account);

        if (!account) {
            return res.status(404).json({
                message: "Account not found"
            });
        }

        res.json({
            balance: account.balance
        });
    } catch (error) {
        console.error("Error fetching balance:", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

router.post("/transfer", authMiddleware, async (req, res) => {
    try {
        const { amount, to } = req.body;

        // Fetch the accounts
        const account = await Account.findOne({ userId: new mongoose.Types.ObjectId(req.userId) });

        if (!account || account.balance < amount) {
            return res.status(400).json({
                message: "Insufficient balance"
            });
        }

        const toAccount = await Account.findOne({ userId: new mongoose.Types.ObjectId(to) });

        if (!toAccount) {
            return res.status(400).json({
                message: "Invalid account"
            });
        }

        // Perform the transfer without transactions
        await Account.updateOne(
            { userId: new mongoose.Types.ObjectId(req.userId) }, 
            { $inc: { balance: -amount } }
        );
        
        await Account.updateOne(
            { userId: new mongoose.Types.ObjectId(to) }, 
            { $inc: { balance: amount } }
        );

        res.json({
            message: "Transfer successful"
        });
    } catch (error) {
        console.error("Transfer error:", error);
        res.status(500).json({
            message: "Transfer failed"
        });
    }
});

module.exports = router;