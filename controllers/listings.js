const Listing = require ("../models/listing.js");
const ExpressError= require("../utils/ExpressError.js");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;

const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async (req, res) => {
    const { search, category } = req.query;
    let filter = {};

    if (category) {
        filter.category = category;
    }

    const allListings = await Listing.find(filter);
    res.render("listings/index.ejs", { allListings });
};

module.exports.rendernewForm=(req,res)=>{
    res.render("listings/new.ejs");
};
module.exports.showListings=async (req,res)=>{
    let {id}=req.params;
    const listing = await Listing.findById(id).populate({path: "reviews",populate:{path:"author"},}).populate("owner");
    if(!listing){
        req.flash("error","Cannot find that listing");
        res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs",{listing,currentUser: req.user });
};
module.exports.createListings=async(req,res)=>{
    let response = await geocodingClient
    .forwardGeocode({
      query: req.body.listing.location,
      limit: 1,
    })
    .send();
    let url=req.file.path;
    let filename = req.file.filename;
    const newListing=new Listing(req.body.listing);
    newListing.owner= req.user._id;
    newListing.image={url,filename};
    newListing.geometry = response.body.features[0].geometry;
    await newListing.save();
    req.flash("success","Successfully created a new listing");
    res.redirect("/listings");
};
module.exports.renderEditForm=async(req,res)=>{
    let {id}=req.params;
    const listing = await Listing.findById(id);
    console.log(listing);           
    if(!listing){
        req.flash("error","Cannot find that listing");
        res.redirect("/listings");
    };
    console.log("Requested ID:", id);
    console.log("Fetched Listing:", listing);

    res.render("listings/edit.ejs",{listing});
};
module.exports.updateListing=async(req,res)=>{
    let {id}=req.params;
    let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing});

    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
        await listing.save();
    }

    req.flash("success","Successfully updated a listing");
    res.redirect(`/listings/${id}`);
};
module.exports.destroyListing=async (req,res)=>{
    let {id}=req.params;
    const deletedListing= await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success","Successfully deleted a listing");
    res.redirect("/listings");
}