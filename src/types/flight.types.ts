export interface FlightSearchParams {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  adults: number;
  children?: number;
  infants?: number;
  cabinClass: "economy" | "premium" | "business" | "first";
  currency?: string;
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
  rating?: number;
  reviews?: number;
}

export interface CompareResult {
  tripPrice: number;
  domesticPrice: number;
  difference: number;
  savings: number;
  isCheaper: boolean;
  tripSource: string;
  domesticSource: string;
  lastUpdated: string;
}

export interface PriceData {
  source: string;
  price: number;
  currency: string;
  priceInIRR: number;
  isBestPrice: boolean;
  features?: string[];
}