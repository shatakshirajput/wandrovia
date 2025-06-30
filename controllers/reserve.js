const Booking = require("../models/booking");

module.exports.renderReservePage = (req, res) => {
  const listingId = req.query.listingId;
  if (!listingId) {
    req.flash("error", "No listing selected for reservation.");
    return res.redirect("/listings");
  }
  res.render("reserve/reserve", { listingId });
};


module.exports.createBooking = async (req, res) => {
  const { checkIn, checkOut, guests, info } = req.body;
  const listingId = req.query.listingId;
  const userId = req.user._id;

  const booking = new Booking({
    user: userId,
    listing: listingId,
    checkIn,
    checkOut,
    guests,
    info
  });

  await booking.save();
  res.redirect("/reserve/bookings");
};

module.exports.viewUserBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id }).populate("listing");
  res.render("reserve/bookings", { bookings });
};
