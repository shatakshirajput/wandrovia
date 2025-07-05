const Listing = require("../models/listing");
const Booking = require("../models/booking");
const User = require("../models/user");

module.exports.renderHostDashboard = async (req, res) => {
  const listings = await Listing.find({ owner: req.user._id });
  const listingsWithBookings = await Promise.all(
    listings.map(async (listing) => {
      const bookings = await Booking.find({ listing: listing._id }).populate("user");
      return { listing, bookings };
    })
  );

  res.render("host/dashboard", { listingsWithBookings,host: req.user });
};