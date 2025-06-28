const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware');
const Listing = require('../models/listing');

// /host route: landing page
router.get('/', (req, res) => {
    res.render('host/landing'); // views/host/landing.ejs
});

router.get('/dashboard', isLoggedIn, async (req, res) => {
    const userListings = await Listing.find({ owner: req.user._id });
    res.render('host/dashboard', { userListings });
});


module.exports = router;
