const Book= require("../models/book");
const listing = require("../models/listing");
const User = require("../models/user");
const mongoose= require("mongoose");

module.exports.showbookings = async(req,res)=>{

    let {id}= req.params;
    try{
        let  bookings =  await Book.find({user:id});


        if(!bookings ){
            req.flash("error", "No bookings found for this user");
            return res.redirect("/listings");

        }
        res.render("book/booked.ejs",{bookings});
         
    }
    catch(e){
        console.log("error in showing bookings "+e);
        req.flash("error", "Error fetching bookings");
        return res.redirect("/listings");
    }
}

module.exports.destroyBooking = async(req, res)=>{
    const bookingId = new  mongoose.Types.ObjectId(req.params.id)

    try{

        const booking = await  Book.findById(bookingId);
        if(!booking){
            req.flash("error", "Booking not found!")
        }
        const listings=  await listing.find({bookings:bookingId});
        console.log("000000000lengthh  "+listings);
         console.log("00000000bookingsssss0"+booking);
         for (let l of listings) {
      l.bookings.pull(bookingId);
      await l.save(); // save each one
      console.log(`✅ Removed booking from listing ${l._id}`);
    }
         // remove the booking from the listing's bookings array
       

         //now remove the booking from the Book collection
         await Book.findByIdAndDelete(bookingId);
    console.log("🗑️ Booking deleted");
         req.flash("success", "Booking deleted successfully!");
        return res.redirect("/listings");
        
    }
    catch(e){
        req.flash("error"," erro in the booking to fetch");
    }
}