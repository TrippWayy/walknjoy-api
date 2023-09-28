const {checkLogin, checkAdmin} = require("../utils/verifyToken");
const router = require("express").Router();
const {updateUser, deleteUser, getUser, getUsers} = require("../controllers/user")
const upload = require("../middlewares/multer");
const cloudinary = require("../middlewares/cloudinary");

//UPDATE
router.put("/user/update", checkLogin, upload.single('img'), cloudinary.uploadCloud, updateUser);

//DELETE
router.delete("/user/delete", checkLogin, deleteUser);

//GET
router.get("/user/profile", checkLogin, getUser);

//GET ALL
router.get("/", checkAdmin, getUsers);

module.exports = router;