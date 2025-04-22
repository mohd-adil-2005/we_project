const Review= require("../models/review");
const listing= require("../models/listing");


module.exports.createReviews= async(req,res)=>{
    let Listing = await listing.findById(req.params.id);    
  const newReview= new Review(req.body.review);
  newReview.author= req.user._id;
  
  
  Listing.reviews.push(newReview);
  await newReview.save();
  await Listing.save();
  req.flash("success", "new reviews are adedd!");
  res.redirect(`/listings/${Listing._id}`);
  
  }


  module.exports.destroyReviews=async(req,res)=>{
    let {id,reviewId}= req.params;


      await listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
      await Review.findByIdAndDelete(reviewId);
      req.flash("sucess","reviews are deleted !")
      res.redirect(`/listings/${id}`);  
  
  
    
    
}