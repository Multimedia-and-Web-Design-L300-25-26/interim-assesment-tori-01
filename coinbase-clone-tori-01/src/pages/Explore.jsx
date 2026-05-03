import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/common/Button';
import { cryptoAPI } from '../services/api';

export default function Explore() {
  const [allCryptos, setAllCryptos] = useState([]);
  const [gainers, setGainers] = useState([]);
  const [newListings, setNewListings] = useState([]);

  // Add Crypto form state
  const [showAddForm, setShowAddForm] = useState(false);
  const [addForm, setAddForm] = useState({ name: '', symbol: '', price: '', image: '', change24h: '' });
  const [addLoading, setAddLoading] = useState(false);
  const [addResult, setAddResult] = useState(null); // { success, message }
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'gainers' | 'new'

  const marketStats = [
    { label: 'Total market cap', value: '$2.23T', change: '-1.38%' },
    { label: 'Trade volume', value: '$117.40B', change: '+4.81%' },
    { label: 'Buy-sell ratio', value: '$0.76', change: '-2.51%' },
    { label: 'BTC dominance', value: '60.09%', change: '-0.19%' },
  ];

  // Fetch all crypto data from the backend
  const fetchData = async () => {
    setLoading(true);
    try {
      const [allRes, gainersRes, newRes] = await Promise.allSettled([
        cryptoAPI.getAll(),
        cryptoAPI.getGainers(),
        cryptoAPI.getNew(),
      ]);

      if (allRes.status === 'fulfilled' && allRes.value.success) {
        setAllCryptos(allRes.value.data);
      } else {
        setAllCryptos(staticAssets);
      }

      if (gainersRes.status === 'fulfilled' && gainersRes.value.success) {
        setGainers(gainersRes.value.data);
      }

      if (newRes.status === 'fulfilled' && newRes.value.success) {
        setNewListings(newRes.value.data);
      }
    } catch (err) {
      console.warn('Backend not available, using static data:', err.message);
      setAllCryptos(staticAssets);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  // Handle Add Cryptocurrency form submission
  const handleAddCrypto = async (e) => {
    e.preventDefault();
    const { name, symbol, price, image, change24h } = addForm;

    if (!name.trim() || !symbol.trim() || !price) {
      setAddResult({ success: false, message: 'Name, symbol, and price are required.' });
      return;
    }

    setAddLoading(true);
    setAddResult(null);

    try {
      const data = await cryptoAPI.add({
        name: name.trim(),
        symbol: symbol.trim().toUpperCase(),
        price: parseFloat(price),
        image: image.trim(),
        change24h: change24h !== '' ? parseFloat(change24h) : 0,
      });

      setAddResult({ success: true, message: data.message || `${name} added successfully!` });
      setAddForm({ name: '', symbol: '', price: '', image: '', change24h: '' });
      // Refresh the crypto list so the new coin appears immediately
      fetchData();
    } catch (err) {
      setAddResult({ success: false, message: err.message || 'Failed to add cryptocurrency.' });
    } finally {
      setAddLoading(false);
    }
  };

  const isPositive = (change) => {
    if (typeof change === 'number') return change > 0;
    return String(change).startsWith('+');
  };

  const formatChange = (change) => {
    if (typeof change === 'number') {
      return `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`;
    }
    return change;
  };

  const formatPrice = (price) => {
    if (typeof price === 'number') {
      if (price >= 1000) return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      if (price >= 1) return `$${price.toFixed(2)}`;
      return `$${price.toFixed(4)}`;
    }
    return price;
  };

  const formatMarketCap = (cap) => {
    if (!cap) return '—';
    if (cap >= 1e12) return `$${(cap / 1e12).toFixed(2)}T`;
    if (cap >= 1e9) return `$${(cap / 1e9).toFixed(1)}B`;
    if (cap >= 1e6) return `$${(cap / 1e6).toFixed(1)}M`;
    return `$${cap.toLocaleString()}`;
  };

  // Which dataset to show in the main table
  const tableData = activeTab === 'gainers' ? gainers : activeTab === 'new' ? newListings : allCryptos;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-[32px] font-bold text-gray-900 mb-6">Explore crypto</h1>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Market stats</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {marketStats.map((stat, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="text-[13px] text-gray-500 font-medium mb-1">{stat.label}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-semibold text-gray-900">{stat.value}</span>
                    <span className={`text-[13px] font-semibold ${isPositive(stat.change) ? 'text-green-600' : 'text-red-500'}`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-[15px] text-gray-600 leading-relaxed max-w-4xl">
              The overall crypto market is shrinking this week. As of today, the total crypto market capitalization is 2.23 trillion, representing a 0.58% decrease from last week. The 24-hour crypto market trading volume has also seen a 1.38% decrease over the past day...
              <button className="text-blue-600 font-semibold ml-1 hover:underline">Read more</button>
            </p>
          </div>
        </div>

        {/* Add Cryptocurrency Panel */}
        <div className="mb-8">
          <button
            id="toggle-add-crypto-form"
            onClick={() => { setShowAddForm(!showAddForm); setAddResult(null); }}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors duration-200 shadow-sm"
          >
            <svg className={`w-4 h-4 transition-transform duration-200 ${showAddForm ? 'rotate-45' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            {showAddForm ? 'Cancel' : 'Add Cryptocurrency'}
          </button>

          {showAddForm && (
            <div className="mt-4 bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Add New Cryptocurrency
              </h3>

              {/* Feedback message */}
              {addResult && (
                <div className={`mb-5 px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2 ${
                  addResult.success
                    ? 'bg-green-50 border border-green-200 text-green-700'
                    : 'bg-red-50 border border-red-200 text-red-700'
                }`}>
                  {addResult.success ? (
                    <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  )}
                  {addResult.message}
                </div>
              )}

              <form id="add-crypto-form" onSubmit={handleAddCrypto} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Name <span className="text-red-500">*</span></label>
                  <input
                    id="crypto-name"
                    type="text"
                    placeholder="e.g. Bitcoin"
                    value={addForm.name}
                    onChange={(e) => setAddForm({ ...addForm, name: e.target.value })}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Symbol <span className="text-red-500">*</span></label>
                  <input
                    id="crypto-symbol"
                    type="text"
                    placeholder="e.g. BTC"
                    value={addForm.symbol}
                    onChange={(e) => setAddForm({ ...addForm, symbol: e.target.value.toUpperCase() })}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 uppercase"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Price (USD) <span className="text-red-500">*</span></label>
                  <input
                    id="crypto-price"
                    type="number"
                    step="any"
                    min="0"
                    placeholder="e.g. 97500"
                    value={addForm.price}
                    onChange={(e) => setAddForm({ ...addForm, price: e.target.value })}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">24h Change (%)</label>
                  <input
                    id="crypto-change"
                    type="number"
                    step="any"
                    placeholder="e.g. +2.5 or -1.3"
                    value={addForm.change24h}
                    onChange={(e) => setAddForm({ ...addForm, change24h: e.target.value })}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="sm:col-span-2 lg:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Image URL</label>
                  <input
                    id="crypto-image"
                    type="url"
                    placeholder="https://example.com/coin-icon.png"
                    value={addForm.image}
                    onChange={(e) => setAddForm({ ...addForm, image: e.target.value })}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="sm:col-span-2 lg:col-span-3 flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => { setAddForm({ name: '', symbol: '', price: '', image: '', change24h: '' }); setAddResult(null); }}
                    className="px-5 py-2.5 text-sm font-semibold text-gray-600 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    Clear
                  </button>
                  <button
                    id="submit-add-crypto"
                    type="submit"
                    disabled={addLoading}
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-semibold rounded-xl transition-colors duration-200 flex items-center gap-2"
                  >
                    {addLoading && (
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                    )}
                    {addLoading ? 'Adding…' : 'Add Cryptocurrency'}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Tabs: All / Top Gainers / New Listings */}

        <div className="mb-8">
          <div className="flex items-center gap-1 border-b border-gray-200">
            {[
              { key: 'all', label: 'All Crypto' },
              { key: 'gainers', label: 'Top Gainers' },
              { key: 'new', label: 'New Listings' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-5 py-3 text-sm font-semibold transition-colors border-b-2 -mb-px ${
                  activeTab === tab.key
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Assets Table */}
        <div className="mb-12">
          {loading ? (
            <div className="space-y-3">
              {[...Array(7)].map((_, i) => (
                <div key={i} className="h-16 bg-gray-100 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : tableData.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <p className="text-lg font-medium">No cryptocurrencies found.</p>
              {activeTab !== 'all' && (
                <p className="text-sm mt-2">Add some cryptocurrencies via the API to see data here.</p>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 text-[13px] text-gray-500 font-semibold">
                    <th className="pb-3 pl-2">#</th>
                    <th className="pb-3">Asset</th>
                    <th className="pb-3 text-right">Price</th>
                    <th className="pb-3 text-right">24h Change</th>
                    <th className="pb-3 text-right hidden md:table-cell">Mkt Cap</th>
                    <th className="pb-3 text-right hidden lg:table-cell">Volume</th>
                    <th className="pb-3 text-right pr-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((asset, idx) => (
                    <tr key={asset._id || asset.symbol} className="border-b border-gray-100 hover:bg-gray-50 transition-colors group cursor-pointer">
                      <td className="py-4 pl-2 text-gray-400 text-[13px]">{idx + 1}</td>
                      <td className="py-4">
                        <div className="flex items-center">
                          {asset.image ? (
                            <img src={asset.image} alt={asset.name} className="w-8 h-8 rounded-full mr-4" onError={(e) => { e.target.style.display = 'none'; }} />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                              <span className="text-blue-600 font-bold text-xs">{asset.symbol?.charAt(0)}</span>
                            </div>
                          )}
                          <div>
                            <div className="font-semibold text-gray-900 text-[17px]">{asset.name}</div>
                            <div className="text-[15px] text-gray-500">{asset.symbol}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 text-right">
                        <span className="font-medium text-gray-900 text-[15px]">{formatPrice(asset.price)}</span>
                      </td>
                      <td className="py-4 text-right">
                        <span className={`font-medium text-[15px] ${
                          isPositive(asset.change24h) ? 'text-green-600' :
                          asset.change24h === 0 ? 'text-gray-500' : 'text-red-500'
                        }`}>
                          {formatChange(asset.change24h)}
                        </span>
                      </td>
                      <td className="py-4 text-right hidden md:table-cell">
                        <span className="text-gray-900 text-[15px]">{formatMarketCap(asset.marketCap)}</span>
                      </td>
                      <td className="py-4 text-right hidden lg:table-cell">
                        <span className="text-gray-900 text-[15px]">{formatMarketCap(asset.volume24h)}</span>
                      </td>
                      <td className="py-4 text-right pr-2">
                        <Button as={Link} to="/signup" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                          Trade
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

// Static fallback assets
const staticAssets = [
  { name: 'Bitcoin', symbol: 'BTC', price: 97500, change24h: 5.2, marketCap: 1900000000000, volume24h: 29000000000 },
  { name: 'Ethereum', symbol: 'ETH', price: 2245.3, change24h: 3.8, marketCap: 270000000000, volume24h: 13700000000 },
  { name: 'Tether', symbol: 'USDT', price: 1.0, change24h: 0.01, marketCap: 184000000000, volume24h: 57400000000 },
  { name: 'BNB', symbol: 'BNB', price: 618.5, change24h: 2.1, marketCap: 83600000000, volume24h: 1200000000 },
  { name: 'XRP', symbol: 'XRP', price: 2.45, change24h: 8.3, marketCap: 82100000000, volume24h: 1400000000 },
  { name: 'USDC', symbol: 'USDC', price: 1.0, change24h: 0.0, marketCap: 77200000000, volume24h: 5300000000 },
  { name: 'Solana', symbol: 'SOL', price: 165.0, change24h: 6.7, marketCap: 71000000000, volume24h: 2300000000 },
];
