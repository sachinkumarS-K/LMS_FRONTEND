import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./slices/AuthSlice";
import courseSliceReducer from "./slices/CourseSlice";

export const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    course: courseSliceReducer,
  },
  devTools: true,
});
