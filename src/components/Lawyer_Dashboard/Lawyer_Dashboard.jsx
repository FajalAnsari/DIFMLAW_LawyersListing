import "./Lawyer_Dashboard.css";
import React, { useState } from 'react';
import logo from "../images/Vector.svg";
import {
  
    FaBars,

    FaUserEdit,
   
}from "react-icons/fa";
import { Link , NavLink, Outlet } from 'react-router-dom';
const Lawyer_Dashboard = ({children}) => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        {
            path:"/lawyer_dashboard/message",
            name:"Messages",
            icon:<i class="bi bi-chat-left-text"></i>
        },
        {
            path:"/lawyer_dashboard/profile",
            name:"Edit Profile",
            icon:<FaUserEdit/>,
        },
      
    ]
  return (
    
    <>
       <div className='lawyer_dashboard' style={{marginTop:'100px', backgroundColor:'var(--third-primary)'}}>
       <div className="">
           <div style={{width: isOpen ? "280px" : "50px"}} className="sidebar">
               <div className="top_section">
                   <h1 style={{display: isOpen ? "block" : "none"}} className="logo text-white"><div className="d-flex"><img src={logo} alt="logo" style={{width:"120%",marginRight:"10px"}}/>Lawyer Dashboard</div></h1>
                   <div style={{marginLeft: isOpen ? "208px" : " 16px"}} className="bars fs-5">
                       <span className="icon-toggle"><i class="bi bi-chevron-left ms-1" onClick={toggle}></i></span>
                   </div>
               </div>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link text-decoration-none mb-3" activeclassName="active">
                           <div className="icon">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text fs-6 mt-1">{item.name}</div>
                       </NavLink>
                   ))
               }
           </div>
           <main>{children}</main>
       
        </div>
        <Outlet />
       </div>
    
    </>

  )
}

export default Lawyer_Dashboard

