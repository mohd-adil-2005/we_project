require('dotenv').config();
console.log(process.env.SECRETE)

const express = require("express");
const app = express();
const port = 8080;
const mongoose = require("mongoose");
const listing = require("./models/listing.js");
const Review= require("./models/review.js");
const path= require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
const session= require("express-session");
const MongoStore = require('connect-mongo');
const flash= require("connect-flash");
app.use(express.urlencoded({extended:true}));
const methodOverride= require("method-override");
app.use(methodOverride("_method"));
const wrapAsync= require("./utils/wrapAsync.js");
const expressErr= require("./utils/expressErr.js");
const {listingschema}= require("./schema.js");
const {reviewSchema}= require("./schema.js");
app.use(express.json());
const ejsMate= require("ejs-mate");
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")))
const listings = require("./routes/listing.js");
const review = require("./routes/review.js");
const Userrouter = require("./routes/user.js");
const passport= require("passport");
const LocalStrategy= require("passport-local").Strategy;
const User = require("./models/user.js");
app.use(express.json());
const db_url= process.env.ATLASDB_URL;
console.log(db_url);
async function main() {
    await mongoose.connect(db_url);
    
}
main()
.then((res)=>{
    console.log("connected to dbs");
})
.catch((err)=>{
    console.log(err);
});
const store = MongoStore.create({
    mongoUrl: db_url,
    crypto:{
        secret:process.env.SECRET,
    },
    touchAfter: 24 * 3600, // time period in seconds
    })

    store.on("error", ()=>{
        consoel.log("Mongo session error");
    })
const sessionoption= {
    store:store,
    secret:process.env.SECRET,
    resave: false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+6*24*60*60*1000,
    
        maxAge:6*24*60*60*1000,
     

    },
};

app.use(session(sessionoption));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error= req.flash("error");
    res.locals.currentUser= req.user;
  

    console.log(res.locals.deletelisting);
    next();
});



app.use("/listings", listings);
app.use("/listings/:id/reviews", review);
app.use("/",Userrouter);




// app.get("/",(req,res)=>{
//     res.send("sever on working major project okay  ")
// });
app.get("/userdemo",async(req,res)=>{
    let fakeuser= new User({
        email:"mohdadil.tech@gmail.com",
        username:"adilansar",
    });
 let registeruser= await User.register(fakeuser, "helloworld");
 res.send(registeruser);
})



app.post("/send-category", async (req, res,next) => {
    try{
    const category = req.body.category;
    console.log("Category received:", category);
    
   
        const alllisting = await listing.find({ Category: category });
        console.log("Filtered listings:", alllisting.length);
        if(alllisting.length>0){
            res.render("listings/index.ejs", { alllisting });
        }
        if (alllisting.length===0){
        
            
            res.render("er.ejs",{message:"This type of listings not Exists !"});
        }
    // Filter listings
   

    }

    catch(err) {
        console.error("Error in /send-category:", err);
    
        // Send a safe message to the frontend
       next(new expressErr(500,"something went wrong !"));
      }
    // Render the same page with filtered data
    
});




  







app.all("*", (req,res,next)=>{
    next(new expressErr(404,"Page not found"));
})
app.use((err, req,res,next)=>{
    let{statusCode=500, message="something went wrong !"}=err;
    res.status(statusCode).render("error.ejs",{message});
})

app.listen(port, ()=>{
    console.log("server is working well ! ")
})