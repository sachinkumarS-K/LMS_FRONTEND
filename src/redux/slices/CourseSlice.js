import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../utils/axiosInstance";

const initialState = {
  courseData: [],
};
export const getAllCourses = createAsyncThunk("/course/getCourse", async () => {
  try {
    const res = axiosInstance.get("/courses");

    toast.promise(res, {
      loading: "Loading Course Data",
      success: "Course loaded successfully",
      error: "Failed to load Courses",
    });
    return (await res).data.courses;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

const coureseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCourses.fulfilled, (state, action) => {
      if (action.payload) {
        state.courseData = action.payload;
      }
    });
  },
});
export default coureseSlice.reducer;
