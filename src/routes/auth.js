const router = require("express").Router();
const { register, google, googleCallback, login, logout, forgetPassword} = require("../controllers/auth")
const validateFields = require("../utils/validateFields");
const {checkLogin, checkUnLogin} = require("../utils/verifyToken")
const upload = require("../middlewares/multer")
const cloudinary = require("../middlewares/cloudinary")

router.post("/register", checkUnLogin, upload.single('img'), cloudinary.uploadCloud, register)
router.post("/login", checkUnLogin, login)
router.post("/logout", checkLogin, logout)
router.post("/forget-password", forgetPassword)


// Google
// router.get("/google", google)
// router.get("/google/callback", googleCallback)

module.exports = router;