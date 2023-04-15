// Express
const express = require("express");
const app = express();
require('express-async-errors');

// Dotenv
require("dotenv").config();

// MongoDB
const mongoose = require("mongoose");

// Security
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

// Routes
const userRouter = require("./routes/authRoute");
const messageRouter = require("./routes/messageRoute");
const userRoute = require("./routes/userRoute");

// middlewares
const notFoundMiddleware = require('./middlewares/notFoundHandler');
const errorHandlerMiddleware = require('./middlewares/errorHandler');
const verifyToken = require('./middlewares/verifyToken');
const corsOptions = {
    origin: "http://localhost:3000" // frontend URI (ReactJS)
}
app.use(express.json());
app.use(cors(corsOptions));

// route
app.get("/", (req, res) => {
    res.status(201).json({message: "Connected to Backend!"});
});

// functions without token
app.use('/auth', userRouter);

// functions with token
app.use(verifyToken);
app.use('/message', messageRouter);
app.use('/user', userRoute);


// error handling
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// connect MongoDB
mongoose.connect(process.env.MONGODB_URI).then(() => {
    const PORT = process.env.PORT || 8000
    app.listen(PORT, () => {
        console.log(`App is Listening on PORT ${PORT}`);
    })
}).catch(err => {
    console.log(err);
});