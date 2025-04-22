const mongoose=  require('mongoose');
const Schema= mongoose.Schema; 
const passportlocalmongoose= require("passport-local-mongoose");
const userschema= new Schema({
    email:{
        type:String,
    },
});
userschema.plugin(passportlocalmongoose);
module.exports= mongoose.model("User",userschema);
