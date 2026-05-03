const express = require('express');
const router = express.Router();
const { getAllCryptos, getTopGainers, getNewListings, addCrypto } = require('../controllers/cryptoController');

// GET /crypto - Get all tradable cryptocurrencies
router.get('/', getAllCryptos);

// GET /crypto/gainers - Get top gainers (sorted by highest % gain)
router.get('/gainers', getTopGainers);

// GET /crypto/new - Get newest listings (sorted by newest first)
router.get('/new', getNewListings);

// POST /crypto - Add a new cryptocurrency
router.post('/', addCrypto);

module.exports = router;
