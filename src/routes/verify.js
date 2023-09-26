const router = require('express').Router();
const {verifyEmail, verifyReset} = require("../controllers/verify")

router.get("/:userID/:tokenID", verifyEmail);
router.get("/reset/:userID/:tokenID", verifyReset)

module.exports = router;
