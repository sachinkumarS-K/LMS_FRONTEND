import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutUsPage from "./pages/AboutUsPage";
import NotFound from "./pages/NotFound";
import Signup from "./components/Signup";
import Login from "./components/Login";
import CourseList from "./pages/Course/CourseList";

import Denied from "./pages/Denied";
import CourseDescription from "./pages/Course/CourseDescription";
import RequireAuth from "./components/Auth/RequireAuth";
import CreateCourse from "./pages/Course/CreateCourse";
import Profile from "./pages/user/Profile";
import EditProfile from "./pages/user/EditProfile";
import Contact from "./components/Contact";
import Checkout from "./pages/payment/Checkout";
import PaymentFailed from "./pages/payment/PaymentFailed";
import PaymentSuccess from "./pages/payment/PaymentSuccess";
import Displaylectures from "./pages/Dashborad/Displaylectures";
import AddLecture from "./pages/Dashborad/AddLecture";
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutUsPage />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/courses" element={<CourseList />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/course/description" element={<CourseDescription />} />
      <Route path="/denied" element={<Denied />} />

      <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
        <Route path="/course/create" element={<CreateCourse />} />
        <Route path="/course/addLecture" element={<AddLecture />} />
      </Route>

      <Route element={<RequireAuth allowedRoles={["ADMIN", "USER"]} />}>
        <Route path="/user/editprofile" element={<EditProfile />} />
        <Route path="/user/profile" element={<Profile />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/checkout/success" element={<PaymentSuccess />} />
        <Route path="/checkout/failed" element={<PaymentFailed />} />
        <Route path="/course/displaylecture" element={<Displaylectures />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
