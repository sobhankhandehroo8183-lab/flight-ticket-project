export const config = {
  api: {
    url: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
    timeout: 30000,
  },
  websocket: {
    url: process.env.NEXT_PUBLIC_WEBSOCKET_URL || "ws://localhost:3001",
    reconnectAttempts: 5,
    reconnectInterval: 3000,
  },
  exchange: {
    apiKey: process.env.NEXT_PUBLIC_EXCHANGE_RATE_API_KEY,
    eurToIrr: Number(process.env.NEXT_PUBLIC_EUR_TO_IRR) || 92500,
    updateInterval: 60000, // 1 minute
  },
  search: {
    defaultAdults: 1,
    maxAdults: 9,
    maxChildren: 9,
    cacheTime: 300, // 5 minutes
  },
  pagination: {
    defaultLimit: 20,
    maxLimit: 100,
  },
} as const;

export default config; 
