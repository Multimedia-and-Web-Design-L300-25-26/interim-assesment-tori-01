const Crypto = require('../models/Crypto');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const seedData = [
  {
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 97500.0,
    image: 'https://dynamic-assets.coinbase.com/e785e0181f1a23a30d9476038d9be91e9f6c63959b538eabbc51a1abc8898940383291eede695c3b8dfaa1829a9b57f5a2d0a16b0523580346c6b8fab67af14b/asset_icons/b57ac673f06a4b0338a596817eb0a50ce16e2059f327dc117744449a47915cb2.png',
    change24h: 5.2,
    marketCap: 1900000000000,
    volume24h: 29000000000,
    rank: 1,
  },
  {
    name: 'Ethereum',
    symbol: 'ETH',
    price: 2245.3,
    image: 'https://dynamic-assets.coinbase.com/dbb4b4983bde81309ddab83eb598358eb44375b930b94687ebe38bc22e52c3b2125258ffb8477a5ef22e33d6bd72e32a506c391caa13af64c00e46613c3e5806/asset_icons/4113b082d21cc5fab17fc8f2d19fb996165bcce635e6900f7fc2d57c4ef33ae9.png',
    change24h: 3.8,
    marketCap: 270000000000,
    volume24h: 13700000000,
    rank: 2,
  },
  {
    name: 'Tether',
    symbol: 'USDT',
    price: 1.0,
    image: 'https://dynamic-assets.coinbase.com/41f6a93a3a222078c939115fc304a67c384886b7a9e6c15dcbfa6519dc45f6bb4a586e9c48535d099efa596dbf8a9dd72b05815bcd32ac650c50abb5391a5bd0/asset_icons/1f8489bb280fb0a0fd643c1161312ba49655040e9aaaced5f9ad3eeaf868eadc.png',
    change24h: 0.01,
    marketCap: 184000000000,
    volume24h: 57400000000,
    rank: 3,
  },
  {
    name: 'BNB',
    symbol: 'BNB',
    price: 618.5,
    image: 'https://asset-metadata-service-production.s3.amazonaws.com/asset_icons/c347b6d1a7624e24c4e90089a69dfc8fb75523daf8eeb88007372a0c3a30d428.png',
    change24h: 2.1,
    marketCap: 83600000000,
    volume24h: 1200000000,
    rank: 4,
  },
  {
    name: 'XRP',
    symbol: 'XRP',
    price: 2.45,
    image: 'https://dynamic-assets.coinbase.com/e81509d2307f706f3a6f8999968874b50b628634abf5154fc91a7e5f7685d496a33acb4cde02265ed6f54b0a08fa54912208516e956bc5f0ffd1c9c2634099ae/asset_icons/3af4b33bde3012fd29dd1366b0ad737660f24acc91750ee30a034a0679256d0b.png',
    change24h: 8.3,
    marketCap: 82100000000,
    volume24h: 1400000000,
    rank: 5,
  },
  {
    name: 'USDC',
    symbol: 'USDC',
    price: 1.0,
    image: 'https://dynamic-assets.coinbase.com/3c15df5e2ac7d4abbe9499ed9335041f00c620f28e8de2f93474a9f432058742cdf4674bd43f309e69778a26969372310135be97eb183d91c492154176d455b8/asset_icons/9d67b728b6c8f457717154b3a35f9ddc702eae7e76c4684ee39302c4d7fd0bb8.png',
    change24h: 0.0,
    marketCap: 77200000000,
    volume24h: 5300000000,
    rank: 6,
  },
  {
    name: 'Solana',
    symbol: 'SOL',
    price: 165.0,
    image: 'https://asset-metadata-service-production.s3.amazonaws.com/asset_icons/b658adaf7913c1513c8d120bcb41934a5a4bf09b6adbcb436085e2fbf6eb128c.png',
    change24h: 6.7,
    marketCap: 71000000000,
    volume24h: 2300000000,
    rank: 7,
  },
  {
    name: 'Dogecoin',
    symbol: 'DOGE',
    price: 0.38,
    image: 'https://assets.coingecko.com/coins/images/5/large/dogecoin.png',
    change24h: -1.5,
    marketCap: 55000000000,
    volume24h: 1800000000,
    rank: 8,
  },
  {
    name: 'Hyperliquid',
    symbol: 'HYPE',
    price: 22.5,
    image: 'https://asset-metadata-service-production.s3.amazonaws.com/asset_icons/6a8c816c50549afbdb1a73933132c71d7aa26ba900d285e624d5a24ce9b068c4.png',
    change24h: 12.4,
    marketCap: 7500000000,
    volume24h: 350000000,
    rank: 9,
  },
  {
    name: 'Jupiter',
    symbol: 'JUPITER',
    price: 0.75,
    image: 'https://asset-metadata-service-production.s3.amazonaws.com/asset_icons/5d6ff9739df73322f2ce9938a299a319e555c6c21653209e23decbee853a2808.png',
    change24h: 7.1,
    marketCap: 1000000000,
    volume24h: 120000000,
    rank: 10,
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for seeding...');

    await Crypto.deleteMany({});
    console.log('Cleared existing crypto data.');

    const inserted = await Crypto.insertMany(seedData);
    console.log(`✅ Seeded ${inserted.length} cryptocurrencies successfully.`);

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();
