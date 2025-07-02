const express = require("express");
const router = express.Router();
const reserveController = require("../controllers/reserve");
const { isLoggedIn } = require("../middleware");
const { deleteBooking } = require("../controllers/reserve");

router.get("/", isLoggedIn, reserveController.renderReservePage);
router.post("/", isLoggedIn, reserveController.createBooking);            
router.get("/bookings", isLoggedIn, reserveController.viewUserBookings);        
router.delete("/bookings/:id", isLoggedIn, deleteBooking);

module.exports = router;
