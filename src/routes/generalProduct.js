const router = require('express').Router()
const {countByCity, getModelData, getFields} = require("../controllers/generalProduct")
const {checkAdmin} = require("../utils/verifyToken");

router.get("/countByCity", countByCity)
router.get("/all/models", checkAdmin, getModelData)
router.get("/models/fields", checkAdmin, getFields)

module.exports = router;