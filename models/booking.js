const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  listing: {
    type: Schema.Types.ObjectId,
    ref: "Listing",
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  checkIn: Date,
  checkOut: Date,
  guests: Number,
  info: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

setInterval(async () => {
  try {
    const result = await Booking.deleteMany({
      checkOut: { $lt: new Date() }
    });
    if (result.deletedCount > 0) {
      console.log(`Automatically deleted ${result.deletedCount} expired bookings`);
    }
  } catch (err) {
    console.error("Error during automatic booking cleanup:", err);
  }
}, 3600000); 

module.exports = mongoose.model("Booking", bookingSchema);