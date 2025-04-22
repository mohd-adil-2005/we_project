const listing= require("../models/listing");

module.exports.search=async(req,res)=> {
        try {
          const location = req.body.listings.location;
      console.log(`location is ${location}`);
     
          const listings = await listing.find({
            location: { $regex: location, $options: "i" },
          });
      
          if (listings.length === 0) {
            req.flash("error", "No listings found for that location.");
            return res.render("error", { message: "No listings found." });
          }
      
          res.render("listings/index.ejs", {
            alllisting: listings,
            searchTerm: location,
          });
        } catch (err) {
          console.error("Search error:", err);
          req.flash("error", "An error occurred while searching.");
          res.redirect("/listings");
        }
    };


module.exports.index= async (req,res)=>{
    
    const alllisting= await listing.find();
    res.render("listings/index.ejs",{alllisting});
    
}
module.exports.renderNewForm= (req,res)=>{
    res.render("listings/new.ejs");
    
}





module.exports.showListings=(async (req,res)=>{
    let {id}= req.params;
   const Listing=  await listing.findById(id)
   .populate({path:"reviews",
    populate:{
        path:"author"
    }
}).populate("owner");
  console.log(Listing);
   if(!Listing){
    req.flash("error", "listings you requested for not  exist!");
    res.redirect("/listings")
   }
   res.render("listings/show.ejs",{Listing});


});

module.exports.createListing= async (req,res, next)=>{
    let url= req.file.path;
    let filename= req.file.filename;
    console.log(url,filename);
   
    let  newlisting = new listing(req.body.listing);
   newlisting.owner= req.user._id;
   newlisting.image= {url,filename};
    await newlisting.save();
    console.log( "the new listing is here"+newlisting);
    req.flash("success","new listings created !");

    res.redirect("/listings");
    
}




module.exports.rendereditForm= async (req,res)=>{
    let {id} = req.params;
    const Listing=  await listing.findById(id);
    if(!Listing){
        req.flash("error", "listing you requested not exists");
        res.redirct("/listings");
    }
    let originalImageUrl= Listing.image.url;
    console.log(originalImageUrl);
    console.log(originalImageUrl);
    if(originalImageUrl!="undefined"){
        console.log("no image found url");
    }
    originalImageUrl= originalImageUrl.replace("/upload", "/upload/c_thumb,g_face,h_200,w_200/e_blur:75/f_auto/");
    res.render("listings/edit.ejs",{Listing, originalImageUrl});
    console.log("this is url    here "+ originalImageUrl);
};




module.exports.updateListing= async (req, res)=>{
    let {id}= req.params;
   let Listing= await listing.findByIdAndUpdate(id,{...req.body.listing});
    console.log("the wwww"+ req.file);
    if(typeof req.file!=="undefined"){

        let url= req.file.path;
        let filename= req.file.filename;
        Listing.image={url, filename};
        await Listing.save();
        console.log("image updated!");

    }

    req.flash("success","listing is updated !");
    res.redirect(`/listings/${id}`);

    
}


module.exports.destroyListing= async (req,res)=>{
    let {id}= req.params;
     await listing.findByIdAndDelete(id);
     req.flash("success", "listing is deleted !");
     res.redirect("/listings");

}


