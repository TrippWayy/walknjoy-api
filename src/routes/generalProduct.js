const router = require('express').Router()
const countByCity = require("../controllers/getCountByCity")

router.get("/countByCity", countByCity)

module.exports = router;