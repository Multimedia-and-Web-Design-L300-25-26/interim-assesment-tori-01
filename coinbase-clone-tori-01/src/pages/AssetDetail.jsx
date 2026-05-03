import { useParams, Link, Navigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/common/Button';

const assetsData = {
  bitcoin: {
    name: 'Bitcoin',
    symbol: 'BTC',
    price: '$65,886.70',
    change: '-$1,341.35 (-2.00%)',
    changeDirection: 'negative',
    iconUrl: 'https://dynamic-assets.coinbase.com/e785e0181f1a23a30d9476038d9be91e9f6c63959b538eabbc51a1abc8898940383291eede695c3b8dfaa1829a9b57f5a2d0a16b0523580346c6b8fab67af14b/asset_icons/b57ac673f06a4b0338a596817eb0a50ce16e2059f327dc117744449a47915cb2.png',
    about: 'The world’s first cryptocurrency, Bitcoin is stored and exchanged securely on the internet through a digital ledger known as a blockchain. Bitcoins are divisible into smaller units known as satoshis — each satoshi is worth 0.00000001 bitcoin.',
    stats: [
      { label: 'Market Cap', value: '$1.31T' },
      { label: 'Volume (24H)', value: '$31.53B' },
      { label: 'Circ. Supply', value: '20M BTC' },
      { label: 'All time high', value: '$126.21K' },
      { label: 'Popularity', value: '#1' },
      { label: 'Dominance', value: '59.64%' },
    ],
    tags: ['mineable', 'pow', 'sha-256', 'store-of-value', 'layer-1']
  },
  ethereum: {
    name: 'Ethereum',
    symbol: 'ETH',
    price: '$1,959.16',
    change: '-$21.75 (-1.10%)',
    changeDirection: 'negative',
    iconUrl: 'https://dynamic-assets.coinbase.com/dbb4b4983bde81309ddab83eb598358eb44375b930b94687ebe38bc22e52c3b2125258ffb8477a5ef22e33d6bd72e32a506c391caa13af64c00e46613c3e5806/asset_icons/4113b082d21cc5fab17fc8f2d19fb996165bcce635e6900f7fc2d57c4ef33ae9.png',
    about: 'Ethereum is a decentralized computing platform that uses ETH (also called Ether) to pay transaction fees (or “gas”). Developers can use Ethereum to run decentralized applications (dApps) and issue new crypto assets, known as Ethereum tokens.',
    stats: [
      { label: 'Market Cap', value: '$236.50B' },
      { label: 'Volume (24H)', value: '$10.82B' },
      { label: 'Circ. Supply', value: '121M ETH' },
      { label: 'All time high', value: '$4.95K' },
      { label: 'Popularity', value: '#2' },
      { label: 'Dominance', value: '10.54%' },
    ],
    tags: ['pos', 'smart-contracts', 'layer-1']
  },
  tether: {
    name: 'Tether',
    symbol: 'USDT',
    price: '$1.00',
    change: '+$0.00 (+0.01%)',
    changeDirection: 'positive',
    iconUrl: 'https://dynamic-assets.coinbase.com/41f6a93a3a222078c939115fc304a67c384886b7a9e6c15dcbfa6519dc45f6bb4a586e9c48535d099efa596dbf8a9dd72b05815bcd32ac650c50abb5391a5bd0/asset_icons/1f8489bb280fb0a0fd643c1161312ba49655040e9aaaced5f9ad3eeaf868eadc.png',
    about: 'Tether (USDT) is an Ethereum token that is pegged to the value of a U.S. dollar (also known as a stablecoin). Tether’s issuer claims that USDT is backed by bank reserves and loans which match or exceed the value of USDT in circulation. Important note: at this time, Coinbase only supports USDT on the Ethereum blockchain (ERC-20). Do not send USDT on any other blockchain to Coinbase.',
    stats: [
      { label: 'Market Cap', value: '$183.96B' },
      { label: 'Volume (24H)', value: '$57.51B' },
      { label: 'Circ. Supply', value: '184B USDT' },
      { label: 'All time high', value: '$1.22' },
      { label: 'Popularity', value: '#3' },
      { label: 'Dominance', value: '8.26%' },
    ],
    tags: ['stablecoin', 'asset-backed-stablecoin', 'usd-stablecoin', 'fiat-stablecoin']
  },
  bnb: {
    name: 'BNB',
    symbol: 'BNB',
    price: '$627.70',
    change: '+$4.36 (+0.70%)',
    changeDirection: 'positive',
    iconUrl: 'https://asset-metadata-service-production.s3.amazonaws.com/asset_icons/c347b6d1a7624e24c4e90089a69dfc8fb75523daf8eeb88007372a0c3a30d428.png',
    about: 'BNB is the native token of the BNB Chain ecosystem, which includes the BNB Smart Chain (formerly Binance Smart Chain) and BNB Beacon Chain.',
    stats: [
      { label: 'Market Cap', value: '$85.64B' },
      { label: 'Volume (24H)', value: '$1.47B' },
      { label: 'Circ. Supply', value: '136M BNB' },
      { label: 'All time high', value: '$1.90K' },
      { label: 'Popularity', value: '#4' },
      { label: 'Dominance', value: '3.79%' },
    ],
    tags: ['marketplace', 'centralized-exchange', 'payments', 'smart-contracts', 'layer-1']
  },
  xrp: {
    name: 'XRP',
    symbol: 'XRP',
    price: '$1.35',
    change: '-$0.02 (-1.29%)',
    changeDirection: 'negative',
    iconUrl: 'https://dynamic-assets.coinbase.com/e81509d2307f706f3a6f8999968874b50b628634abf5154fc91a7e5f7685d496a33acb4cde02265ed6f54b0a08fa54912208516e956bc5f0ffd1c9c2634099ae/asset_icons/3af4b33bde3012fd29dd1366b0ad737660f24acc91750ee30a034a0679256d0b.png',
    about: 'XRP is the native token of the XRP Ledger, and the cryptocurrency used by the Ripple payment network. Built for enterprise use on a global scale, XRP powers cost-efficient cross-border payments.',
    stats: [
      { label: 'Market Cap', value: '$82.90B' },
      { label: 'Volume (24H)', value: '$2.22B' },
      { label: 'Circ. Supply', value: '61B XRP' },
      { label: 'All time high', value: '$3.84' },
      { label: 'Popularity', value: '#5' },
      { label: 'Dominance', value: '3.67%' },
    ],
    tags: ['medium-of-exchange', 'enterprise-solutions', 'us-strategic-crypto-reserve']
  },
  usdc: {
    name: 'USDC',
    symbol: 'USDC',
    price: '$1.00',
    change: '+$0.00 (+0.00%)',
    changeDirection: 'neutral',
    iconUrl: 'https://dynamic-assets.coinbase.com/3c15df5e2ac7d4abbe9499ed9335041f00c620f28e8de2f93474a9f432058742cdf4674bd43f309e69778a26969372310135be97eb183d91c492154176d455b8/asset_icons/9d67b728b6c8f457717154b3a35f9ddc702eae7e76c4684ee39302c4d7fd0bb8.png',
    about: 'USDC is a digital dollar issued by Circle that is fully backed by US dollars and US dollar equivalents. USDC was developed to represent a US Dollar equivalent onchain, and is used to send, store, and receive money between people and businesses without the need for third-party financial institutions.',
    stats: [
      { label: 'Market Cap', value: '$77.24B' },
      { label: 'Volume (24H)', value: '$9.81B' },
      { label: 'Circ. Supply', value: '77B USDC' },
      { label: 'All time high', value: '$1.00' },
      { label: 'Popularity', value: '#6' },
      { label: 'Dominance', value: '3.42%' },
    ],
    tags: ['medium-of-exchange', 'stablecoin', 'asset-backed-stablecoin', 'usd-stablecoin']
  }
};

export default function AssetDetail() {
  const { symbol } = useParams();

  // If no symbol is provided (i.e. at /prices), show an overview of all assets
  if (!symbol) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <main className="flex-1 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
          <h1 className="text-[32px] font-bold text-gray-900 mb-8">Cryptocurrency Prices</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.values(assetsData).map((a) => (
              <Link
                to={`/price/${a.name.toLowerCase()}`}
                key={a.symbol}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md hover:border-gray-300 transition-all duration-200 block group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <img src={a.iconUrl} alt={a.name} className="w-10 h-10 rounded-full" />
                  <div>
                    <h2 className="text-[17px] font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{a.name}</h2>
                    <p className="text-[15px] font-medium text-gray-500">{a.symbol}</p>
                  </div>
                </div>
                <div>
                  <div className="text-[24px] font-bold text-gray-900">{a.price}</div>
                  <div className={`text-[15px] font-semibold mt-1 ${a.changeDirection === 'negative' ? 'text-red-500' : 'text-green-600'}`}>
                    {a.change}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const assetKey = symbol.toLowerCase();
  const asset = assetsData[assetKey];

  if (!asset) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <h1 className="text-2xl font-bold text-gray-900">Asset not found</h1>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Breadcrumbs (Optional, typical for subpages) */}
        <div className="text-[13px] font-semibold text-gray-500 mb-6 flex items-center space-x-2">
          <Link to="/explore" className="hover:text-blue-600 transition-colors">Explore</Link>
          <span>›</span>
          <span className="text-gray-900">{asset.name}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Column (Chart & Info) */}
          <div className="lg:w-2/3">

            {/* Header / Price */}
            <div className="flex items-center mb-6">
              <img src={asset.iconUrl} alt={asset.name} className="w-10 h-10 rounded-full mr-4" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                  {asset.name} <span className="text-gray-500 font-medium ml-2 text-xl">{asset.symbol}</span>
                </h1>
              </div>
            </div>

            <div className="mb-8">
              <div className="text-[40px] font-bold text-gray-900 leading-none mb-2">
                {asset.price}
              </div>
              <div className={`text-[15px] font-semibold ${asset.changeDirection === 'negative' ? 'text-red-500' : 'text-green-600'}`}>
                {asset.change} <span className="text-gray-500 font-medium ml-1">Past 1D</span>
              </div>
            </div>

            {/* Placeholder Chart Area */}
            <div className="w-full h-[300px] border border-gray-100 rounded-xl bg-gray-50 flex items-center justify-center mb-6">
              <span className="text-gray-400 font-medium">Interactive Chart Container</span>
            </div>

            {/* Timeframes */}
            <div className="flex space-x-6 text-[13px] font-semibold border-b border-gray-200 pb-4 mb-10">
              <button className="text-gray-500 hover:text-gray-900">1H</button>
              <button className="text-blue-600 border-b-2 border-blue-600 pb-4 -mb-[18px]">1D</button>
              <button className="text-gray-500 hover:text-gray-900">1W</button>
              <button className="text-gray-500 hover:text-gray-900">1M</button>
              <button className="text-gray-500 hover:text-gray-900">1Y</button>
              <button className="text-gray-500 hover:text-gray-900">ALL</button>
            </div>

            {/* Market Stats */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Market stats</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-4">
                {asset.stats.map((stat, idx) => (
                  <div key={idx}>
                    <div className="flex items-center text-[13px] font-medium text-gray-500 mb-1">
                      {stat.label}
                      <svg className="w-3.5 h-3.5 ml-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <div className="text-[17px] font-semibold text-gray-900">{stat.value}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* About */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">About {asset.name}</h2>
              <p className="text-[15px] text-gray-600 leading-relaxed mb-6">
                {asset.about}
              </p>

              {/* Resources */}
              <div className="flex gap-4">
                <a href="#" className="inline-flex items-center justify-center px-4 py-2 border border-blue-600 rounded-[100px] text-blue-600 font-semibold text-[13px] hover:bg-blue-50 transition-colors">
                  <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  Whitepaper
                </a>
                <a href="#" className="inline-flex items-center justify-center px-4 py-2 border border-blue-600 rounded-[100px] text-blue-600 font-semibold text-[13px] hover:bg-blue-50 transition-colors">
                  <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                  Official website
                </a>
              </div>
            </section>

            {/* Tags */}
            <section>
              <h3 className="text-[17px] font-bold text-gray-900 mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {asset.tags.map((tag, idx) => (
                  <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-[100px] text-[13px] font-semibold hover:bg-gray-200 cursor-pointer transition-colors">
                    {tag}
                  </span>
                ))}
              </div>
            </section>

          </div>

          {/* Right Column (Buy Widget) */}
          <div className="lg:w-1/3">
            <div className="border border-gray-200 rounded-xl p-6 sticky top-24 shadow-sm bg-white">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Buy {asset.name}</h2>
              <div className="space-y-4">
                <Button fullWidth className="h-14 bg-blue-600 hover:bg-blue-700 text-[16px] rounded-[100px] shadow-none">
                  Sign in to buy
                </Button>
                <Button variant="outline" fullWidth className="h-14 border-gray-300 hover:bg-gray-50 text-gray-900 text-[16px] rounded-[100px] shadow-none">
                  Sign up
                </Button>
              </div>
            </div>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
