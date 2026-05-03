import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import CryptoCard from '../components/crypto/CryptoCard';
import PriceChart from '../components/crypto/PriceChart';
import { cryptoAPI } from '../services/api';

export default function Home() {
  const [cryptos, setCryptos] = useState([]);
  const [cryptoLoading, setCryptoLoading] = useState(true);
  const [cryptoError, setCryptoError] = useState(null);

  // Fetch top cryptos from the backend
  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const data = await cryptoAPI.getAll();
        if (data.success) {
          setCryptos(data.data.slice(0, 6)); // Show top 6 on home
        }
      } catch (err) {
        console.warn('Could not fetch crypto from backend, using static data:', err.message);
        setCryptoError(err.message);
        // Fallback to static data if backend is not available
        setCryptos(staticCryptos);
      } finally {
        setCryptoLoading(false);
      }
    };

    fetchCryptos();
  }, []);

  const features = [
    { title: 'Secure Storage', description: 'Enterprise-grade security to keep your crypto safe', icon: '🔒' },
    { title: 'Easy to Use', description: 'Simple, intuitive interface for everyone', icon: '✓' },
    { title: 'Low Fees', description: 'Competitive trading fees and transparent pricing', icon: '💰' },
    { title: 'Advanced Trading', description: 'Professional tools for experienced traders', icon: '📊' },
  ];

  const articles = [
    { description: "Get 24/5 access to thousands of stocks and pay zero commission.", href: "https://www.coinbase.com/stocks", image: "https://images.ctfassets.net/o10es7wu5gm1/23gHfTZx8aN8SS1AbYxueV/c74a642deea5d9430aa103adf1210eae/Stocks__1_.png", title: "Trade stocks around the clock" },
    { description: "Unlock leverage with futures and perpetuals trading.", href: "https://www.coinbase.com/derivatives-trading/us-derivatives", image: "https://images.ctfassets.net/o10es7wu5gm1/7kCZtH4AIjrrjDgrwBWQbm/623f3ef8facc44fac88637a6c7ceac5c/Derivatives.png", title: "Trade more with less" },
    { description: "One trusted account for trading everything—from stocks to Bitcoin.", href: "https://www.coinbase.com/explore", title: "Explore millions of tokens and stocks, all in one place." },
    { description: "Trade your predictions on thousands of real world events.", href: "https://www.coinbase.com/prediction-markets", image: "https://images.ctfassets.net/o10es7wu5gm1/6zUsAxrSHcsKobRybPQsgW/d18c0469bc394f2b6af01b0bea61c67c/Prediction_Markets.png", title: "Turn your insights into trades." },
    { description: "Powerful analytical tools with the safety and security of Coinbase.", href: "https://www.coinbase.com/advanced-trade", image: "https://images.ctfassets.net/o10es7wu5gm1/3FwiGvu5fYVsludi8jgOY7/14e7039558786f182123e658c6940151/Advanced.png", title: "Powerful tools, designed for the advanced trader." },
    { description: "Get more out of crypto with one membership: zero trading fees, boosted rewards, priority support, and more.", href: "https://coinbase.com/one?referrer=logged_out", image: "https://images.ctfassets.net/o10es7wu5gm1/4CyfFj8M0X8tKnzh8AgdxT/f0fa52750499d9b1691f62880906ff3e/zero_fees_us.png", label: "COINBASE ONE", title: "Zero trading fees, more rewards." },
  ];

  // Format number as price
  const formatPrice = (price) => {
    if (price >= 1000) return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    if (price >= 1) return `$${price.toFixed(2)}`;
    return `$${price.toFixed(4)}`;
  };

  // Map backend crypto to card format
  const mapCryptoToCard = (crypto) => ({
    symbol: crypto.symbol,
    name: crypto.name,
    price: crypto.price,
    change: crypto.change24h,
    changePercent: crypto.change24h,
    logo: cryptoLogos[crypto.symbol] || crypto.symbol.charAt(0),
    image: crypto.image,
  });

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  The future of finance is here.
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Trade crypto and more on a platform you can trust.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button as={Link} to="/signup" size="lg">Get Started</Button>
                <Button as={Link} to="/explore" variant="outline" size="lg">Explore Assets</Button>
              </div>
            </div>
            <div className="hidden md:flex justify-center lg:justify-end relative">
              <img
                src="https://images.ctfassets.net/o10es7wu5gm1/4lbSrfvF333XkPz7WycixQ/afbeefb68eab9405594b2e9bfbb9a152/Hero__4_.png?fm=avif&w=1800&h=1800&q=65"
                alt="Coinbase Mobile App Interface"
                className="w-full max-w-[500px] object-contain drop-shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Top Cryptos Section */}
      <section className="py-16 md:py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Explore crypto</h2>
              <p className="text-gray-600">Discover Bitcoin, Ethereum, and 500+ other cryptocurrencies</p>
            </div>
            <Link to="/explore" className="hidden md:inline-flex px-6 py-2 text-blue-600 font-semibold hover:bg-blue-50 rounded-lg transition-colors">
              See more assets →
            </Link>
          </div>

          {cryptoLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-28 bg-gray-100 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cryptos.map((crypto) => {
                const card = mapCryptoToCard(crypto);
                return (
                  <CryptoCard
                    key={crypto.symbol}
                    symbol={card.symbol}
                    name={card.name}
                    price={card.price}
                    change={card.change}
                    changePercent={card.changePercent}
                    logo={card.logo}
                    onClick={() => window.location.href = `/price/${card.name.toLowerCase()}`}
                  />
                );
              })}
            </div>
          )}

          <div className="mt-8 text-center md:hidden">
            <Link to="/explore" className="inline-flex px-6 py-2 text-blue-600 font-semibold bg-blue-50 rounded-lg">
              See more assets →
            </Link>
          </div>
        </div>
      </section>

      {/* Price Chart Section */}
      <section className="py-16 md:py-24 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Market Overview</h2>
            <p className="text-lg text-gray-600">Track Bitcoin's performance and market trends</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <PriceChart symbol="BTC" name="Bitcoin" />
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="py-16 md:py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Explore More on Coinbase</h2>
            <p className="text-lg text-gray-600">Discover articles, markets, advanced tools, and more.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, idx) => (
              <a key={idx} href={article.href} target="_blank" rel="noopener noreferrer" className="flex flex-col h-full hover:shadow-lg transition-shadow bg-white rounded-2xl border border-gray-100 overflow-hidden">
                {article.image && (
                  <div className="bg-gray-50 h-48 w-full flex items-center justify-center p-4">
                    <img src={article.image} alt={article.title} className="object-contain max-h-full" />
                  </div>
                )}
                <div className="p-6 flex flex-col flex-1">
                  {article.label && <span className="text-sm font-semibold text-blue-600 mb-2 uppercase tracking-wide">{article.label}</span>}
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{article.title}</h3>
                  {article.description && <p className="text-gray-600 flex-1">{article.description}</p>}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why choose Coinbase?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Join millions of users who trust Coinbase for their crypto journey</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <Card key={idx} padding="lg">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Section */}
      <section className="py-16 md:py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">New to crypto?</h2>
            <p className="text-lg text-gray-600 mb-8">Learn the basics and start your crypto journey</p>
            <Link to="/learn" className="inline-flex px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
              Explore Learning Resources
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Take control of your money</h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">Start your portfolio today and discover crypto. Sign up in minutes.</p>
          <Link to="/signup" className="inline-flex px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
            Sign Up Now
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// Emoji logos for common symbols
const cryptoLogos = {
  BTC: '₿', ETH: '◆', USDT: '₮', BNB: '◈', XRP: '✕',
  USDC: '◎', SOL: '◎', DOGE: 'Ð', HYPE: '⚡', JUPITER: '♃',
};

// Static fallback data
const staticCryptos = [
  { symbol: 'BTC', name: 'Bitcoin', price: 97500, change24h: 5.2 },
  { symbol: 'ETH', name: 'Ethereum', price: 2245.3, change24h: 3.8 },
  { symbol: 'USDT', name: 'Tether', price: 1.0, change24h: 0.01 },
  { symbol: 'BNB', name: 'BNB', price: 618.5, change24h: 2.1 },
  { symbol: 'XRP', name: 'XRP', price: 2.45, change24h: 8.3 },
  { symbol: 'USDC', name: 'USDC', price: 1.0, change24h: 0.0 },
];
