const {checkLogin} = require("../utils/verifyToken");
const router = require("express").Router()
const {getRecommendationsByCityPrice} = require("../controllers/recommendation")

router.get("/", checkLogin, getRecommendationsByCityPrice)

module.exports = router;