const {checkLogin, checkAdmin} = require("../utils/verifyToken");
const router = require("express").Router();
const {updateUser, deleteUser, getUser, getUsers, getFavorites, addFavorite, updateProfilePhoto, sendOffer} = require("../controllers/user")
const {uploadAccount} = require("../middlewares/multer");
const {accountCloud} = require("../middlewares/cloudinary");

//UPDATE
router.put("/user/update", checkLogin, updateUser);
router.put("/user/update/profile-photo", checkLogin, uploadAccount.single("img"), accountCloud, updateProfilePhoto)

//DELETE
router.delete("/user/delete", checkLogin, deleteUser);

//GET
router.get("/user/profile", checkLogin, getUser);

// GET and POST FAVORITES
router.get("/user/favorites", checkLogin, getFavorites)
router.post("/user/favorites/:id", checkLogin, addFavorite)
router.post("/user/send/offer", checkLogin, sendOffer)
//GET ALL
router.get("/admin", checkAdmin, getUsers);

module.exports = router;