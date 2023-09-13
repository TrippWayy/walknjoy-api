const router = require("express").Router()
const {verifyAdmin} = require("../utils/verifyToken")
const {createCompany,
        updateCompany,
        deleteCompany,
        getCompany,
        getCompanies,
        getCompanyTours} = require("../controllers/tourCompany")

// CREATE
router.post("/", verifyAdmin, createCompany)
// UPDATE
router.put("/:id", verifyAdmin, updateCompany)
// DELETE
router.delete("/:id", verifyAdmin, deleteCompany)
// GET
router.delete("/find/:id", getCompany)
// GET ALL
router.get("/", getCompanies)
router.get("/tour/:id", getCompanyTours)

module.exports = router;
