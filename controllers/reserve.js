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
  try {
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
    req.flash("success", "Booking created successfully!");
    res.redirect("/reserve/bookings");
  } catch (err) {
    console.error("Error creating booking:", err);
    req.flash("error", "Failed to create booking.");
    res.redirect("/listings");
  }
};

module.exports.viewUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate("listing");
    res.render("reserve/bookings", { bookings });
  } catch (err) {
    console.error("Error fetching user bookings:", err);
    req.flash("error", "Unable to fetch your bookings.");
    res.redirect("/listings");
  }
};

module.exports.deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id);
    if (!booking) {
      req.flash("error", "Booking not found!");
      return res.redirect("/reserve/bookings");
    }
    if (!booking.user.equals(req.user._id)) {
      req.flash("error", "You do not have permission to delete this booking.");
      return res.redirect("/reserve/bookings");
    }

    await Booking.findByIdAndDelete(id);
    req.flash("success", "Booking deleted successfully.");
    res.redirect("/reserve/bookings");
  } catch (err) {
    console.error("Error deleting booking:", err);
    req.flash("error", "Failed to delete booking.");
    res.redirect("/reserve/bookings");
  }
};