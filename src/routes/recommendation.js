const {checkLogin} = require("../utils/verifyToken");
const router = require("express").Router()
const {getRecommendations} = require("../controllers/recommendation")

router.get("/", checkLogin, getRecommendations)

module.exports = router;