const express = require("express");
const router = express.Router();
const wrapAsync= require("../utils/wrapAsync.js");
const {listingschema}= require("../schema.js");
const {reviewSchema}= require("../schema.js");
const expressErr= require("../utils/expressErr.js");
const listing = require("../models/listing.js");
const {isloggedin, isowner}= require("../middleware.js");
const {validateListing}= require("../middleware.js");
const ListingController= require("../controllers/listings.js");

const multer = require("multer");
const {storage}= require("../cloudeConfig.js");
const upload = multer({storage});



// all listing route



router.route("/")
.get(wrapAsync(ListingController.index ))
.post(isloggedin, 
    upload.single("listing[image]"),wrapAsync
    (ListingController.createListing));

router.post("/search",ListingController.search);

//new routes
router.get("/new",
    isloggedin,ListingController.renderNewForm);


router.route("/:id")
.get( 
    wrapAsync (ListingController.showListings))
.delete(
        isowner, isloggedin,wrapAsync
        (ListingController.destroyListing));



//edit routes
router.get("/:id/edit", 
    isloggedin,wrapAsync
    (ListingController.rendereditForm))
    .put("/:id",
        upload.single("listing[image]"),
        isowner, isloggedin,validateListing,wrapAsync
        (ListingController.updateListing))




module.exports= router;
