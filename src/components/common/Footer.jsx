import React, { useState } from 'react'
import logo from "../images/Difm_law_logo.svg";
import Devider from '../Testimonial/Devider';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {

  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setError(false); // Reset error state when user starts typing
  };

  const handleSubscribe = () => {
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
    }
   }
   
  };

  return (
    <>
    <Devider />
      <div class="blockcode f-1">

  <footer class="page-footer shadow text-white">
    <div class="d-flex flex-column mx-auto footer-1 ">
      <div class="d-flex flex-wrap justify-content-between">
        <div>
        
        
          <img src={logo} width="240" alt="DIFM LAW LOGO" />
         
          <p class="my-3 content text-white">
          We are a leading lawyer listing portal, dedicated to simplifying the process of connecting lawyers and clients.
          </p>
          <span class="mt-4 ">
            <button class="btn btn-white btn-flat pk-1 me-2 px-2 ficon">
            <i class="bi bi-facebook"></i>
            </button>
            <button class="btn btn-white btn-flat pk-1 me-2 px-2 ficon">
            <i class="bi bi-linkedin"></i>
            </button>
            <button class="btn btn-white btn-flat pk-1 me-2 px-2 ficon">
            <i class="bi bi-twitter"></i>
            </button>
            <button class="btn btn-white btn-flat pk-1 px-2 ficon">
            <i class="bi bi-envelope-fill"></i>
            </button>
          </span>
        </div>
        <div>
          <p class="h5 mb-4 Devwares mt-4">Quick Links</p>
          <ul class="p-0 lis ">
            <li class="my-2 ">
              <Link class="text-dark text-decoration-none text-white" to="/contect_us">Contact</Link>
            </li>
            <li class="my-2">
              <Link class="text-dark text-decoration-none text-white" to="/about">About</Link>
            </li>
            <li class="my-2">
              <Link class="text-dark text-decoration-none text-white" to="/alllawyer">Lawyers</Link>
            </li>
            <li class="my-2">
              <Link class="text-dark text-decoration-none text-white" to="/privacy_policy">Privacy Policy</Link>
            </li>
            <li class="my-2">
              <Link class="text-dark text-decoration-none text-white" to="/terms_condition">Terms and Conditions</Link>
            </li>
          </ul>
        </div>
        <div>
          <p class="h5 mb-4 mt-4" style={{fontWeight: '600'}}>DIFM Group</p>
          <ul class="p-0 lis">
            <li class="my-2">
              <Link class="text-dark text-decoration-none text-white" to="https://difm.llc/">Difm.llc</Link>
            </li>
            <li class="my-2">
              <Link class="text-dark text-decoration-none text-white" to="https://www.worldmodelhunt.com/">Worldmodelhunt.com</Link>
            </li>
            <li class="my-2">
              <Link class="text-dark text-decoration-none text-white" to="https://bragsocial.com/">BragSocial.com</Link>
            </li>
            <li class="my-2">
              <Link class="text-dark text-decoration-none text-white" to="https://www.worldmodelhunt.com/">Worldmodelhunt.com</Link>
            </li>
            <li class="my-2">
              <Link class="text-dark text-decoration-none text-white" to="https://bragsocial.com/">BragSocial.com</Link>
            </li>
          </ul>
        </div>
        <div>
         <div class="input-group mt-4">
         <p className="text-black">
        {subscribed
          ? "Thank you for subscribing!"
          : ""}
      </p>
         {!subscribed && (
          <>
           <div class="form-outline">
             <input type="search" placeholder='Enter your email' class="form-control ss-2" value={email}
              onChange={handleEmailChange}/> 
           </div>
           <button type="button" class="btn btns-primary s-1" onClick={handleSubscribe}>
             Subscribe 
           </button>
           </>
        )}
         </div>
        </div>
      </div>
      <small class="text-center mt-5">&copy; DIFM.LLC, <span className='font-color'>2023</span>. All rights reserved.</small>
    </div>
  </footer>
</div>
    </>
 
  )
}

export default Footer
