const router = require("express").Router();
const {
    register,
    google,
    googleCallback,
    subscribe,
    login,
    logout,
    forgetPassword,
    resetPassword,
    resetProfilePassword,
    employeeLogin
} = require("../controllers/auth")
const {checkLogin, checkUnLogin, checkAdminLogin} = require("../utils/verifyToken")
const {uploadAccount} = require("../middlewares/multer");
const {accountCloud} = require("../middlewares/cloudinary");

router.post("/register", checkUnLogin, uploadAccount, accountCloud, register)
router.post("/login", checkUnLogin, login)
    router.post("/admin/login", checkUnLogin, checkAdminLogin, login)
router.post("/logout", checkLogin, logout)
router.post("/forgot-password", checkUnLogin, forgetPassword)
router.post("/user/reset-password", checkUnLogin, resetPassword)
router.post("/user/profile/reset-password", checkLogin, resetProfilePassword)
router.post("/subscribe", checkLogin, subscribe)

router.post("/employee/login", employeeLogin)

// Google
// router.get("/google", google)
// router.get("/google/callback", googleCallback)

module.exports = router;