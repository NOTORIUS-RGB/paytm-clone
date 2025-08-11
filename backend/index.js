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

const PORT = 4000;
app.listen(PORT, '0.0.0.0', (error) => {
    if (error) {
        console.error('Error starting server:', error);
        return;
    }
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('Press Ctrl+C to quit.');
});