import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export default function Learn() {
  const featuredArticle = {
    tag: 'Video Tutorial',
    title: 'When is the best time to invest in crypto?',
    description: 'When prices are fluctuating, how do you know when to buy? Learn more about using dollar-cost averaging to weather price volatility.',
    image: 'https://images.ctfassets.net/q5ulk4bp65r7/3K4qo02ZA5PkwyN5Rm7gjm/945bce812fc91da9ef737516142eb281/Dollar-Cost_avg.png?w=768&fm=png',
    link: 'https://www.coinbase.com/learn/tips-and-tutorials/dollar-cost-averaging'
  };

  const popularArticles = [
    { tag: "Beginner's Guide", title: 'What is cryptocurrency?', link: 'https://www.coinbase.com/learn/crypto-basics/what-is-cryptocurrency' },
    { tag: "Getting started", title: 'How to earn crypto rewards', link: 'https://www.coinbase.com/learn/tips-and-tutorials/how-to-earn-crypto-rewards' },
    { tag: "Getting Started", title: 'How to add crypto to your Coinbase Wallet', link: 'https://www.coinbase.com/learn/wallet/how-to-add-crypto-to-cb-wallet' },
    { tag: "Your crypto", title: 'Tax forms, explained: A guide to U.S. tax forms and crypto reports', link: 'https://www.coinbase.com/learn/your-crypto/tax-documents-explained' },
    { tag: "Getting Started", title: 'Beginner’s guide to dapps', link: 'https://www.coinbase.com/learn/wallet/guide-to-dapps' },
    { tag: "Market Update", title: 'Everything you need to know about the first-ever U.S. Bitcoin ETF', link: 'https://www.coinbase.com/learn/crypto-basics/what-is-a-bitcoin-futures-etf' },
  ];

  const categories = [
    { title: 'Crypto basics', image: 'https://images.ctfassets.net/q5ulk4bp65r7/3y6qEXfZEKWUIFCXitE2CM/975c866ebacafdff5c23779fa2168c51/3.png' },
    { title: 'Tips and tutorials', image: 'https://images.ctfassets.net/q5ulk4bp65r7/31wYl0Vic7W3ZktCPHMOQ8/472cc5a7d6220c2c852619898c12e1a8/4.png' },
    { title: 'Advanced trading', image: 'https://images.ctfassets.net/q5ulk4bp65r7/55csxsO3KyYgwnwNQHXAXi/efeb47068c8c76d35e1e62df77638124/AdvancedTrading_ChartsIndicatorsCandlesEtc.png' },
    { title: 'Futures', image: 'https://images.ctfassets.net/q5ulk4bp65r7/6baYypQ3LKoYOzMQyRQusH/645784649490f41b75dca08f955369fe/futures_anchor.png' },
  ];

  const cryptoBasics = [
    { tag: "Beginner's Guide", title: 'What is Bitcoin?', description: 'Bitcoin is the world\'s first widely adopted cryptocurrency — it allows for secure and seamless peer-to-peer transactions on the internet.', image: 'https://images.ctfassets.net/q5ulk4bp65r7/lUIdMeDm9tf33LZNjPqz8/a44f28b20bd9846efc62cf5a230d875a/Learn_Illustration_Ultimate_Guide_Bitcoin.webp?w=768&fm=png' },
    { tag: "Beginner's Guide", title: 'Guide to DeFi tokens and altcoins', description: 'From Aave to Zcash, decide what to trade with our beginner\'s guide', image: 'https://images.ctfassets.net/q5ulk4bp65r7/3rv8jr1B1Z1dZ2EhHqo7dp/e74ddbf1cd4836b83d34fe5cec351d78/Alt-Coin.png?w=768&fm=png' },
    { tag: "Beginner's guide", title: 'What is Ethereum?', image: 'https://images.ctfassets.net/q5ulk4bp65r7/3thWklmvu2WmAHJh0k1AcC/51521feeef170d94a446fbec6f262912/what-is-ethereum.png?w=768&fm=png' },
    { tag: "Key term", title: 'What is DeFi?', image: 'https://images.ctfassets.net/q5ulk4bp65r7/2lrWtXLcleZPbsnzZnEeLB/bbd5a35075619f07e083fce5fdbf15f9/Learn_Illustration_What_is_DeFi.jpg?w=768&fm=png' },
    { tag: "Beginner's Guide", title: 'What is a stablecoin?', image: 'https://images.ctfassets.net/q5ulk4bp65r7/3hETt7h2hfvnOnVVrJIvlO/b7204c2b9a1a35d39d0dd396d2cf49bb/Learn_Illustration_What_is_a_stablecoin.jpg?w=768&fm=png' },
    { tag: "Glossary", title: 'Don’t let FUD give you FOMO or you’ll end up REKT — crypto slang, explained', image: 'https://images.ctfassets.net/q5ulk4bp65r7/5fZ31B0CLFBDfIWK3DQPTN/b98e564a067cbb252995d654006cee09/Group_31612615.png?w=768&fm=png' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Header */}
      <section className="bg-[#0052FF] text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto text-center md:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-[64px] font-bold leading-tight mb-6">
            Crypto questions, answered
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl">
            Beginner guides, practical tips, and market updates for first-timers, experienced investors, and everyone in between
          </p>
        </div>
      </section>

      <main className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">

        {/* Featured & Popular Section */}
        <div className="flex flex-col lg:flex-row gap-12">

          {/* Featured Article */}
          <div className="lg:w-2/3">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured</h2>
            <a href={featuredArticle.link} target="_blank" rel="noopener noreferrer" className="group block">
              <div className="rounded-2xl overflow-hidden mb-6 border border-gray-100">
                <img src={featuredArticle.image} alt="Featured article" className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="text-blue-600 font-semibold text-sm tracking-wide uppercase mb-3">
                {featuredArticle.tag}
              </div>
              <h3 className="text-[32px] font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                {featuredArticle.title}
              </h3>
              <p className="text-lg text-gray-600">
                {featuredArticle.description}
              </p>
            </a>
          </div>

          {/* Popular List */}
          <div className="lg:w-1/3">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular</h2>
            <div className="flex flex-col">
              {popularArticles.map((article, idx) => (
                <a key={idx} href={article.link} target="_blank" rel="noopener noreferrer" className="py-6 border-b border-gray-200 group first:pt-0 hover:bg-gray-50 -mx-4 px-4 rounded-xl transition-colors">
                  <div className="text-blue-600 font-semibold text-sm tracking-wide uppercase mb-2">
                    {article.tag}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {article.title}
                  </h3>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, idx) => (
            <a key={idx} href="#" className="flex items-center p-4 bg-gray-50 rounded-xl hover:shadow-md transition-all group border border-transparent hover:border-gray-200">
              <img src={category.image} alt={category.title} className="w-16 h-16 mr-4 rounded-lg object-cover" />
              <div>
                <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{category.title}</h3>
                <span className="text-blue-600 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex items-center mt-1">
                  See more <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Crypto Basics Section */}
        <div>
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Crypto basics</h2>
              <p className="text-lg text-gray-600">New to crypto? Not for long — start with these guides and explainers</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cryptoBasics.map((article, idx) => (
              <a key={idx} href="#" className="group flex flex-col">
                <div className="border border-gray-200 rounded-xl overflow-hidden mb-4 bg-gray-50 h-48">
                  <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="text-blue-600 font-semibold text-sm tracking-wide uppercase mb-2">
                  {article.tag}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {article.title}
                </h3>
                {article.description && (
                  <p className="text-gray-600 line-clamp-3">
                    {article.description}
                  </p>
                )}
              </a>
            ))}
          </div>

          <div className="mt-8">
            <a href="#" className="inline-flex items-center text-blue-600 font-bold hover:underline py-2">
              See more crypto basics
              <svg className="w-5 h-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </a>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
