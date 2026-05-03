const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Cryptocurrency name is required'],
      trim: true,
    },
    symbol: {
      type: String,
      required: [true, 'Symbol is required'],
      uppercase: true,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    image: {
      type: String,
      default: '',
    },
    change24h: {
      type: Number,
      default: 0,
      comment: 'Percentage change in price over the last 24 hours (e.g. +2.5)',
    },
    marketCap: {
      type: Number,
      default: 0,
    },
    volume24h: {
      type: Number,
      default: 0,
    },
    rank: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Virtual: determine if asset is a top gainer
cryptoSchema.virtual('isGainer').get(function () {
  return this.change24h > 0;
});

module.exports = mongoose.model('Crypto', cryptoSchema);
