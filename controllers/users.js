const User= require("../models/user");


module.exports.signup=async(req,res)=>{
    try{

        let {email,username,password}=req.body
const newUser= new User({email,username});
const registeredUser= await User.register(newUser,password);
req.login(registeredUser, (err)=>{
    if(err){
        return next(err);
    }
    req.flash("success","Welcome back to wanderlust");
    res.redirect("/listings");
})

    }
    catch(e){
        req.flash("error", e.message);
        res.redirect("/signup");
    }


}

module.exports.renderSignupPage=(req,res)=>{
    res.render("users/signup.ejs");
}


module.exports.renderLoginPage=(req,res)=>{
    res.render("users/login.ejs");
} 
module.exports.login= async(req,res)=>{
    req.flash("success", "Successfully login wanderlust");
    let redirect= res.locals.redirectUrl||"/listings"
  res.redirect(redirect);
    
}



module.exports.logout= (req,res,next)=>{

    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","you are loggedout");
        res.redirect("/listings");
    })
  

}