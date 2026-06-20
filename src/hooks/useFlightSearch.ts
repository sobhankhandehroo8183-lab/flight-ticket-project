"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import {
  setSearchParams,
  setLoading,
  setResults,
  setError,
  clearResults,
} from "@/redux/slices/flightSearchSlice";
import { FlightSearchParams, FlightResult } from "@/types/flight.types";
import toast from "react-hot-toast";
import { useCallback } from "react";

// Mock flight data
const mockFlights: FlightResult[] = [
  {
    id: "1",
    airline: "ترکیش ایرلاینز",
    flightNumber: "TK-1234",
    origin: "IKA",
    destination: "IST",
    departureTime: new Date(Date.now() + 3600000).toISOString(),
    arrivalTime: new Date(Date.now() + 7200000).toISOString(),
    duration: "180",
    price: 12500000,
    currency: "IRR",
    priceInIRR: 12500000,
    stops: 0,
    cabinClass: "economy",
    source: "trip.com",
    isBestPrice: true,
    rating: 4.8,
    reviews: 234,
  },
  {
    id: "2",
    airline: "امارات",
    flightNumber: "EK-5678",
    origin: "IKA",
    destination: "DXB",
    departureTime: new Date(Date.now() + 7200000).toISOString(),
    arrivalTime: new Date(Date.now() + 10800000).toISOString(),
    duration: "240",
    price: 18500000,
    currency: "IRR",
    priceInIRR: 18500000,
    stops: 1,
    stopCities: ["DOH"],
    cabinClass: "economy",
    source: "علی‌بابا",
    isBestPrice: false,
    rating: 4.5,
    reviews: 189,
  },
  {
    id: "3",
    airline: "قطر ایرویز",
    flightNumber: "QR-9012",
    origin: "IKA",
    destination: "LHR",
    departureTime: new Date(Date.now() + 10800000).toISOString(),
    arrivalTime: new Date(Date.now() + 18000000).toISOString(),
    duration: "360",
    price: 32000000,
    currency: "IRR",
    priceInIRR: 32000000,
    stops: 1,
    stopCities: ["DOH"],
    cabinClass: "business",
    source: "فلای‌تودی",
    isBestPrice: false,
    rating: 4.9,
    reviews: 312,
  },
];

export const useFlightSearch = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.flightSearch);

  const searchFlights = useCallback(
    async (params: FlightSearchParams) => {
      dispatch(setLoading(true));
      dispatch(setSearchParams(params));

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        
        // Return mock data
        dispatch(setResults(mockFlights));
        return mockFlights;
      } catch (error: any) {
        const message = error.message || "خطا در ارتباط با سرور";
        dispatch(setError(message));
        toast.error(message);
        return [];
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch]
  );

  const clearSearch = useCallback(() => {
    dispatch(clearResults());
  }, [dispatch]);

  const updateParams = useCallback(
    (params: Partial<FlightSearchParams>) => {
      dispatch(setSearchParams(params));
    },
    [dispatch]
  );

  return {
    ...state,
    searchFlights,
    clearSearch,
    updateParams,
  };
};