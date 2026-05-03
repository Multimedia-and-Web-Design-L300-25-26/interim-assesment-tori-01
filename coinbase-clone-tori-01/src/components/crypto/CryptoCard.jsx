import { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../common/Card';
import Button from '../common/Button';

const CryptoCard = ({
  symbol,
  name,
  price,
  change,
  changePercent,
  logo,
  volume,
  marketCap,
  rank,
  isInWatchlist = false,
  onWatchlistToggle,
  className = '',
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const isPositive = changePercent > 0;
  const isNegative = changePercent < 0;

  const formatPrice = (price) => {
    if (price >= 1) {
      return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    } else if (price >= 0.01) {
      return `$${price.toFixed(4)}`;
    } else {
      return `$${price.toFixed(6)}`;
    }
  };

  const formatChange = (change) => {
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(2)}`;
  };

  const formatPercent = (percent) => {
    const sign = percent >= 0 ? '+' : '';
    return `${sign}${percent.toFixed(2)}%`;
  };

  return (
    <Card
      hover
      className={`transition-all duration-200 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      <div className="p-6">
        {/* Header with logo and watchlist */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-lg font-bold text-blue-600">
              {logo || symbol.charAt(0)}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
              <p className="text-sm text-gray-600">{symbol}</p>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              onWatchlistToggle?.(symbol);
            }}
            className={`p-2 rounded-full transition-colors ${isInWatchlist
                ? 'text-yellow-500 hover:text-yellow-600 bg-yellow-50'
                : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
              }`}
            title={isInWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
          >
            <svg
              className="w-5 h-5"
              fill={isInWatchlist ? 'currentColor' : 'none'}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
          </button>
        </div>

        {/* Price and Change */}
        <div className="mb-4">
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {formatPrice(price)}
          </div>
          <div className={`text-sm font-semibold ${isPositive ? 'text-green-600' :
              isNegative ? 'text-red-600' : 'text-gray-600'
            }`}>
            {formatChange(change)} ({formatPercent(changePercent)})
          </div>
        </div>

        {/* Additional Stats */}
        {(volume || marketCap || rank) && (
          <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
            {rank && (
              <div>
                <p className="text-gray-600">Rank</p>
                <p className="font-semibold text-gray-900">#{rank}</p>
              </div>
            )}
            {volume && (
              <div>
                <p className="text-gray-600">24h Volume</p>
                <p className="font-semibold text-gray-900">${volume.toLocaleString()}</p>
              </div>
            )}
            {marketCap && (
              <div className="col-span-2">
                <p className="text-gray-600">Market Cap</p>
                <p className="font-semibold text-gray-900">${marketCap.toLocaleString()}</p>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className={`flex gap-2 transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0 md:opacity-100'}`}>
          <Button
            as={Link}
            to={`/price/${name.toLowerCase()}`}
            variant="outline"
            size="sm"
            className="flex-1"
          >
            View Details
          </Button>
          <Button
            as={Link}
            to={`/trade/${symbol}`}
            size="sm"
            className="flex-1"
          >
            Trade
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default CryptoCard;