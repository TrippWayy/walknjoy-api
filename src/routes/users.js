const {checkLogin, checkAdmin} = require("../utils/verifyToken");
const router = require("express").Router();
const {updateUser, deleteUser, getUser, getUsers, getFavorites, addFavorite, updateProfilePhoto} = require("../controllers/user")
const upload = require("../middlewares/multer");
const cloudinary = require("../middlewares/cloudinary");

//UPDATE
router.put("/user/update", checkLogin, updateUser);
router.put("/user/profile-photo/update", checkLogin,  upload.single('profileImg'), cloudinary.uploadCloud, updateProfilePhoto)

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