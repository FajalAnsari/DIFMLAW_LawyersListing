
import "./Lawyer_Dashboard.css";
import React, { useState } from 'react';
import {
  
    FaBars,

    FaUserEdit,
   
}from "react-icons/fa";

import { Link } from "react-router-dom";
const Lawyer_Dashboard = () => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        {
            path:"",
            name:"Messages",
            icon:<i class="bi bi-chat-left-text"></i>
        },
        {
            path:"/about",
            name:"Edit Profile",
            icon:<FaUserEdit/>
        },
      
    ]
  return (
    
    <>
       <div className='lawyer_dashboard' style={{marginTop:'100px', backgroundColor:'var(--third-primary)'}}>
       <div className="">
           <div style={{width: isOpen ? "200px" : "50px"}} className="sidebar">
               <div className="top_section">
                   <h1 style={{display: isOpen ? "block" : "none"}} className="logo">Logo</h1>
                   <div style={{marginLeft: isOpen ? "122px" : "12px"}} className="bars fs-1">
                       <i class="bi bi-caret-left-fill" onClick={toggle}></i>
                   </div>
               </div>
               {
                   menuItem.map((item, index)=>(
                       <Link to={item.path} key={index} className="link" activeclassName="active" style={{textDecoration:'none'}}>
                           <div className="icon">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text fs-6 mt-1">{item.name}</div>
                       </Link>
                   ))
               }
           </div>
           {/* <main>{children}</main> */}
        </div>

       </div>
    
    </>

  )
}

export default Lawyer_Dashboard

