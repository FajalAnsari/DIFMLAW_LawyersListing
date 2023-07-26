import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FirebaseProvider } from "./firebase";
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Login from "./components/form/Login";
import Hero from "./components/Hero/Hero";
import Signup from './components/form/Signup';
import Lawyers_profile_card from "./components/job_description_page/Lawyers_profile_card/Lawyers_profile_card";
import All_Lawyers from "./components/All_Lawyers/All_Lawyers";
import Contect_us from "./components/Contect_us/Contect_us";
import Privacy_policy from "./components/Privacy_policy/Privacy_policy";
import Term_condition from "./components/Term_condition/Term_condition";
import All_Lawyerss from "./components/Admin_dashboard/All_Lawyers";
import All_Users from "./components/Admin_dashboard/All_Users";
import About_us from "./components/About_page/About_us";
import Default_page from "./components/Default_page/Default_page";
import Protected from "./components/Protected";
import ForgetPassword from "./components/form/ForgetPassword";
import Bookmark from "./components/Bookmark/Bookmark";
import Lawyer_Message from "./components/Lawyer_Dashboard/Lawyer_Dashboard_Pages/Lawyer_Message";
import Lawyer_Dashboard from "./components/Lawyer_Dashboard/Lawyer_Dashboard";
import Lawyer_Profiles from "./components/Lawyer_Dashboard/Lawyer_Dashboard_Pages/Lawyer_Profiles";
import User_Profile from "./components/User_Dashboard/User_Profile";
import Edit_Profile_admin from "./components/Admin_dashboard/Edit_Profile_admin";
import Add_Users from "./components/Admin_dashboard/Add_Users";
import User_messages from "./components/User_Dashboard/User_messages";
import Subscribed_Users from "./components/Admin_dashboard/Subscribed_Users";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <FirebaseProvider>
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/job/:lawId" element={<Protected Component={Lawyers_profile_card} />} />
            <Route path="/alllawyer/:cat" element={<All_Lawyers />} />
            <Route path="/alllawyer" element={<All_Lawyers />} />
            <Route path="/contect_us" element={<Contect_us />} />
            <Route path="/about" element={<About_us />} />
            <Route path="/privacy_policy" element={<Privacy_policy />} />
            <Route path="/terms_condition" element={<Term_condition />} />
            <Route path="/bookmark" element={<Bookmark />} />
            <Route path="/login/forget_password" element={<ForgetPassword />} />
            <Route path="/*" element={<Default_page />} />
            <Route path="/lawyer_dashboard" element={<Protected Component={Lawyer_Dashboard} />}>
              <Route path="message/:id" element={<Lawyer_Message />} />
              <Route path="profile/:id" element={<Lawyer_Profiles />} />
              <Route path="bookmark" element={<Bookmark />} />
              <Route path="user_profile/:id" element={<User_Profile />} />
              <Route path="alllawyers" element={<All_Lawyerss />} />
              <Route path="allusers" element={<All_Users />} />
              <Route path="Edit_Profile_admin" element={<Edit_Profile_admin />} />
              <Route path="Add_Users" element={<Add_Users />} />
              <Route path="user_messages" element={<User_messages />} />
              <Route path="subscribers" element={<Subscribed_Users />} />
            </Route>
          </Routes>
        </FirebaseProvider>
        <Footer />
      </Router>
    </>
  );
}

export default App;
