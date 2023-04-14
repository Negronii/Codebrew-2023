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
const userRouter = require("./routes/userRoute");

// middlewares
const notFoundMiddleware = require('./middlewares/notFoundHandler');
const errorHandlerMiddleware = require('./middlewares/errorHandler');
const corsOptions = {
    origin: "http://localhost:3000" // frontend URI (ReactJS)
}
app.use(express.json());
app.use(cors(corsOptions));

// route
app.get("/", (req, res) => {
    res.status(201).json({message: "Connected to Backend!"});
});

app.use('/user', userRouter);
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