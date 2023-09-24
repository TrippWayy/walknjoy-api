// Import modules
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const passport = require("passport")
const session = require("express-session")
const flash = require("flash")
const bodyParser = require("body-parser");


// Import routes
const authRoute = require("./src/routes/auth")
const verifyRoute = require("./src/routes/verify")
const usersRoute = require("./src/routes/users")
const hotelsRoute = require("./src/routes/hotels")
const roomsRoute = require("./src/routes/rooms")
const tourRoute = require("./src/routes/tours")
const tourCompanies = require("./src/routes/tourCompanies")

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

// Passport local
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

// Middlewares
app.use(cors({credentials: true}))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

// Routers
app.use("/api/auth", authRoute)
app.use("/verify", verifyRoute)
app.use("/api/users", usersRoute)
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/tours", tourRoute);
app.use("/api/tour-companies", tourCompanies)


// Middleware for possible errors
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
      error: err
  });
});

const PORT = process.env.PORT || 3000

app.listen(PORT, async ()=>{
    connect();
    console.log("Connected to backend: " + PORT)
})
