const express = require("express");
const router = express.Router();

// controller
const { insertPhoto, deletePhoto, getAllPhotos, getUserPhotos, getPhotoById, updatePhoto, likePhoto, commentPhoto, searchPhotos } = require("../controllers/PhotoController");

// middlewares
const { photoInsertValidation, commentValidation } = require("../middlewares/photoValidation");
const validate = require("../middlewares/handleValidation");
const authGuard = require("../middlewares/authGuard");
const { imageUpload } = require("../middlewares/imageUpload");

// routes
router.post("/", authGuard, imageUpload.single("image"), photoInsertValidation(), validate, insertPhoto);
router.delete("/:id", authGuard, deletePhoto);
router.get("/", getAllPhotos);
router.get("/user/:id", getUserPhotos);
router.get("/search", searchPhotos);
router.get("/:id", getPhotoById);
router.put("/:id", authGuard, updatePhoto);
router.put("/like/:id", authGuard, likePhoto);
router.put("/comment/:id", authGuard, commentValidation(), validate, commentPhoto);


module.exports = router;