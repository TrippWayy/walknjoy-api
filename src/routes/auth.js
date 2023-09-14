const router = require("express").Router();
const { register, login } = require("../controllers/auth")
const validateFields = require("../utils/validateFields");

router.post("/register", validateFields.validateRegister(), register)
router.post("/login", validateFields.validateLogin(), login)

module.exports = router;