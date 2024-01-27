import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../utils/axiosInstance";
const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") || false,
  role: localStorage.getItem("role") || "",
  data: localStorage.getItem("data") || "",
};

export const createAccount = createAsyncThunk(
  "/auth/register",
  async (data) => {
    try {
      const res = axiosInstance.post("user/register", data);
      toast.promise(res, {
        loading: "wait creating your account",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed to create Account",
      });
      return (await res).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);
export const login = createAsyncThunk("/auth/login", async (data) => {
  try {
    const res = axiosInstance.post("user/login", data);
    toast.promise(res, {
      loading: "wait Logging in ",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to login",
    });
    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});
export const logout = createAsyncThunk("/auth/logout", async (data) => {
  try {
    const res = axiosInstance.get("user/logout");
    toast.promise(res, {
      loading: "wait logout in progress !",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to logut",
    });
    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        if (action.payload) {
          localStorage.setItem("data", JSON.stringify(action.payload.user));
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("role", action.payload.user.role);
          state.isLoggedIn = true;
          state.data = action.payload.user;
          state.role = action.payload.user.role;
        }
      })
      .addCase(createAccount.fulfilled, (state, action) => {
        localStorage.setItem("data", JSON.stringify(action.payload?.user));
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("role", action.payload?.user.role);
        state.isLoggedIn = true;
        state.data = action.payload?.user;
        state.role = action.payload?.user.role;
      })
      .addCase(logout.fulfilled, (state) => {
        localStorage.clear();
        state.role = "";
        state.data = {};
        state.isLoggedIn = false;
      });
  },
});

export const {} = authSlice.actions;

export default authSlice.reducer;
