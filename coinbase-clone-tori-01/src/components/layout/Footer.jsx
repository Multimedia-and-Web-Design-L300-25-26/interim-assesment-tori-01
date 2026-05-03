import { Link } from 'react-router-dom';

export default function Footer() {
  const footerLinks = {
    Company: [
      { label: 'About', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Press', href: '#' },
    ],
    Learn: [
      { label: 'Crypto Basics', href: '/learn' },
      { label: 'Trading Tips', href: '/learn' },
      { label: 'Security', href: '#' },
      { label: 'Market Stats', href: '#' },
    ],
    Products: [
      { label: 'Explore', href: '/explore' },
      { label: 'Advanced Trade', href: '#' },
      { label: 'Coinbase Wallet', href: '#' },
      { label: 'Base App', href: '#' },
    ],
    Legal: [
      { label: 'Privacy', href: '#' },
      { label: 'Terms & Conditions', href: '#' },
      { label: 'Cookie Policy', href: '#' },
      { label: 'Accessibility', href: '#' },
    ],
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Logo Section */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">₿</span>
              </div>
              <span className="text-lg font-bold text-white">Coinbase</span>
            </Link>
            <p className="text-sm text-gray-400 mb-4">
              The easiest platform to buy and sell cryptocurrency
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                𝕏
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">GitHub</span>
                Github
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">LinkedIn</span>
                In
              </a>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-white mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8 mt-8">
          {/* Bottom Section */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <label className="block text-sm font-semibold text-white mb-3">
                Language & Region
              </label>
              <select className="bg-gray-800 text-white px-3 py-2 rounded border border-gray-700 text-sm">
                <option>English - Global</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
            <div className="flex items-end">
              <p className="text-sm text-gray-500">
                © 2026 Coinbase. All rights reserved.
              </p>
            </div>
          </div>

          {/* Legal Text */}
          <div className="text-xs text-gray-500 space-y-2">
            <p>
              Coinbase is a digital asset broker and a regulated Money Services Business. 
              Cryptocurrency is not legal tender, is not backed by the government, and accounts 
              and value balances are not subject to Federal Deposit Insurance Corporation (FDIC) 
              or Securities Investor Protection Corporation (SIPC) protections.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}