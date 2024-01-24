import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./slices/AuthSlice";

export const store = configureStore({
  reducer: {
    auth: authSliceReducer,
  },
  devTools: true,
});
