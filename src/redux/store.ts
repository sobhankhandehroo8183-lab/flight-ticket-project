import { configureStore } from "@reduxjs/toolkit";
import flightSearchReducer from "./slices/flightSearchSlice";
import authReducer from "./slices/authSlice";
import compareReducer from "./slices/compareSlice";

export const store = configureStore({
  reducer: {
    flightSearch: flightSearchReducer,
    auth: authReducer,
    compare: compareReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;