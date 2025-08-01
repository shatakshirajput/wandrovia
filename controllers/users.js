const User = require("../models/user.js");

module.exports.renderSignupForm=(req,res)=>{
    res.render("users/signup.ejs");
}
module.exports.renderLoginForm = (req, res) => {
  res.render("users/login", { query: req.query });
};

module.exports.signup=async(req,res)=>{
    try{
        let {email,username,password} = req.body;
        const newUser = new User({email,username});
        const registeredUser = await User.register(newUser,password);
        console.log(registeredUser);
        req.login(registeredUser,(err)=>{
           if(err){
            return next(err);
           }
           req.flash("success","Welcome to Wandurlust");
           res.redirect("/listings");
        });
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
}

module.exports.login = async (req, res) => {
  req.flash("success", "Welcome back!");
  let redirectUrl = req.body.redirectTo || res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};

module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","Logged out successfully");
        res.redirect("/listings");
    });
};