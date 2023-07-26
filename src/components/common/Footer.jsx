import React, { useState } from 'react'
import logo from "../images/Difm_law_logo.svg";
import Devider from '../Testimonial/Devider';
import { Link } from 'react-router-dom';
import { addDoc, collection } from "firebase/firestore";
import { db } from '../../firebase';
import { serverTimestamp } from "firebase/firestore";

import './Footer.css';

const Footer = () => {

  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState(false);

  const baseUrl = "http://localhost:8000";

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setError(false); // Reset error state when user starts typing
  };

  const handleSubscribe = async() => {
    const emailRegex = /\S+@\S+\.\S+/; // Email regex pattern

    if(!email){
      setError(true); // Set error state if email is null
      alert("Please Enter Your Email!");
    }
   else{
    if (!emailRegex.test(email)) {
      setError(true); // Set error state if email is invalid
      alert("Please enter a valid email address.");
    } else {
      setSubscribed(true);
      addDoc(collection(db, "subscribed_users"),{
        email:email,
        date: serverTimestamp()
      }).then(()=>{
        alert('Thank you for subcribing');
      }).catch((err)=>{
        alert(err);
      })
    }
   }
   
   let dataSend = {
    email: email,
  };

  const res = await fetch(`${baseUrl}/emailss/sendEmailSubs`, {
    method: "POST",
    body: JSON.stringify(dataSend),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    // HANDLING ERRORS
    .then((res) => {
      console.log(res);
      if (res.status > 199 && res.status < 300) {
        alert("Send Successfully !");
      }
    });

  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  return (
    <>
    <Devider />
      <div className="blockcode f-1">

  <footer className="page-footer shadow text-white">
    <div className="d-flex flex-column mx-auto footer-1 ">
      <div className="d-flex flex-wrap justify-content-between">
        <div>
        
        
          <img src={logo} width="240" alt="DIFM LAW LOGO" />
         
          <p className="my-3 content text-white">
          We are a leading lawyer listing portal, dedicated to simplifying the process of connecting lawyers and clients.
          </p>
          <span className="mt-4 ">
            <button className="btn btn-white btn-flat pk-1 me-2 px-2 ficon">
            <i className="bi bi-facebook"></i>
            </button>
            <button className="btn btn-white btn-flat pk-1 me-2 px-2 ficon">
            <i className="bi bi-linkedin"></i>
            </button>
            <button className="btn btn-white btn-flat pk-1 me-2 px-2 ficon">
            <i className="bi bi-twitter"></i>
            </button>
            <button className="btn btn-white btn-flat pk-1 px-2 ficon">
            <i className="bi bi-envelope-fill"></i>
            </button>
          </span>
        </div>
        <div>
          <p className="h5 mb-4 Devwares mt-4">Quick Links</p>
          <ul className="p-0 lis ">
            <li className="my-2 ">
              <Link className="text-dark text-decoration-none text-white" to="/contect_us" onClick={scrollToTop}>Contact</Link>
            </li>
            <li className="my-2">
              <Link className="text-dark text-decoration-none text-white" to="/about" onClick={scrollToTop}>About</Link>
            </li>
            <li className="my-2">
              <Link className="text-dark text-decoration-none text-white" to="/alllawyer" onClick={scrollToTop}>Lawyers</Link>
            </li>
            <li className="my-2">
              <Link className="text-dark text-decoration-none text-white" to="/privacy_policy" onClick={scrollToTop}>Privacy Policy</Link>
            </li>
            <li className="my-2">
              <Link className="text-dark text-decoration-none text-white" to="/terms_condition" onClick={scrollToTop}>Terms and Conditions</Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="h5 mb-4 mt-4" style={{fontWeight: '600'}}>DIFM Group</p>
          <ul className="p-0 lis">
            <li className="my-2">
              <Link className="text-dark text-decoration-none text-white" to="https://difm.llc/">Difm.llc</Link>
            </li>
            <li className="my-2">
              <Link className="text-dark text-decoration-none text-white" to="https://www.worldmodelhunt.com/">Worldmodelhunt.com</Link>
            </li>
            <li className="my-2">
              <Link className="text-dark text-decoration-none text-white" to="https://bragsocial.com/">BragSocial.com</Link>
            </li>
            <li className="my-2">
              <Link className="text-dark text-decoration-none text-white" to="https://www.worldmodelhunt.com/">Worldmodelhunt.com</Link>
            </li>
            <li className="my-2">
              <Link className="text-dark text-decoration-none text-white" to="https://bragsocial.com/">BragSocial.com</Link>
            </li>
          </ul>
        </div>
        <div>
         <div className="input-group mt-4">
         <p className="text-black">
        {subscribed
          ? "Thank you for subscribing!"
          : ""}
      </p>
         {!subscribed && (
          <>
           <div className="form-outline">
             <input type="search" placeholder='Enter your email' className="form-control ss-2" value={email}
              onChange={handleEmailChange}/> 
           </div>
           <button type="button" className="btn btns-primary s-1" onClick={handleSubscribe}>
             Subscribe 
           </button>
           </>
        )}
         </div>
        </div>
      </div>
      <small className="text-center mt-5">&copy; DIFM.LLC, <span className='font-color'>2023</span>. All rights reserved.</small>
    </div>
  </footer>
</div>
    </>
 
  )
}

export default Footer
