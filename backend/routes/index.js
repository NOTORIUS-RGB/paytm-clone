// backend/api/index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = express.Router();
// backend/index.js


const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1", rootRouter);


module.exports = router;
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
