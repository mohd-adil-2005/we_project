const express= require("express");

const router = express.Router({mergeParams: true});

const expressErr= require("../utils/expressErr.js");
const listing = require("../models/listing.js");

const wrapAsync= require("../utils/wrapAsync.js");
const Review= require("../models/review.js");
let {validateReview, isloggedin,isReviewAuthor}= require("../middleware.js");
const reviewController= require("../controllers/reviews.js");
const  bookedUserController= require("../controllers/bookUser.js");
router.get("/:id", isloggedin,wrapAsync( bookedUserController.showbookings));
router.delete("/:id", isloggedin,wrapAsync( bookedUserController.destroyBooking));

module.exports= router;