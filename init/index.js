const mongoose =  require("mongoose");
const initdata = require("./data.js");
const listing = require("../models/listing.js");



async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
    
}
main()
.then((res)=>{
    console.log("connected to dbs");
})
.catch((err)=>{
    console.log(err);
});




const initdb= async()=>{
    await listing.deleteMany({});
    initdata.data= initdata.data.map((obj)=>({...obj,owner:"67c51f4079f6a3822122d12f"}))
    await listing.insertMany(initdata.data)
    console.log("data was initiliazed");
}

initdb();

const del = async()=>{
    let dlres= await listing.findByIdAndDelete("6701c16856e3d542d4b8fe00");
    console.log(dlres);
}
// del();


