const router = require("express").Router();
const { register, google, googleCallback, login, logout, resetPassword} = require("../controllers/auth")
const validateFields = require("../utils/validateFields");
const {checkLogin} = require("../utils/verifyToken")
const upload = require("../middlewares/multer")
const cloudinary = require("../middlewares/cloudinary")

router.post("/register", upload.single('img'), cloudinary.uploadCloud, register)
router.post("/login", validateFields.validateLogin(), login)
router.post("/logout", checkLogin, logout)
router.post("/reset-password", resetPassword)

// Google
// router.get("/google", google)
// router.get("/google/callback", googleCallback)

module.exports = router;