const express = require('express');
const userRouter = require("./user");
const accountRouter = require("./accounts");
const router = express.Router();

// Test endpoint


router.use("/user", userRouter);
router.use("/account", accountRouter);

module.exports = router;
