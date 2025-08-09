const express = require("express");
const cors = require("cors");
const rootRouter = require("./routes/index");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route to verify server is running
app.get("/", (req, res) => {
    res.json({ message: "Server is running!" });
});

// Routes
app.use("/api/v1", rootRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});