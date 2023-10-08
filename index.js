// Import modules
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const passport = require("passport")
const session = require("express-session")
const bodyParser = require("body-parser");
const ejs = require("ejs")
const MongoStore = require('connect-mongodb-session')(session)


// Import routes
const authRoute = require("./src/routes/auth")
const verifyRoute = require("./src/routes/verify")
const usersRoute = require("./src/routes/users")
const hotelsRoute = require("./src/routes/hotels")
const roomsRoute = require("./src/routes/rooms")
const tourRoute = require("./src/routes/tours")
const tourCompanies = require("./src/routes/tourCompanies")
const rentalCar = require("./src/routes/rentalCar")
const carRoute = require("./src/routes/car")
const collaborateRoute = require("./src/routes/collaborate")
const blogRoute = require("./src/routes/blog")

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


// Configure session store
const sessionStore = new MongoStore({
  uri: process.env.DB_URL,
  collection: 'Sessions', // Replace with your session collection name
});

// Set up session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds (adjust as needed)
      httpOnly: true,
    },
  })
);

// Middlewares
app.use(cors({ origin: '*' }));
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(passport.initialize())
app.use(passport.session())
app.set('view engine', 'ejs');
app.set('views', __dirname + '/src/views');
app.use(express.static('public'));

// Routers
app.use("/api/auth", authRoute)
app.use("/api/verify", verifyRoute)
app.use("/api/users", usersRoute)
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/tours", tourRoute);
app.use("/api/tour-companies", tourCompanies)
app.use("/api/rental-car", rentalCar)
app.use("/api/cars", carRoute)
app.use("/api/collaborate", collaborateRoute)
app.use("/api/blogs", blogRoute)

// Middleware for possible errors
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    error: errorMessage,
    stack: err.stack,
      error: err
  });
});

const PORT = 3001

app.listen(PORT, async ()=>{
    connect();
    console.log("Connected to backend: " + PORT)
})
