const {checkLogin, checkAdmin} = require("../utils/verifyToken");
const router = require("express").Router();
const {updateUser, deleteUser, getUser, getUsers} = require("../controllers/user")

//UPDATE
router.put("/:id", checkLogin, updateUser);

//DELETE
router.delete("/:id", checkLogin, deleteUser);

//GET
router.get("/:id", checkLogin, getUser);

//GET ALL
router.get("/", checkAdmin, getUsers);

module.exports = router;