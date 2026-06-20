"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import {
  setTripPrices,
  setDomesticPrices,
  setComparisonResult,
  setCompareLoading,
  clearComparison,
} from "@/redux/slices/compareSlice";
import toast from "react-hot-toast";
import { useCallback } from "react";

export const useComparePrices = () => {
  const dispatch = useDispatch();
  const compare = useSelector((state: RootState) => state.compare);

  const compareFlightPrices = useCallback(
    async (flightId: string, flightData: any) => {
      dispatch(setCompareLoading(true));

      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        
        const mockData = {
          tripPrices: [
            { source: "trip.com", price: 12500000, currency: "IRR", priceInIRR: 12500000, isBestPrice: true },
          ],
          domesticPrices: [
            { source: "علی‌بابا", price: 13800000, currency: "IRR", priceInIRR: 13800000, isBestPrice: false },
          ],
          comparisonResult: {
            tripPrice: 12500000,
            domesticPrice: 13800000,
            difference: -1300000,
            savings: 1300000,
            isCheaper: true,
          },
        };

        dispatch(setTripPrices(mockData.tripPrices));
        dispatch(setDomesticPrices(mockData.domesticPrices));
        dispatch(setComparisonResult(mockData.comparisonResult));
        return mockData.comparisonResult;
      } catch (error: any) {
        const message = error.message || "خطا در مقایسه قیمت‌ها";
        toast.error(message);
        return null;
      } finally {
        dispatch(setCompareLoading(false));
      }
    },
    [dispatch]
  );

  const clearCompare = useCallback(() => {
    dispatch(clearComparison());
  }, [dispatch]);

  return {
    ...compare,
    compareFlightPrices,
    clearCompare,
  };
};