
const mongoose=  require('mongoose');

const Schema= mongoose.Schema;
const Review= require("./review.js");

const listingSchema = new Schema({

    title:{
        type: String,
    

    },
    description:{
        type: String,
        

    },
    image:{
       url:String,
       filename:String,
    },
    price:{
        type:Number,
        

    },
    location:{
        type:String,
    },
    country:{
        type: String,

    },
    
    reviews:[
        {
            type: Schema.Types.ObjectId,
            ref:"Review",

        },
    ],
    owner:{
        type: Schema.Types.ObjectId,
            ref:"User",
    },
    Category :{
        type: String,
        enum: ['Trending', 'Rooms', 'Iconic cities', 'Castles', 'Amazing pool', 'Farms','Arctic','Camping', 'Mountains','Domes','Boat'],
       
    },


});

 listingSchema.post("findOneAndDelete",async(listing)=>{
if(listing){
    await Review.deleteMany({_id:{$in:listing.reviews}});
}
 })
const listing = mongoose.model("listing", listingSchema);
module.exports= listing;