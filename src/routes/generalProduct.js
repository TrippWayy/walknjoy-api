const router = require('express').Router()
const countByCity = require("../controllers/generalProduct")

router.get("/countByCity", countByCity)

module.exports = router;