const Listing=require("./models/listing.js");
const Review=require("./models/review.js");
const review = require("./models/review.js");

module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        //redirect url save
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","Log in required!!");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.body.redirectTo) {
        res.locals.redirectUrl = req.body.redirectTo;
    }
    else if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
        delete req.session.redirectUrl;
    }
    next();
};


module.exports.isOwner=async(req,res,next)=>{
    let {id}=req.params;
    let listing= await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currUser._id)){
        req.flash("error","you don't have to permission to make changes...");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

module.exports.isReviewAuthor=async(req,res,next)=>{
    let {id ,reviewId}=req.params;
    let review= await Review.findById(reviewId);
    if(!review.author._id.equals(res.locals.currUser._id)){
        req.flash("error","you don't have to permission to make changes...");
        return res.redirect(`/listings/${id}`);
    }
    next();
}