import React from 'react'
import "./Join_Network.css";
import { Link } from "react-router-dom";

const Join_Network = () => {

  const scrollToTop = () => {
     window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  return (
    
       
       <div className='row rounded-3 legal_network shadow me-2'>
        <div className='col-lg-6 text-center col-xs-6'>
        <p className='fw-bold fs-2 text-white'>Join Our Legal Network</p>
        <p className='font-weight-light fs-6 lagal_part font-color'>Become a part of our growing community of legal professionals or users.<span className='legalnet'>Register today to unlock a world of opportunities and connect with clients or find the right lawyer for your legal needs.</span> </p>
        </div>
        <div className='col-lg-6 text-center col-xs-6 mt-3'>
         <Link to="/signup"><button className='btn btns-primary  mt-4 h-50 w-50 reg_btn' onClick={scrollToTop}>Register as a Lawyer</button></Link> 
         <Link to="/signup"><button className='btn btns-primary  mt-4  w-50 h-50 reg_btn' onClick={scrollToTop}>Register as a User</button></Link>
          </div>
       </div>

  )
}

export default Join_Network
