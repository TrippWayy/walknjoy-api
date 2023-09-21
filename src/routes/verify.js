const router = require('express').Router();
const {verifyEmail, verifyReset} = require("../controllers/verify")

router.get("/:userID/:token", verifyEmail);
router.post("/reset/:userID/:token", verifyReset)

module.exports = router;
