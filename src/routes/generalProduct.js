const router = require('express').Router()
const {countByCity, getCompanyData, getFields} = require("../controllers/generalProduct")

router.get("/countByCity", countByCity)
router.get("/all/companies", getCompanyData)
router.get("/product/fields", getFields)

module.exports = router;