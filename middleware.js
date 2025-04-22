
const listing= require("./models/listing");
const Review= require("./models/review.js");
const expressErr= require("./utils/expressErr.js");
const {listingschema}= require("./schema.js");
const {reviewSchema}= require("./schema.js");

module.exports.isloggedin= (req,res,next)=>{
  
    console.log(req.path,"...",req.originalUrl);
    if(!req.isAuthenticated()){
        req.session.redirectUrl= req.originalUrl;
        console.log(req.session.redirectUrl);
        req.flash("error", "You must be logged in to create listings" );
       return res.redirect("/login");
    }
   
        next();
    }
    module.exports.saveRedirectUrl= (req,res,next)=>{
        if(req.session.redirectUrl){
            res.locals.redirectUrl= req.session.redirectUrl;
            console.log(res.locals.redirectUrl)
        }
        next();
    }

//owner 
    module.exports.isowner= async(req,res,next)=>{
        let {id}= req.params;
        let Listing= await listing.findById(id);
        if(!Listing.owner.equals(res.locals.currentUser._id)){
             req.flash("error", "you don't have the permision to update this");
            return  res.redirect(`/listings/${id}`);
        }
        next();
    }
//validating listings form 
module.exports.validateListing= (req,res,next)=>{
    let {error} = listingschema.validate(req.body);
   console.log(error);
   if(error){
    let errMsg= error.details.map((el)=> el.message).join(",");
    throw new expressErr(400,errMsg);
   }
   else{
    next();
   }
}

// validating review form
module.exports.validateReview= (req,res,next)=>{
    let{error}= reviewSchema.validate(req.body);
    console.log(error);
    if(error){
    let errMsg= error.details.map((el)=> el.message).join(",");
    throw new expressErr(400,errMsg);
   }
   else{
    next();
   }

}






module.exports.isReviewAuthor= async(req,res,next)=>{
    let {id,reviewId}= req.params;
    let review= await Review.findById(reviewId);
    if(!review.author._id.equals(res.locals.currentUser._id)){
         req.flash("error", "you are not the author of the review ! ");
        return  res.redirect(`/listings/${id}`);
    }
    next();
}