const router = require("express").Router();
const { register, google, googleCallback, login, logout, forgetPassword, resetPassword, resetProfilePassword, employeeLogin} = require("../controllers/auth")
const validateFields = require("../utils/validateFields");
const {checkLogin, checkUnLogin, checkEmployee} = require("../utils/verifyToken")
const upload = require("../middlewares/multer")
const cloudinary = require("../middlewares/cloudinary")

router.post("/register", checkUnLogin, upload.single('img'), cloudinary.uploadCloud, register)
router.post("/login", checkUnLogin, login)
router.post("/logout", checkLogin, logout)
router.post("/forgot-password", checkUnLogin, forgetPassword)
router.post("/user/reset-password", checkUnLogin, resetPassword)
router.post("/user/profile/reset-password", checkLogin, resetProfilePassword)


router.post("/employee/login", employeeLogin)

// Google
// router.get("/google", google)
// router.get("/google/callback", googleCallback)

module.exports = router;