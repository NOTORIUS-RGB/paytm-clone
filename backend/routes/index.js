const express = require('express');
const userRouter = require("./user");
const router = express.Router();

// Test endpoint
router.get("/health", (req, res) => {
    res.json({
        message: "API is working!",
        status: "healthy"
    });
});

router.use("/user", userRouter);

module.exports = router;
