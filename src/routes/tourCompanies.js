const router = require("express").Router()
const {verifyAdmin, checkAdmin} = require("../utils/verifyToken")
const {createCompany,
        updateCompany,
        deleteCompany,
        getCompany,
        getCompanies,
        getCompanyTours} = require("../controllers/tourCompany")

// CREATE
router.post("/", checkAdmin, createCompany)
// UPDATE
router.put("/:id", checkAdmin, updateCompany)
// DELETE
router.delete("/:id", checkAdmin, deleteCompany)
// GET
router.delete("/find/:id", getCompany)
// GET ALL
router.get("/", getCompanies)
router.get("/tour/:id", getCompanyTours)

module.exports = router;
