const express = require("express");
const router = express.Router();
const Listing = require("../models/listing");
const User = require("../models/user");
const { isLoggedIn } = require("../middleware");

// GET wishlist listings
router.get("/", isLoggedIn, async (req, res) => {
  const user = await User.findById(req.user._id).populate("wishlist");
  res.render("wishlist/index", { wishlistListings: user.wishlist });
});

// Toggle wishlist
router.post("/toggle/:id", isLoggedIn, async (req, res) => {
  const listingId = req.params.id;
  const user = await User.findById(req.user._id);

  const index = user.wishlist.indexOf(listingId);
  if (index === -1) {
    user.wishlist.push(listingId);
  } else {
    user.wishlist.splice(index, 1);
  }

  await user.save();
  res.json({ success: true, wishlisted: index === -1 });
});

// ✅ Export the router properly
module.exports = router;
