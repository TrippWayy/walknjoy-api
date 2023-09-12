// Import modules
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Import routes
const authRoute = require("./src/routes/auth")
const usersRoute = require("./src/routes/users")
const hotelsRoute = require("./src/routes/hotels")
const roomsRoute = require("./src/routes/rooms")

const app = express()
dotenv.config()

// DB connection
const connect = async ()=>{
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("Connected to mongoDB.");
  } catch (error) {
        throw error;
  }
};

// Middlewares
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded())

// Routers
app.use("/api/auth", authRoute)
app.use("/api/users", usersRoute)
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

// Middleware for possible errors
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

const PORT = process.env.PORT
app.listen(PORT, ()=>{
    connect();
    console.log("Connected to backend")
})
