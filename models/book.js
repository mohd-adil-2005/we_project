const mongoose=  require('mongoose');
const Schema= mongoose.Schema;


const bookSchema= new Schema({
    user:{
      type: Schema.Types.ObjectId,
            ref:"User",
        
    },
 fullname:{
    type:String,
    required:true,
 },
 room:{
    type:String,
    required:true,
 },
 checkIn:{
    type:Date,
    required:true,
 },
 checkOut:{
    type:Date,
    required:true,
 },
 guest:{
    type:Number,
    required:true,      
 },
 paymentMethod:{
    type:String,
    required:true,
 },
});
module.exports= mongoose.model("Book", bookSchema);

