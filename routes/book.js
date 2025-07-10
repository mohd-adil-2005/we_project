const express= require("express");

const router = express.Router({mergeParams: true});

const expressErr= require("../utils/expressErr.js");
const listing = require("../models/listing.js");

const wrapAsync= require("../utils/wrapAsync.js");
const Review= require("../models/review.js");
let {validateReview, isloggedin,isReviewAuthor}= require("../middleware.js");
const reviewController= require("../controllers/reviews.js");
const  bookController= require("../controllers/bookController.js");

router.get("/", isloggedin,wrapAsync( bookController.renderBookForm));
router.post("/", isloggedin, wrapAsync( bookController.createBooking));

module.exports= router;