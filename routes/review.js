const express= require("express");

const router = express.Router({mergeParams: true});

const expressErr= require("../utils/expressErr.js");
const listing = require("../models/listing.js");

const wrapAsync= require("../utils/wrapAsync.js");
const Review= require("../models/review.js");
let {validateReview, isloggedin,isReviewAuthor}= require("../middleware.js");
const reviewController= require("../controllers/reviews.js");
//review  route
router.post("/",
  isloggedin,validateReview
  ,wrapAsync(reviewController.createReviews ));


  // review destroy route 
  router.delete("/:reviewId", 
    isReviewAuthor,isloggedin, 
    wrapAsync(reviewController.destroyReviews ))




  module.exports= router;