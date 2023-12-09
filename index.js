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
const tourCompaniesRoute = require("./src/routes/tourCompanies")
const rentalCarRoute = require("./src/routes/rentalCar")
const carRoute = require("./src/routes/car")
const entertainmentRoute = require("./src/routes/entertainment")
const employeesRoute = require("./src/routes/employees")
const blogRoute = require("./src/routes/blog")
const generalProductRoute = require("./src/routes/generalProduct")
const recommendationRoute = require("./src/routes/recommendation")
const paymentRoute = require("./src/routes/payment")

const app = express()
dotenv.config()

// DB connection
const connect = async () => {
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
app.use(
    cors({
        origin: [`http://localhost:3001`, `https://tripway-app.onrender.com/`, `https://cool-custard-6dc617.netlify.app/`],
        credentials: true,
    })
);
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
app.use("/api/v1/auth", authRoute)
app.use("/api/v1/verify", verifyRoute)
app.use("/api/v1/users", usersRoute)
app.use("/api/v1/hotels", hotelsRoute);
app.use("/api/v1/rooms", roomsRoute);
app.use("/api/v1/tours", tourRoute);
app.use("/api/v1/tour-companies", tourCompaniesRoute)
app.use("/api/v1/rental-car", rentalCarRoute)
app.use("/api/v1/cars", carRoute)
app.use("/api/v1/entertainments", entertainmentRoute)
// app.use("/api/v1/employees", employeesRoute)
app.use("/api/v1/blogs", blogRoute)
app.use("/api/v1/general/products", generalProductRoute)
app.use("/api/v1/recommendations", recommendationRoute)
app.use("/api/v1/payment", paymentRoute)
// Middleware for possible errors
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.error || "Something went wrong!";
    return res.status(errorStatus).json({
        status: errorStatus,
        error: errorMessage,
        stack: err,
    });
});

const PORT = process.env.PORT || 3000

app.listen(PORT, async () => {
    connect();
    console.log("Connected to backend: " + PORT)
})
