import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PriceData {
  source: string;
  price: number;
  currency: string;
  priceInIRR: number;
  isBestPrice: boolean;
}

interface CompareState {
  tripPrices: PriceData[];
  domesticPrices: PriceData[];
  comparisonResult: {
    tripPrice: number;
    domesticPrice: number;
    difference: number;
    savings: number;
    isCheaper: boolean;
  } | null;
  isLoading: boolean;
  lastUpdated: string | null;
}

const initialState: CompareState = {
  tripPrices: [],
  domesticPrices: [],
  comparisonResult: null,
  isLoading: false,
  lastUpdated: null,
};

const compareSlice = createSlice({
  name: "compare",
  initialState,
  reducers: {
    setTripPrices: (state, action: PayloadAction<PriceData[]>) => {
      state.tripPrices = action.payload;
    },
    setDomesticPrices: (state, action: PayloadAction<PriceData[]>) => {
      state.domesticPrices = action.payload;
    },
    setComparisonResult: (state, action: PayloadAction<CompareState["comparisonResult"]>) => {
      state.comparisonResult = action.payload;
      state.lastUpdated = new Date().toISOString();
    },
    setCompareLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    clearComparison: (state) => {
      state.tripPrices = [];
      state.domesticPrices = [];
      state.comparisonResult = null;
      state.lastUpdated = null;
    },
  },
});

export const {
  setTripPrices,
  setDomesticPrices,
  setComparisonResult,
  setCompareLoading,
  clearComparison,
} = compareSlice.actions;

export default compareSlice.reducer;