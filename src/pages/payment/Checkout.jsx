import React, { useEffect } from "react";
import HomeLayout from "../../layout/HomeLayout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BiRupee } from "react-icons/bi";
import {
  getRazorpayId,
  purchaseCourseBundle,
  verifyUserPayment,
} from "../../redux/slices/RazorPaySlice";
import toast from "react-hot-toast";
import { updataData } from "../../redux/slices/AuthSlice";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const razorpayKey = useSelector((state) => state.razorpay?.key);
  const subscription_id = useSelector(
    (state) => state.razorpay?.subscription_id
  );
  const isPaymentVarified = useSelector(
    (state) => state.razorpay?.isPaymentVarified
  );
  const userData = useSelector((state) => state?.auth?.data);
  const paymentDetails = {
    razorpay_payment_id: "",
    razorpay_subscription_id: "",
    razorpay_signature: "",
  };

  async function handleSubscription(e) {
    try {
      e.preventDefault();
      if (!razorpayKey || !subscription_id) {
        return toast.error("Something went wrong Please try again");
      }
      const option = {
        key: razorpayKey,
        subscription_id: subscription_id,
        name: "StudyWave Pvt. Ltd.",
        description: "Subscription amount",
        theme: "#F5F5F5",
        prefill: { email: userData.email, name: userData.fullName },
        handler: async (res) => {
          (paymentDetails.razorpay_payment_id = res.razorpay_payment_id),
            (paymentDetails.razorpay_signature = res.razorpay_signature),
            (paymentDetails.razorpay_subscription_id =
              res.razorpay_subscription_id);

          toast.success("Payment successfull");
          const response = await dispatch(verifyUserPayment(paymentDetails));
          response?.payload?.success
            ? navigate("/checkout/success")
            : navigate("/checkout/failed");
          dispatch(updataData(response?.payload?.user));
        },
      };

      const paymentObj = new window.Razorpay(option);
      paymentObj.open();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong Please try again");
    }
  }

  async function load() {
    await dispatch(getRazorpayId());
    await dispatch(purchaseCourseBundle());
  }
  useEffect(() => {
    load();
  }, []);
  return (
    <HomeLayout>
      <form
        onSubmit={handleSubscription}
        className="flex min-h-screen items-center  justify-center text-white w-full"
      >
        <div className="w-[21rem] h-[26rem] relative  flex flex-col justify-center shadow-[0_0_10px_black] ">
          <h1 className="bg-yellow-500 w-full absolute text-center top-0 py-4 text-2xl font-bold rounded-tl-lg rounded-tr-lg">
            Subscription Bundle
          </h1>
          <div className="px-4 space-y-5 text-center">
            <p className="text-[17px]   ">
              This purchase will allow you to access all available course of our
              platform{" "}
              <span className="text-yellow-500 font-bold px-2">
                <br />1 year duration
              </span>
              All the existing and new launched courses will be also available
            </p>
            <p className="flex items-center justify-center gap-1 text-2xl font-bold text-yellow-500">
              <BiRupee /> <span>499 only</span>
            </p>
            <div className="text-gray-200">
              <p>100% refund on cancellation</p>
              <p>* Terms and conditions appiled *</p>
            </div>
            <button className="bg-yellow-600 mt-2 hover:bg-yellow-500 w-full px-5 transition-all ease-in-out  py-2 rounded-br-lg text-lg  absolute bottom-0 rounded-bl-lg font-bold  left-0">
              Buy Now
            </button>
          </div>
        </div>
      </form>
    </HomeLayout>
  );
};

export default Checkout;
