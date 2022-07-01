const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./db/connect");

const PORT = process.env.PORT || 8000;

(async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, () => {
            console.log(`server running on port ${PORT}`);
        });
    } catch (error) {
        console.log(error.message);
    }
})();
