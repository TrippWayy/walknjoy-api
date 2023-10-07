const router = require('express').Router();
const {verifyEmail, verifyReset, verifySub} = require("../controllers/verify")

router.get("/:userID/:tokenID", verifyEmail);
router.get("/sub/:userID/:tokenID", verifySub);
router.get("/reset-password/:userID/:tokenID", verifyReset)

module.exports = router;
