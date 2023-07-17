import "./Lawyer_Dashboard.css";
import React, { useState } from 'react';
import logo from "../images/Vector.svg";
import {  FaUserEdit  }from "react-icons/fa";  
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { NavLink , Outlet } from 'react-router-dom';
import { db } from '../../firebase';
import { collection, getDocs, query, where } from "firebase/firestore";
const Lawyer_Dashboard = ({children}) => {
    const [user] = useAuthState(auth); 
    const [userRole, setUserRole] = useState(null);
      // check login as a user or lawyer
  const loginUserORLawyer = async () => {
    if(user){
      const q = query(collection(db, "lawyers"), where("uid", "==", user.uid));
      const q1 = query(collection(db, "users"), where("uid", "==", user.uid));
  
  
      const docs = await getDocs(q);
      const info = await getDocs(q1)
     
      // lawyer auth
      if (docs.empty) {
        console.log("No matching documents.");
      } else {
        docs.forEach((doc) => {
          const data = doc.data();
          console.log("lawyer login");
          setUserRole("lawyer");
         
        });
      }
      // user auth
      if (info.empty) {
        console.log("No matching documents.");
      } else {
        info.forEach((doc) => {
          const data = doc.data();
        
          console.log("user login");
          setUserRole("user");
       
        });
      }
  
    }
  }
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        {
            path:"/lawyer_dashboard/message/:id",
            name:"Messages",
            icon:<i class="bi bi-chat-left-text"></i>
        },
        {
            path:"/lawyer_dashboard/profile",
            name:"Edit Profile",
            icon:<FaUserEdit/>,
        },
        
        {
            path:"/lawyer_dashboard/bookmark",
            name:"Saved Lawyers",
            icon:<i class="bi bi-bookmark-star-fill"></i>,
        }
        
        
    ]
  return (
    
    <>
       <div className='lawyer_dashboard' style={{marginTop:'100px', backgroundColor:'var(--third-primary)'}}>
       <div className="">
           <div style={{width: isOpen ? "280px" : "50px"}} className="sidebar">
               <div className="top_section">
                   <h1 style={{display: isOpen ? "block" : "none"}} className="logo text-white"><div className="d-flex"><img src={logo} alt="logo" style={{width:"120%",marginRight:"10px"}}/>Lawyer Dashboard</div></h1>
                   <div style={{marginLeft: isOpen ? "208px" : " 16px", transition: 'all 0.5s'}} className="bars fs-5">
                       <span className="icon-toggle">{isOpen ? <i class="bi bi-chevron-left ms-1" onClick={toggle}></i>: <i class="bi bi-chevron-right ms-1" onClick={toggle}></i>}</span>
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

