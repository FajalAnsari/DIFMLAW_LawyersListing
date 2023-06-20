import React, { useState } from 'react'
import logo from "../images/Vector.svg";
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
      // Perform subscription logic here, e.g., send API request to subscribe the email
      // You can customize this logic based on your requirements
      // For this example, let's simply set the subscribed state to true
      setSubscribed(true);
    }
   }
   
  };

  return (
    <div>
      <div class="blockcode f-1">

  <footer class="page-footer shadow">
    <div class="d-flex flex-column mx-auto py-5 footer-1">
      <div class="d-flex flex-wrap justify-content-between">
        <div>
          <a href="/" class="d-flex align-items-center p-0 text-dark  text-decoration-none">
          <img src={logo} className=' logo mb-2' alt="" />
            <span class="ms-3 h5 font-weight-bold ">DIFM LAW</span>
          </a>
          <p class="my-3 content">
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
          <ul class="p-0 lis">
            <li class="my-2">
              <a class="text-dark text-decoration-none" href="/">Contact</a>
            </li>
            <li class="my-2">
              <a class="text-dark text-decoration-none" href="/">About</a>
            </li>
            <li class="my-2">
              <a class="text-dark text-decoration-none" href="/alllawyer">Lawyers</a>
            </li>
            <li class="my-2">
              <a class="text-dark text-decoration-none" href="/privacy_policy">Privacy Policy</a>
            </li>
            <li class="my-2">
              <a class="text-dark text-decoration-none" href="/terms_condition">Terms and Conditions</a>
            </li>
          </ul>
        </div>
        <div>
          <p class="h5 mb-4 mt-4" style={{fontWeight: '600'}}>DIFM Group</p>
          <ul class="p-0 lis">
            <li class="my-2">
              <a class="text-dark text-decoration-none" href="https://difm.llc/">Difm.llc</a>
            </li>
            <li class="my-2">
              <a class="text-dark text-decoration-none" href="https://www.worldmodelhunt.com/">Worldmodelhunt.com</a>
            </li>
            <li class="my-2">
              <a class="text-dark text-decoration-none" href="https://bragsocial.com/">BragSocial.com</a>
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
           <button type="button" class="btn btn-primary s-1" onClick={handleSubscribe}>
             Subscribe 
           </button>
           </>
        )}
         </div>
        </div>
      </div>
      <small class="text-center mt-5">&copy; DIFM.LLC, 2023. All rights reserved.</small>
    </div>
  </footer>
</div>
    </div>
  )
}

export default Footer
