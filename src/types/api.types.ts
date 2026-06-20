export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  statusCode?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface FlightSearchResponse {
  flights: FlightResult[];
  total: number;
  searchId: string;
  source: string;
}

export interface CompareResponse {
  tripPrice: number;
  domesticPrice: number;
  difference: number;
  savings: number;
  isCheaper: boolean;
  tripSource: string;
  domesticSource: string;
  lastUpdated: string;
  currency: string;
}

export interface FlightResult {
  id: string;
  airline: string;
  flightNumber: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  currency: string;
  priceInIRR: number;
  stops: number;
  stopCities?: string[];
  cabinClass: string;
  source: string;
  isBestPrice: boolean;
  bookingUrl?: string;
} 
