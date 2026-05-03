import { useState, useEffect, useMemo, useCallback } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';

const PriceChart = ({
  data = [],
  symbol = 'BTC',
  currentPrice = 0,
  priceChange = 0,
  priceChangePercent = 0,
  className = '',
  height = 400,
  ...props
}) => {
  const [timeframe, setTimeframe] = useState('1D');

  const timeframes = [
    { label: '1H', value: '1H' },
    { label: '1D', value: '1D' },
    { label: '1W', value: '1W' },
    { label: '1M', value: '1M' },
    { label: '1Y', value: '1Y' },
    { label: 'ALL', value: 'ALL' },
  ];

  // Generate sample data if none provided
  const generateSampleData = useCallback((period) => {
    const now = new Date();
    const points = period === '1H' ? 60 : period === '1D' ? 24 : period === '1W' ? 7 : period === '1M' ? 30 : period === '1Y' ? 365 : 1000;
    const interval = period === '1H' ? 60000 : period === '1D' ? 3600000 : 86400000; // milliseconds

    const data = [];
    let price = currentPrice || 42000;

    // Use a seeded random function to avoid Math.random during render
    let seed = 12345;
    const seededRandom = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };

    for (let i = points; i >= 0; i--) {
      const time = new Date(now.getTime() - (i * interval));
      // Add some random price movement
      const change = (seededRandom() - 0.5) * 0.02; // ±1% change
      price = price * (1 + change);
      price = Math.max(price, currentPrice * 0.5); // Don't go too low

      data.push({
        time: time.getTime(),
        price: price,
        volume: seededRandom() * 1000000,
      });
    }

    return data;
  }, [currentPrice]);

  // Use provided data or generate sample data
  const chartData = useMemo(() => {
    if (data && data.length > 0) {
      return data;
    }
    return generateSampleData(timeframe);
  }, [data, timeframe, generateSampleData]);

  useEffect(() => {
    // Simulate API call delay for timeframe changes
    const timer = setTimeout(() => {
      // Data is already updated via useMemo
    }, 300);
    return () => clearTimeout(timer);
  }, [timeframe]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  const formatChange = (change, percent) => {
    const sign = change >= 0 ? '+' : '';
    return `${sign}${formatPrice(change)} (${sign}${percent.toFixed(2)}%)`;
  };

  // Simple SVG chart (in a real app, you'd use a charting library like Chart.js or Recharts)
  const renderChart = () => {
    if (!chartData || chartData.length === 0) {
      return (
        <div className="flex items-center justify-center h-full text-gray-500">
          No data available
        </div>
      );
    }

    const prices = chartData.map(d => d.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const priceRange = maxPrice - minPrice;

    const width = 100; // percentage
    const height = 100; // percentage

    // Create path for the price line
    const pathData = chartData.map((point, index) => {
      const x = (index / (chartData.length - 1)) * width;
      const y = height - ((point.price - minPrice) / priceRange) * height;
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');

    const isPositive = priceChangePercent >= 0;

    return (
      <div className="relative h-full">
        <svg
          className="w-full h-full"
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="none"
        >
          {/* Grid lines */}
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#f3f4f6" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Price line */}
          <path
            d={pathData}
            fill="none"
            stroke={isPositive ? '#10b981' : '#ef4444'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Gradient fill under the line */}
          <defs>
            <linearGradient id="priceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={isPositive ? '#10b981' : '#ef4444'} stopOpacity="0.3" />
              <stop offset="100%" stopColor={isPositive ? '#10b981' : '#ef4444'} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d={`${pathData} L ${width} ${height} L 0 ${height} Z`}
            fill="url(#priceGradient)"
          />
        </svg>

        {/* Price labels */}
        <div className="absolute top-2 left-2 text-xs text-gray-600">
          <div className="font-semibold">{formatPrice(maxPrice)}</div>
        </div>
        <div className="absolute bottom-2 left-2 text-xs text-gray-600">
          <div className="font-semibold">{formatPrice(minPrice)}</div>
        </div>
      </div>
    );
  };

  return (
    <Card className={className} {...props}>
      <div className="p-6">
        {/* Header with price and change */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl font-bold text-gray-900">
                {formatPrice(currentPrice)}
              </span>
              <span className={`text-sm font-semibold px-2 py-1 rounded ${
                priceChangePercent >= 0
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {priceChangePercent >= 0 ? '↗' : '↘'} {Math.abs(priceChangePercent).toFixed(2)}%
              </span>
            </div>
            <div className={`text-sm ${
              priceChangePercent >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {formatChange(priceChange, priceChangePercent)}
            </div>
          </div>

          <div className="text-right">
            <div className="text-sm text-gray-600">{symbol}/USD</div>
            <div className="text-xs text-gray-500">
              {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>

        {/* Timeframe selector */}
        <div className="flex gap-1 mb-4">
          {timeframes.map((tf) => (
            <Button
              key={tf.value}
              variant={timeframe === tf.value ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setTimeframe(tf.value)}
              className="px-3 py-1 text-xs"
            >
              {tf.label}
            </Button>
          ))}
        </div>

        {/* Chart */}
        <div className={`relative bg-gray-50 rounded-lg overflow-hidden`} style={{ height: `${height}px` }}>
          {renderChart()}
        </div>

        {/* Chart controls */}
        <div className="flex items-center justify-between mt-4 text-xs text-gray-600">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <div className={`w-3 h-3 rounded-full ${priceChangePercent >= 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span>{symbol}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="p-1 hover:bg-gray-200 rounded">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className="p-1 hover:bg-gray-200 rounded">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PriceChart;