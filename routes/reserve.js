const express = require("express");
const router = express.Router();
const reserveController = require("../controllers/reserve");
const { isLoggedIn } = require("../middleware");

router.get("/", isLoggedIn, reserveController.renderReservePage);           // /reserve
router.post("/", isLoggedIn, reserveController.createBooking);             // POST /reserve
router.get("/bookings", isLoggedIn, reserveController.viewUserBookings);         // /reserve/my

module.exports = router;
