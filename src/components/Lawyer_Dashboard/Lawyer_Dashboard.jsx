import "./Lawyer_Dashboard.css";
import React, { useState } from 'react';
import {
  
    FaBars,

    FaUserEdit,
   
}from "react-icons/fa";
import { NavLink } from 'react-router-dom';
const Lawyer_Dashboard = ({children}) => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        {
            path:"/lawyer_message",
            name:"Messages",
            icon:<i class="bi bi-chat-left-text"></i>
        },
        {
            path:"/lawyer_profile",
            name:"Edit Profile",
            icon:<FaUserEdit/>
        },
      
    ]
  return (
    
    <>
       <div className='lawyer_dashboard' style={{marginTop:'100px', backgroundColor:'var(--third-primary)'}}>
       <div className="">
           <div style={{width: isOpen ? "280px" : "50px"}} className="sidebar">
               <div className="top_section">
                   <h1 style={{display: isOpen ? "block" : "none"}} className="logo">Logo</h1>
                   <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                       <FaBars onClick={toggle}/>
                   </div>
               </div>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link text-decoration-none mb-3" activeclassName="active">
                           <div className="icon">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                       </NavLink>
                   ))
               }
           </div>
           <main>{children}</main>
        </div>

       </div>
    
    </>

  )
}

export default Lawyer_Dashboard

