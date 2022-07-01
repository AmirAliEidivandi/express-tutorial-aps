const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./db/connect");
const userRouter = require("./routes/user.routes");
const requestMiddleware = require("./middlewares/requests.middlewares");
const authRouter = require('./routes/auth.routes');

// middleware
app.use(requestMiddleware);

app.use('/api/v1/auth', authRouter); // http://localhost:8000/api/v1/auth/register
app.use("/api/v1/user", userRouter); // http://localhost:8000/api/v1/user/new
app.get("/", (req, res) => res.send("hello world"));

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
