const Book= require("../models/book");
const listing = require("../models/listing");

module.exports.renderBookForm=async (req,res)=>{
    const{id}= req.params;
    const Listing=await listing.findById(id);
    if(!Listing){
        req.flash("error", "the listing you requested for does not exist!");
        return res.redirect("/listings");
    }
    console.log(Listing);

    console.log( "the idddddd"+id);
    res.render("book/book.ejs",{Listing:Listing});

}
module.exports.createBooking= async(req,res)=>{
    const {id}= req.params; // listing id
    const Listing= await listing.findById(id);
    if(!Listing){
        req.flash("error", "the listing you requested for does not exist!");
        return res.redirect("/listings");
    }
    // create new booking using the req.body
    const booking= new Book(req.body.booking);
    booking.user= req.user._id;
    await booking.save();
    

    Listing.bookings.push(booking); // add the booking to the listing's bookings array
    await Listing.save(); // save the listing with the new booking
    req.flash("success", "Booking created successfully!");
    res.redirect(`/listings`); // redirect to the listing's page

     // set the user id to the booking




}


