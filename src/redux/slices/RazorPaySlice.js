import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../utils/axiosInstance";
import { useDispatch } from "react-redux";
import { updataData } from "./AuthSlice";

const initialState = {
  key: "",
  subscription_id: "",
  isPaymentVarified: false,
  allPayments: "",
  finalMonth: "",
  monthlySalesRecord: "",
};

export const getRazorpayId = createAsyncThunk("/razorpay/getId", async () => {
  try {
    const res = await axiosInstance.get("/payments/razorpay-key");
    return res?.data;
  } catch (error) {
    toast.error("failed to load data");
  }
});
export const cancelCourseBundle = createAsyncThunk(
  "/payment/cancel",
  async () => {
    try {
      const res = await axiosInstance.post("/payments/unsubscribe");
      return res?.data;
    } catch (error) {
      toast.error("Failed to unsubscribe");
    }
  }
);
export const purchaseCourseBundle = createAsyncThunk(
  "/purchaseCourse",
  async () => {
    try {
      const res = await axiosInstance.post("/payments/subscribe");
      return res?.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);
export const verifyUserPayment = createAsyncThunk(
  "/payment/verify",
  async (data) => {
    try {
      const res = await axiosInstance.post("/payments/verify", {
        razorpay_payment_id: data.razorpay_payment_id,
        razorpay_subscription_id: data.razorpay_subscription_id,
        razorpay_signature: data.razorpay_signature,
      });
      return res?.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);
export const getPaymentRecord = createAsyncThunk(
  "/payment/record",
  async (data) => {
    try {
      const res = axiosInstance.get("/payment/?count=100");
      toast.promise(res, {
        loading: "getting the payment record",
        success: (data) => data?.data?.message,
        error: "failed to get payment records",
      });
      return (await res).data;
    } catch (error) {
      toast.error("Operation failed");
    }
  }
);

const razorpay = createSlice({
  name: "razorpay",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRazorpayId.fulfilled, (state, action) => {
        if (!action.payload) return;
        state.key = action?.payload?.key;
      })
      .addCase(purchaseCourseBundle.fulfilled, (state, action) => {
        if (!action.payload) return;
        state.subscription_id = action?.payload?.subscription_id;
      })
      .addCase(verifyUserPayment.fulfilled, (state, action) => {
        if (!action.payload) return;

        toast.success(action?.payload?.success);
        state.isPaymentVarified = action?.payload?.success;
      });
  },
});

export default razorpay.reducer;
