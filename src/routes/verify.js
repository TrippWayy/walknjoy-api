const router = require('express').Router();
const {verifyEmail} = require("../controllers/verify")

router.get("/:userID/:token", verifyEmail);

module.exports = router;