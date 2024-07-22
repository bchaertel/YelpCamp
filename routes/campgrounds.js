const express = require("express");
const router = express.Router();
const campgrounds = require("../controllers/campgrounds.js");
const Campground = require("../models/campground");
const catchAsync = require("../utils/catchAsync");
const cloudinary = require("cloudinary").v2;
const Review = require("../models/reviews.js");
const {
  isLoggedIn,
  validateCampground,
  isAuthor,
} = require("../middleware.js");
const multer = require("multer");
const { storage } = require("../cloudinary/");
const upload = multer({ storage });

router
  .route("/")
  .get(catchAsync(campgrounds.index))
  .post(
    isLoggedIn,
    upload.array("image"),
    validateCampground,
    catchAsync(campgrounds.create)
  );

router.get("/new", isLoggedIn, campgrounds.renderNewForm);

router
  .route("/:id")
  .put(
    isLoggedIn,
    isAuthor,
    upload.array("image"),
    validateCampground,
    catchAsync(campgrounds.updateCampground)
  )
  .get(catchAsync(campgrounds.showCampground))
  .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthor,
  catchAsync(campgrounds.renderEditForm)
);

module.exports = router;
