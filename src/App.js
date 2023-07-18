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
import Admin_dashboard from "./components/Admin_dashboard/Admin_dashboard";
import About_us from "./components/About_page/About_us";
import Default_page from "./components/Default_page/Default_page";
import Protected from "./components/Protected";
import ForgetPassword from "./components/form/ForgetPassword";
import Bookmark from "./components/Bookmark/Bookmark";
import Lawyer_Message from "./components/Lawyer_Dashboard/Lawyer_Dashboard_Pages/Lawyer_Message";
import Lawyer_Dashboard from "./components/Lawyer_Dashboard/Lawyer_Dashboard";
import Lawyer_Profiles from "./components/Lawyer_Dashboard/Lawyer_Dashboard_Pages/Lawyer_Profiles";


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
            <Route path="/admin" element={<Admin_dashboard />} />
            <Route path="/about" element={<About_us />} />
            <Route path="/privacy_policy" element={<Privacy_policy />} />
            <Route path="/terms_condition" element={<Term_condition />} />
            <Route path="/bookmark" element={<Bookmark />} />
            <Route path="/login/forget_password" element={<ForgetPassword />} />
            <Route path="/*" element={<Default_page />} />
            <Route path="/lawyer_dashboard" element={<Lawyer_Dashboard />}>
              <Route path="message/:id" element={<Lawyer_Message />} />
              <Route path="profile" element={<Lawyer_Profiles />} />
              <Route path="bookmark" element={<Bookmark />} />
            </Route>
          </Routes>
        </FirebaseProvider>
        <Footer />
      </Router>
    </>
  );
}

export default App;
