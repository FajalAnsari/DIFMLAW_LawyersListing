import React from 'react'
import { our_mission, user_friendly,user_needs, our_promises } from '../images';
import Contect_sugg from './Contect_sugg';
import "./About_us.css";
const About_us = () => {
  return (
  
   <>
   <div className='container'>
    
        <h2 className='text-center fw-bold mt-5'>About Us</h2>
        <p className='fs-5 text-center w-50 mx-auto lh-sm' style={{textAlign: "justify"}}>Connecting lawyers and seekers from around the world in a seamless and efficient way is our mission at DIFM Law.</p>
         
         <div className='row mt-5 ab-1'>
            <div className='col-lg-6 col-12'>
            <h2 className='fw-bold mt-5 s'>Our Mission</h2>
            <p className='fs-6 lh-sm mt-4 w-75 mx-auto' style={{textAlign: "justify"}}>At DIFM Law, our mission is to connect lawyers and seekers from around the world in a seamless and efficient way. Our parent company, Do iT For Me LLC, has a long-standing reputation for providing innovative solutions for individuals and businesses alike.</p>
            </div>
            <div className='col-lg-6 col-12'>
             <img src={our_mission} className='w-75 ms-5 h-100' ></img>
            </div>
        </div>

        <div className='row'>
            <div className='col-lg-6 col-12'>
            <img src={user_friendly} className='w-100 frend'></img>
            </div>
            <div className='col-lg-6 col-12'> 
             <h2 className='s fw-bold mt-4'>User-Friendly Platform</h2>
             <p className='fs-6 lh-sm mt-4 w-75 mx-auto' style={{textAlign: "justify"}}>Our platform was created to make the process of finding the right lawyer as simple as possible. We understand that the legal industry can be complex and overwhelming, and we wanted to make it easier for people to find the right legal representation.</p>
            </div>
        </div>

        <div className='row ab-1'>
            <div className='col-lg-6 col-12'>
            <h2 className='s fw-bold mt-5'>Committed to Your Needs</h2>
            <p className='fs-6 lh-sm mt-4 w-75 mx-auto' style={{textAlign: "justify"}}>We believe that connecting seekers with the right lawyer can make all the difference, and we're passionate about making that happen. At DIFM Law, we're committed to providing you with the best possible experience, and we're always here to help you with any questions or concerns you may have. Our team of dedicated professionals is available to assist you with any inquiries you may have.</p>
            </div>
            <div className='col-lg-6 col-12'>
             <img src={user_needs} className='w-100' style={{marginTop:"-50px"}}></img>
            </div>
        </div>

        <div className='row'>
            <div className='col-lg-6 col-12 mt-4'>
            <img src={our_promises} className='w-100 h-75 frend'></img>
            </div>
            <div className='col-lg-6 col-12'> 
             <h2 className='s fw-bold mt-4'>Our Promise</h2>
             <p className='fs-6 lh-sm mt-4 w-75 mx-auto' style={{textAlign: "justify"}}>We promise to provide a seamless experience for both lawyers and seekers, allowing them to find each other with ease. Our platform is dedicated to providing innovative solutions and making the process of finding the right lawyer as simple as possible.</p>
            </div>
        </div>
       
       <Contect_sugg />
  </div>
  
   </>
  )
}

export default About_us