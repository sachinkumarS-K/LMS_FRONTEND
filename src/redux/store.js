import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./slices/AuthSlice";
import courseSliceReducer from "./slices/CourseSlice";
import razorpaySliceReducer from "./slices/RazorPaySlice";
import lectureSliceReducer from "./slices/LectureSlice";

export const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    course: courseSliceReducer,
    razorpay: razorpaySliceReducer,
    lecture: lectureSliceReducer,
  },
  devTools: true,
});
