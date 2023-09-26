const {checkLogin, checkAdmin} = require("../utils/verifyToken");
const router = require("express").Router();
const {updateUser, deleteUser, getUser, getUsers} = require("../controllers/user")

//UPDATE
router.put("/user/update", checkLogin, updateUser);

//DELETE
router.delete("/user/delete", checkLogin, deleteUser);

//GET
router.get("/user", checkLogin, getUser);

//GET ALL
router.get("/", checkAdmin, getUsers);

module.exports = router;