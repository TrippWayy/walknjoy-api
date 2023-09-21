const router = require('express').Router();
const {verifyEmail, verifyReset} = require("../controllers/verify")

router.get("/:userID/:token", verifyEmail);
router.get("/:userID/:token", verifyReset)

module.exports = router;