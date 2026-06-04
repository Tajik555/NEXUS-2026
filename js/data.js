/**
 * NEXUS 2026 - Mock Data & Configuration
 * Финансовые данные, новости, логистические цепочки
 */

const NEXUS_CONFIG = {
    API_TIMEOUT: 5000,
    REFRESH_INTERVAL: 5000,
    ENABLE_SOUND: true,
    ENABLE_ANIMATIONS: true,
    DEBUG_MODE: false,
};

const MOCK_DATA = {
    // ========== MARKET DATA ==========
    stocks: [
        { symbol: 'AAPL', name: 'Apple Inc.', price: 195.45, change: 2.3, volume: 52000000 },
        { symbol: 'MSFT', name: 'Microsoft', price: 378.90, change: 1.8, volume: 28500000 },
        { symbol: 'GOOGL', name: 'Alphabet', price: 140.25, change: -0.5, volume: 22100000 },
        { symbol: 'AMZN', name: 'Amazon', price: 188.75, change: 3.2, volume: 35600000 },
        { symbol: 'TSLA', name: 'Tesla', price: 242.15, change: -3.5, volume: 121300000 },
        { symbol: 'META', name: 'Meta', price: 476.30, change: 5.1, volume: 16800000 },
        { symbol: 'NVDA', name: 'NVIDIA', price: 875.42, change: 4.8, volume: 42900000 },
        { symbol: 'JPM', name: 'JPMorgan', price: 168.90, change: -2.1, volume: 18700000 },
    ],

    crypto: [
        { symbol: 'BTC', name: 'Bitcoin', price: 67450, change: 5.2, volume: 28500000000 },
        { symbol: 'ETH', name: 'Ethereum', price: 3842, change: 3.8, volume: 15200000000 },
        { symbol: 'SOL', name: 'Solana', price: 142.30, change: -1.2, volume: 2100000000 },
        { symbol: 'XRP', name: 'Ripple', price: 2.45, change: 1.5, volume: 8900000000 },
    ],

    forex: [
        { pair: 'EUR/USD', rate: 1.0852, change: 0.25 },
        { pair: 'GBP/USD', rate: 1.2742, change: -0.15 },
        { pair: 'USD/JPY', rate: 150.28, change: 0.8 },
        { pair: 'AUD/USD', rate: 0.6625, change: 0.45 },
    ],

    // ========== NEWS DATA ==========
    news: [
        {
            id: 1,
            title: 'JPMorgan Banking Crisis Alert - Emergency Meeting Called',
            source: 'Bloomberg',
            impact: 'HIGH',
            timestamp: '2026-06-04T14:32:00Z',
            category: 'Finance',
            description: 'Major banking concern triggers market volatility',
        },
        {
            id: 2,
            title: 'Nasdaq Tech Sector Down 3.2% - Sell-Off Intensifies',
            source: 'Reuters',
            impact: 'HIGH',
            timestamp: '2026-06-04T14:15:00Z',
            category: 'Markets',
            description: 'Broad market correction affects technology stocks',
        },
        {
            id: 3,
            title: 'Tesla Manufacturing Increase By 25% - Positive Outlook',
            source: 'Financial Times',
            impact: 'MEDIUM',
            timestamp: '2026-06-04T13:45:00Z',
            category: 'Corporate',
            description: 'Production ramp-up signals strong demand',
        },
        {
            id: 4,
            title: 'Federal Reserve Holds Rates Steady - Market Relief',
            source: 'CNBC',
            impact: 'MEDIUM',
            timestamp: '2026-06-04T13:20:00Z',
            category: 'Economy',
            description: 'Fed pauses rate hikes, signaling stable policy',
        },
        {
            id: 5,
            title: 'Bitcoin Breaks $67K Resistance - Crypto Rally Continues',
            source: 'CoinTelegraph',
            impact: 'LOW',
            timestamp: '2026-06-04T12:50:00Z',
            category: 'Crypto',
            description: 'Digital assets see sustained buying pressure',
        },
    ],

    // ========== PORTFOLIO DATA ==========
    portfolio: {
        totalValue: 127500000,
        dayChange: 5200000,
        dayChangePercent: 5.2,
        positions: [
            { symbol: 'AAPL', shares: 5000, avgCost: 150.0, currentPrice: 195.45, value: 977250 },
            { symbol: 'MSFT', shares: 3000, avgCost: 300.0, currentPrice: 378.90, value: 1136700 },
            { symbol: 'TSLA', shares: 2000, avgCost: 260.0, currentPrice: 242.15, value: 484300 },
            { symbol: 'BTC', amount: 1.5, avgCost: 40000, currentPrice: 67450, value: 101175 },
            { symbol: 'ETH', amount: 10, avgCost: 2000, currentPrice: 3842, value: 38420 },
        ],
    },

    // ========== LOGISTICS DATA ==========
    logistics: [
        {
            id: 1,
            from: { city: 'New York', lat: 40.7128, lng: -74.0060, country: 'USA' },
            to: { city: 'London', lat: 51.5074, lng: -0.1278, country: 'UK' },
            status: 'IN_TRANSIT',
            value: 5000000,
            cargo: 'Electronics',
            progress: 45,
        },
        {
            id: 2,
            from: { city: 'Shanghai', lat: 31.2304, lng: 121.4737, country: 'China' },
            to: { city: 'Los Angeles', lat: 34.0522, lng: -118.2437, country: 'USA' },
            status: 'IN_TRANSIT',
            value: 8500000,
            cargo: 'Semiconductors',
            progress: 60,
        },
        {
            id: 3,
            from: { city: 'Singapore', lat: 1.3521, lng: 103.8198, country: 'Singapore' },
            to: { city: 'Rotterdam', lat: 51.9225, lng: 4.4792, country: 'Netherlands' },
            status: 'DELAYED',
            value: 3200000,
            cargo: 'Textiles',
            progress: 35,
        },
        {
            id: 4,
            from: { city: 'Dubai', lat: 25.2048, lng: 55.2708, country: 'UAE' },
            to: { city: 'Tokyo', lat: 35.6762, lng: 139.6503, country: 'Japan' },
            status: 'IN_TRANSIT',
            value: 6800000,
            cargo: 'Oil Products',
            progress: 75,
        },
        {
            id: 5,
            from: { city: 'Mumbai', lat: 19.0760, lng: 72.8777, country: 'India' },
            to: { city: 'Dubai', lat: 25.2048, lng: 55.2708, country: 'UAE' },
            status: 'COMPLETED',
            value: 2500000,
            cargo: 'Textiles',
            progress: 100,
        },
    ],

    // ========== MARKET TRENDS DATA (24H) ==========
    marketTrend24h: {
        labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '23:59'],
        sp500: [4720, 4650, 4680, 4710, 4680, 4740, 4755],
        nasdaq: [15240, 15100, 15180, 15300, 15250, 15400, 15450],
        djia: [37850, 37650, 37750, 37900, 37800, 38100, 38150],
    },

    // ========== PORTFOLIO ALLOCATION ==========
    allocation: {
        labels: ['Stocks (55%)', 'Crypto (20%)', 'Bonds (15%)', 'Cash (10%)'],
        values: [55, 20, 15, 10],
        colors: ['#00d9ff', '#ff006e', '#b300ff', '#ffd700'],
    },

    // ========== RISK HEATMAP ==========
    riskHeatmap: {
        sectors: ['Tech', 'Finance', 'Energy', 'Healthcare', 'Consumer'],
        riskLevels: [75, 60, 80, 35, 45],
    },

    // ========== AI RESPONSES ==========
    aiResponses: {
        default: 'AXIOM System initialized. Monitoring global markets in real-time. Ready to analyze data and provide strategic insights.',
        apple: 'Apple stock showing strong momentum with +2.3% gain today. Technical indicators suggest continued upward trend. Recommendation: HOLD/ACCUMULATE.',
        market: 'Global markets experiencing mixed signals. Tech sector weakness (-3.2%) offset by energy sector strength. Overall market sentiment: CAUTIOUS.',
        crash: 'CRITICAL ALERT: Market volatility spike detected. Automatic hedging protocols activated. Diversification recommended across asset classes.',
    },
};

// ========== HELPER FUNCTIONS ==========

/**
 * Format number as currency
 */
function formatCurrency(value, decimals = 2) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    }).format(value);
}

/**
 * Format percentage
 */
function formatPercent(value, decimals = 2) {
    return `${value > 0 ? '+' : ''}${value.toFixed(decimals)}%`;
}

/**
 * Format large numbers (K, M, B)
 */
function formatLargeNumber(num) {
    if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K';
    return num.toFixed(2);
}

/**
 * Get color based on change (positive/negative)
 */
function getChangeColor(change) {
    if (change > 0) return 'var(--color-success)';
    if (change < 0) return 'var(--color-danger)';
    return 'var(--color-text-secondary)';
}

/**
 * Get change emoji
 */
function getChangeEmoji(change) {
    if (change > 0) return '↑';
    if (change < 0) return '↓';
    return '→';
}

/**
 * Get random item from array
 */
function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

/**
 * Generate random data point
 */
function generateRandomPrice(base, variance = 0.05) {
    const change = (Math.random() - 0.5) * 2 * variance;
    return base * (1 + change);
}

/**
 * Parse timestamp to readable format
 */
function formatTime(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });
}

/**
 * Get time ago string
 */
function getTimeAgo(timestamp) {
    const now = new Date();
    const time = new Date(timestamp);
    const diff = Math.floor((now - time) / 1000);

    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        NEXUS_CONFIG,
        MOCK_DATA,
        formatCurrency,
        formatPercent,
        formatLargeNumber,
        getChangeColor,
        getChangeEmoji,
        getRandomItem,
        generateRandomPrice,
        formatTime,
        getTimeAgo,
    };
}
