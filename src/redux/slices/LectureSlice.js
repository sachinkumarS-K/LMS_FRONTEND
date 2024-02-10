import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../utils/axiosInstance";

const initialState = {
  lectures: [],
};

export const getCourseLecture = createAsyncThunk(
  "/course/lecture/get",
  async (cid) => {
    try {
      const res = axiosInstance.get(`/courses/${cid}`);
      toast.promise(res, {
        loading: "Fetching course lectures",
        success: "lectures fetched successfully",
        error: "Filed to fetch course lectures",
      });
      return (await res).data;
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  }
);
export const addCourseLecture = createAsyncThunk(
  "/course/lecture/add",
  async (data) => {
    try {
      const formData = new FormData();
      formData.append("lecture", data.lecture);
      formData.append("title", data.title);
      formData.append("description", data.description);
      const res = axiosInstance.post(`/courses/${data.id}`, formData);
      toast.promise(res, {
        loading: "Adding course lectures",
        success: "lectures added successfully",
        error: "Filed to add lecture",
      });
      return (await res).data;
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  }
);
export const deleteCourseLecture = createAsyncThunk(
  "/course/lecture/delete",
  async (data) => {
    console.log(data);
    try {
      const res = axiosInstance.delete(
        `/courses/?courseId=${data.courseId}&lectureId=${data.lectureId}`
      );
      toast.promise(res, {
        loading: "Delating course lectures",
        success: "lectures deleted successfully",
        error: "Filed to delete lecture",
      });
      return (await res).data;
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  }
);

const lectureSlice = createSlice({
  name: "lecture",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCourseLecture.fulfilled, (state, action) => {
        state.lectures = action.payload?.lectures;
      })
      .addCase(addCourseLecture.fulfilled, (state, action) => {
        state.lectures = action.payload?.course?.lectures;
      });
  },
});

export default lectureSlice.reducer;
