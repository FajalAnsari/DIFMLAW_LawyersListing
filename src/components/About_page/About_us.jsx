import React from 'react'
// import { our_mission, user_friendly,user_needs, our_promises } from '../images';
import { our_Mission, our_Promises, User_friendly_platform, Commited_to_your_work } from '../images';
import Contect_Sugg from './Contect_sugg';
import Testimonial from '../Testimonial/Testimonial';
import { useAuthState } from "react-firebase-hooks/auth";
import Join_Network from "../join_network/Join_Network";
import { auth } from '../../firebase';
import "./About_us.css";
import style from "./About_module.css";
const About_us = () => {
    const [user] = useAuthState(auth);
  return (
  
   <>
   {/* about page layout*/}
  
    
    <div className="aboutsections" style={{backgroundColor:"var(--third-primary)",marginTop:"80px"}}>
    <div className='container'>
        <h2 className='text-center fw-bold mt-4 font-color' style={{paddingTop:"5%"}}>About Us</h2>
        <p className='fs-5 text-center w-50 mx-auto lh-sm text-white' style={{textAlign: "justify",paddingTop:"1%"}}>Connecting lawyers and seekers from around the world in a seamless and efficient way is our mission at DIFM Law.</p>
         
         <div className='row mt-5 ab-1'>
            <div className='col-lg-6 col-12'>
            <h2 className='fw-bold mt-5 s font-color'>Our Mission</h2>
            <p className='lh-sm mt-4 w-75 mx-auto text-white' style={{textAlign: "justify", fontSize: '110%'}}>At DIFM Law, our mission is to connect lawyers and seekers from around the world in a seamless and efficient way. Our parent company, Do iT For Me LLC, has a long-standing reputation for providing innovative solutions for individuals and businesses alike.</p>
            </div>
            <div className='col-lg-6 col-12'>
             <img src={our_Mission} className='w-75 ms-5 h-100 our_mission_first' style={{opacity:"0.75"}} alt='our_mission' ></img>
            </div>
        </div>

        <div className='row'>
            <div className='col-lg-6 col-12'>
            <img src={User_friendly_platform} className='w-75  frend user_friendly' alt='user_friendly' style={{marginLeft:"12%",opacity:"0.75"}}></img>
            </div>
            <div className='col-lg-6 col-12'> 
             <h2 className='s fw-bold mt-4 font-color user_title'>User-Friendly Platform</h2>
             <p className='lh-sm mt-4 w-75 mx-auto text-white' style={{textAlign: "justify",fontSize: '110%'}}>Our platform was created to make the process of finding the right lawyer as simple as possible. We understand that the legal industry can be complex and overwhelming, and we wanted to make it easier for people to find the right legal representation.</p>
            </div>
        </div>

        <div className='row ab-1'>
            <div className='col-lg-6 col-12'>
            <h2 className='s fw-bold mt-5 font-color commited_needs'>Committed to Your Needs</h2>
            <p className='lh-sm mt-4 w-75 mx-auto text-white' style={{textAlign: "justify", fontSize: '110%'}}>We believe that connecting seekers with the right lawyer can make all the difference, and we're passionate about making that happen. At DIFM Law, we're committed to providing you with the best possible experience, and we're always here to help you with any questions or concerns you may have. Our team of dedicated professionals is available to assist you with any inquiries you may have.</p>
            </div>
            <div className='col-lg-6 col-12 '>
             <img src={Commited_to_your_work} className='w-75 user_needs' alt='user_needs'></img>
            </div>
        </div>

        <div className='row'>
            <div className='col-lg-6 col-12 mt-4 about-img'>
            <img src={our_Promises} className=' h-100 w-75 frend'  alt='our_promises'></img>
            </div>
            <div className='col-lg-6 col-12 our_promise_block'> 
             <h2 className='s fw-bold mt-4 font-color'>Our Promise</h2>
             <p className='lh-sm mt-4 w-75 mx-auto text-white our_promise_para' style={{textAlign: "justify", fontSize: '110%'}}>We promise to provide a seamless experience for both lawyers and seekers, allowing them to find each other with ease. Our platform is dedicated to providing innovative solutions and making the process of finding the right lawyer as simple as possible.</p>
            </div>
        </div>
        </div>
        </div>
        {/* <div className='container'> */}
        {user ? (
            <>
        <div className='container user_contact_sugg'>
         <Contect_Sugg />
         </div>
         <Testimonial />
        
         </>
       ) : ( 
        <>
        <div className='dmis contact_aboutas'>
        <Join_Network />
        </div>
        <div style={{marginTop:"180px"}} className='user_reviews_opinion'>
        <Testimonial />
        </div>
        </>
       )}
       
      
  {/* </div> */}
  
   </>
  )
}

export default About_us