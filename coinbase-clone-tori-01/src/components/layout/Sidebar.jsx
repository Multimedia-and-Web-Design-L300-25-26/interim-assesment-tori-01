import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const mainMenuItems = [
    { icon: '🏠', label: 'Portfolio', href: '/' },
    { icon: '📊', label: 'Trade', href: '/explore' },
    { icon: '📈', label: 'Markets', href: '/explore' },
    { icon: '💼', label: 'Watchlist', href: '/explore' },
    { icon: '📚', label: 'Learn', href: '/learn' },
  ];

  const watchlist = [
    { symbol: 'BTC', name: 'Bitcoin', price: '$42,150', change: '+5.2%' },
    { symbol: 'ETH', name: 'Ethereum', price: '$2,245', change: '+3.8%' },
    { symbol: 'XRP', name: 'XRP', price: '$2.45', change: '+8.3%' },
  ];

  const bottomMenuItems = [
    { icon: '⚙️', label: 'Settings', href: '#' },
    { icon: '❓', label: 'Help', href: '#' },
  ];

  return (
    <div className={`${isCollapsed ? 'w-20' : 'w-64'} bg-gray-50 border-r border-gray-200 h-screen overflow-y-auto transition-all duration-300 fixed left-0 top-16 md:relative md:top-0 z-40`}>
      {/* Collapse Button */}
      <div className="hidden md:flex justify-end p-4 border-b border-gray-200">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
          title={isCollapsed ? 'Expand' : 'Collapse'}
        >
          <svg
            className="w-5 h-5 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isCollapsed ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Main Menu */}
      <nav className="p-4 space-y-2">
        <h3 className={`text-xs font-semibold text-gray-600 uppercase tracking-wide px-3 py-2 ${isCollapsed ? 'hidden' : 'block'}`}>
          Menu
        </h3>
        {mainMenuItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all ${
              isActive(item.href)
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
            title={isCollapsed ? item.label : ''}
          >
            <span className="text-xl flex-shrink-0">{item.icon}</span>
            {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
          </Link>
        ))}
      </nav>

      {/* Divider */}
      <div className="border-t border-gray-200" />

      {/* Watchlist Section */}
      {!isCollapsed && (
        <div className="p-4">
          <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wide px-3 py-2 mb-2">
            Watchlist
          </h3>
          <div className="space-y-2">
            {watchlist.map((crypto) => (
              <Link
                key={crypto.symbol}
                to={`/asset/${crypto.symbol}`}
                className="flex items-between justify-between p-3 rounded-lg hover:bg-gray-100 transition-colors group"
              >
                <div>
                  <p className="text-sm font-semibold text-gray-900">{crypto.symbol}</p>
                  <p className="text-xs text-gray-600">{crypto.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">{crypto.price}</p>
                  <p className={`text-xs font-semibold ${crypto.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {crypto.change}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Divider */}
      <div className="border-t border-gray-200 mt-4" />

      {/* Quick Stats */}
      {!isCollapsed && (
        <div className="p-4">
          <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wide px-3 py-2 mb-3">
            Portfolio
          </h3>
          <div className="space-y-3">
            <div className="p-3 bg-white rounded-lg border border-gray-200">
              <p className="text-xs text-gray-600">Balance</p>
              <p className="text-lg font-bold text-gray-900">$12,450.50</p>
            </div>
            <div className="p-3 bg-white rounded-lg border border-gray-200">
              <p className="text-xs text-gray-600">24h Change</p>
              <p className="text-lg font-bold text-green-600">+$245.30</p>
            </div>
          </div>
        </div>
      )}

      {/* Divider */}
      <div className="border-t border-gray-200 flex-1" />

      {/* Bottom Menu */}
      <nav className="p-4 space-y-2 border-t border-gray-200">
        {bottomMenuItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className="flex items-center gap-3 px-3 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            title={isCollapsed ? item.label : ''}
          >
            <span className="text-xl flex-shrink-0">{item.icon}</span>
            {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
          </Link>
        ))}
      </nav>
    </div>
  );
}
