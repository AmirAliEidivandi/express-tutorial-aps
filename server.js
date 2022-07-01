const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./db/connect");

app.get("/login", (req, res) => {
    res.send("login page");
});

app.get("/", (req, res) => {
    res.send("hello world");
});

const PORT = 8000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, () => {
            console.log(`server running on port ${PORT}`);
        });
    } catch (error) {
        console.log(error.message);
    }
};

start();
