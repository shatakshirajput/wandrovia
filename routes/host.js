const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware');
const Listing = require('../models/listing');
const hostController = require("../controllers/host");
const Booking = require('../models/booking');


router.get('/', (req, res) => {
    res.render('host/landing'); 
});

router.get('/dashboard', isLoggedIn, async (req, res) => {
    const userListings = await Listing.find({ owner: req.user._id });
    const listingsWithBookings = await Promise.all(
        userListings.map(async (listing) => {
            const bookings = await Booking.find({ listing: listing._id }).populate('user');
            return { listing, bookings };
        })
    );
    res.render('host/dashboard', { listingsWithBookings,host: req.user });
});

module.exports = router;
