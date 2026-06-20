import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FlightSearchState {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  adults: number;
  children: number;
  cabinClass: "economy" | "premium" | "business" | "first";
  isLoading: boolean;
  results: any[];
  error: string | null;
}

const initialState: FlightSearchState = {
  origin: "",
  destination: "",
  departureDate: "",
  returnDate: "",
  adults: 1,
  children: 0,
  cabinClass: "economy",
  isLoading: false,
  results: [],
  error: null,
};

const flightSearchSlice = createSlice({
  name: "flightSearch",
  initialState,
  reducers: {
    setSearchParams: (state, action: PayloadAction<Partial<FlightSearchState>>) => {
      return { ...state, ...action.payload };
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setResults: (state, action: PayloadAction<any[]>) => {
      state.results = action.payload;
      state.isLoading = false;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearResults: (state) => {
      state.results = [];
      state.error = null;
    },
  },
});

export const {
  setSearchParams,
  setLoading,
  setResults,
  setError,
  clearResults,
} = flightSearchSlice.actions;

export default flightSearchSlice.reducer;