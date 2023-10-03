const router = require("express").Router();
const {sendOffer, getModelKeys} = require("../controllers/sendOffer")
const {checkEmployee} = require("../utils/verifyToken")

router.post("/send/offer", sendOffer)
router.get("/get/model-keys", checkEmployee, getModelKeys)

module.exports = router;