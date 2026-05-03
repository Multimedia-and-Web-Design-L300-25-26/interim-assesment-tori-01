const Crypto = require('../models/Crypto');

// @desc    Get all tradable cryptocurrencies
// @route   GET /crypto
// @access  Public
const getAllCryptos = async (req, res) => {
  try {
    const cryptos = await Crypto.find().sort({ rank: 1, createdAt: 1 });
    res.json({
      success: true,
      count: cryptos.length,
      data: cryptos,
    });
  } catch (error) {
    console.error('Get all cryptos error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Get top gainers (highest % gain, positive change only)
// @route   GET /crypto/gainers
// @access  Public
const getTopGainers = async (req, res) => {
  try {
    const gainers = await Crypto.find({ change24h: { $gt: 0 } })
      .sort({ change24h: -1 })
      .limit(10);
    res.json({
      success: true,
      count: gainers.length,
      data: gainers,
    });
  } catch (error) {
    console.error('Get top gainers error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Get newest/recently added cryptocurrencies
// @route   GET /crypto/new
// @access  Public
const getNewListings = async (req, res) => {
  try {
    const newListings = await Crypto.find().sort({ createdAt: -1 }).limit(10);
    res.json({
      success: true,
      count: newListings.length,
      data: newListings,
    });
  } catch (error) {
    console.error('Get new listings error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Add a new cryptocurrency
// @route   POST /crypto
// @access  Public (or could be admin-only)
const addCrypto = async (req, res) => {
  try {
    const { name, symbol, price, image, change24h, marketCap, volume24h, rank } = req.body;

    if (!name || !symbol || price === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, symbol, and price',
      });
    }

    // Check for duplicate symbol
    const existing = await Crypto.findOne({ symbol: symbol.toUpperCase() });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: `A cryptocurrency with symbol "${symbol.toUpperCase()}" already exists`,
      });
    }

    const crypto = await Crypto.create({
      name,
      symbol,
      price,
      image: image || '',
      change24h: change24h !== undefined ? change24h : 0,
      marketCap: marketCap || 0,
      volume24h: volume24h || 0,
      rank: rank || 0,
    });

    res.status(201).json({
      success: true,
      message: `${crypto.name} (${crypto.symbol}) added successfully`,
      data: crypto,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join('. ') });
    }
    console.error('Add crypto error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = { getAllCryptos, getTopGainers, getNewListings, addCrypto };
