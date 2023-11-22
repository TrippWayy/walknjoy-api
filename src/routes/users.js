const {checkLogin, checkAdmin} = require("../utils/verifyToken");
const router = require("express").Router();
const {updateUser, deleteUser, getUser, getUsers, getFavorites, addFavorite} = require("../controllers/user")
const upload = require("../middlewares/multer");
const cloudinary = require("../middlewares/cloudinary");

//UPDATE
router.put("/user/update", checkLogin, upload.single('img'), cloudinary.uploadCloud, updateUser);

//DELETE
router.delete("/user/delete", checkLogin, deleteUser);

//GET
router.get("/user/profile", checkLogin, getUser);

// GET and POST FAVORITES
router.get("/user/favorites", checkLogin, getFavorites)
router.post("/user/favorites/:id", checkLogin, addFavorite)

//GET ALL
router.get("/admin", checkAdmin, getUsers);

module.exports = router;