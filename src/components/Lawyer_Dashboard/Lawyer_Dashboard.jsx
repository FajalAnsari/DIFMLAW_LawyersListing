import "./Lawyer_Dashboard.css";
import React, { useEffect, useState } from 'react';
import logo from "../images/Vector.svg";
import {  FaUserEdit  }from "react-icons/fa";  
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { NavLink, Outlet } from 'react-router-dom';
import { db } from '../../firebase';
import { collection, getDocs, query, where } from "firebase/firestore";

const Lawyer_Dashboard = ({ children }) => {
  const [user] = useAuthState(auth);
  const [userRole, setUserRole] = useState(null);
  const [isOpen, setIsOpen] = useState(true);

  // Function to check the user's role (lawyer or user)
  const checkUserRole = async () => {
    if (user) {
      const q = query(collection(db, "lawyers"), where("uid", "==", user.uid));
      const q1 = query(collection(db, "users"), where("uid", "==", user.uid));
      const q2 = query(collection(db, "admin"), where("uid", "==", user.uid));

      const docs = await getDocs(q);
      const info = await getDocs(q1);
      const admin = await getDocs(q2);

      // Check if the user is a lawyer
      if (!docs.empty) {
        setUserRole("Lawyer");
      }
      // Check if the user is a regular user
      else if (!info.empty) {
        setUserRole("User");
      }
      else if (!admin.empty) {
        setUserRole("Admin");
      }
    }
  }

  useEffect(() => {
    checkUserRole();
   
  }, []);

  const toggle = () => setIsOpen(!isOpen);

  const menuItem = [
    {
      path: "/lawyer_dashboard/message/:id",
      name: "Messages",
      icon: <i className="bi bi-chat-left-text"></i>,
      roles: ["Lawyer"] // Only display for lawyer
    },
    {
      path: "/lawyer_dashboard/user_messages/",
      name: "Messages",
      icon: <i className="bi bi-chat-left-text"></i>,
      roles: ["User"]  // Only display for user
    },
    {
      path: "/lawyer_dashboard/alllawyers",
      name: "All Lawyers",
      icon: <i class="bi bi-people-fill"></i>,
      roles: ["Admin"] // Display for both lawyer and user
    },
    {
      path: "/lawyer_dashboard/allusers",
      name: "All Users",
      icon: <i class="bi bi-people"></i>,
      roles: ["Admin"] // Display for both lawyer and user
    },
    {
      path: "/lawyer_dashboard/Add_Users",
      name: "Add Users",
      icon: <i class="bi bi-person-add"></i>,
      roles: ["Admin"] // Display for both lawyer and user
    },
    {
      path: "/lawyer_dashboard/subscribers",
      name: "Subscribers",
      icon: <i class="bi bi-bell-fill"></i>,
      roles: ["Admin"] // Only display for lawyer
    },
    {
      path: "/lawyer_dashboard/Edit_Profile_admin",
      name: "Edit Profile",
      icon: <FaUserEdit />,
      roles: ["Admin"] // Only display for lawyer
    },
    
    {
      path: "/lawyer_dashboard/profile/id/",
      name: "Edit Profile",
      icon: <FaUserEdit />,
      roles: ["Lawyer"] // Only display for lawyer
    },
    {
      path: "/lawyer_dashboard/user_profile/id",
      name: "Edit Profile",
      icon: <FaUserEdit />,
      roles: ["User"] // Only display for user
    },
    {
      path: "/lawyer_dashboard/bookmark",
      name: "Saved Lawyers",
      icon: <i className="bi bi-bookmark-star-fill"></i>,
      roles: ["User"] // Only display for user
    }
  ];

  return (
    <>
      <div className='lawyer_dashboard' style={{ marginTop: '80px', backgroundColor: 'var(--third-primary)' }}>
        <div className="">
          <div style={{ width: isOpen ? "280px" : "50px" }} className="sidebar">
            <div className="top_section">
              <h1 style={{ display: isOpen ? "block" : "none" }} className="logo text-white">
                <div className="d-flex">
                  <img src={logo} alt="logo" style={{ width: "50%", marginRight: "10px" }} />
                  {userRole} Dashboard
                </div>
              </h1>
              <div style={{ marginLeft: isOpen ? "145px" : " 16px", transition: 'all 0.5s' }} className="bars fs-5">
                <span className="icon-toggle">{isOpen ? <i className="bi bi-chevron-left ms-1" onClick={toggle}></i> : <i className="bi bi-chevron-right ms-1" onClick={toggle}></i>}</span>
              </div>
            </div>
            {menuItem.map((item, index) => {
              if (item.roles.includes(userRole)) { // Check if the user's role matches the item's roles
                return (
                  <NavLink to={item.path} key={index} className="link text-decoration-none mb-3">
                    <div className="icon">{item.icon}</div>
                    <div style={{ display: isOpen ? "block" : "none" }} className="link_text fs-6 mt-1">{item.name}</div>
                  </NavLink>
                );
              }
              return null; // If the user's role doesn't match, return null (don't render the menu item)
            })}
          </div>
          <main>{children}</main>
        </div>
        <Outlet />
      </div>
    </>
  )
}

export default Lawyer_Dashboard;
