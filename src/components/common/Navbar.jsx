import React, { useEffect, useState } from 'react';
import "./Footer.css";
import "./Navbar.css";
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import logo from "../images/Difm_law_logo.svg";
import { query, collection, getDocs, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { db } from '../../firebase';
import { auth } from '../../firebase';


const Navbar = () => {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const [activeUser, setactiveUser] = useState(false);
  const [activeAdmin, setActiveAdmin] = useState(false);
  const [id , setId] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [userimage, setUserImage] = useState("");
  const [open, setOpen] = useState(false);


  const fetchUserName = async () => {
    if (user) {
      const q = query(collection(db, "lawyers"), where("uid", "==", user.uid));
      const q1 = query(collection(db, "users"), where("uid", "==", user.uid));
      const q2 = query(collection(db, "admin"), where("uid", "==", user.uid));


      const docs = await getDocs(q);
      const info = await getDocs(q1)
      const admin = await getDocs(q2)
      // lawyer auth
      if (docs.empty) {
        console.log("No matching documents.");
      } else {
        docs.forEach((doc) => {
          const data = doc.data();
          const documentId = doc.id;
          setId(documentId);
          setName(data.username);
          console.log(user);
          setActiveAdmin(true);
          setImage(data.image);
        });
      }
      // user auth
      if (info.empty) {
        console.log("No matching documents.");
      } else {
        info.forEach((doc) => {
          const data = doc.data();
          console.log(data);
          setName(data.username);
          setUserImage(data.image);
          setactiveUser(true);
          // setImage(data.image);
        });
      }
      // admin auth
      if (admin.empty) {
        console.log("No matching documents.");
      } else {
        admin.forEach((doc) => {
          const data = doc.data();
          console.log(data);
          setName(data.name);
          setUserImage(data.image);
          setactiveUser(true);
          // setImage(data.image);
        });
      }
    }
  };
  // logout
  const handleLogout = () => {
    signOut(auth).then(() => {
      // Clear the user-related state values
      setName("");
      setImage("");
      // Sign-out successful.
      navigate("/");
      alert("Signed out successfully");
      // Reload the page to update the UI
      window.location.reload();
    }).catch((error) => {
      alert(error);
    });
  }
  useEffect(() => {
    if (loading)
      return;
    fetchUserName();
    console.log(name);
  }, [user, loading]);

  // Your two functions
const function1 = () => {
  setOpen(false);
};

const function2 = () => {
  window.scrollTo(0, 0);
};


  const handleLinkClick = () => {
    function1();
    function2();
  };


  return (
    <>
      <nav className="navbar navbar-expand-lg fixed-top" id="headrs">
        <div className="container p-2">

          <Link to='/'>
            <img src={logo} width="240" alt="DIFM LAW LOGO" />
          </Link>

          <button className="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" onClick={() => setOpen(!open)}>
            <span className="navbar-toggler-icon icone"><i className="bi bi-list"></i></span>
          </button>
          <div className={`collapse navbar-collapse ${open ? 'show toggler-btn' : ''}`} id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 mt-1">
            <li className="nav-item ms-3">
                <Link className="nav-link text-white fs-5" to={"/"} onClick={handleLinkClick}>Home</Link>
              </li>
              <li className="nav-item ms-3">
                <Link className="nav-link text-white fs-5" to={"/alllawyer"} onClick={handleLinkClick}>All Lawyers</Link>
              </li>
              <li className="nav-item ms-3">
                <Link className="nav-link text-white fs-5" to={"/about"} onClick={handleLinkClick}>About Us</Link>
              </li>
              <li className="nav-item ms-3">
                <Link className="nav-link text-white fs-5" to={"/contect_us"} onClick={handleLinkClick}>Contact Us</Link>
              </li>
            </ul>
            {user ? (
              <div className="btn-group">
                <Link className="bg-white dropdown-toggle new3 p-1  border border-3 border-prime text-decoration-none npjh" data-bs-toggle="dropdown" aria-expanded="false">
                  {!activeUser ? (<img src={image} id='profiles' className="per1  border border-3 border-prime" alt="avatar" />) : <img src={userimage} id='profiles' className="per1  border border-3 border-prime" alt="avatar" />}
                  <b><span>{name} </span></b>
                </Link>

                <ul className="dropdown-menu">
               {!activeAdmin ? '' :  (
<>
<li><Link className="dropdown-item" to={`/job/${id}`} onClick={handleLinkClick}><i className="fa-sharp fa-solid fa-pen"></i><span>Profile</span></Link></li>
     <li><hr className="dropdown-divider" /></li>  
</>
               )
               } 
                   
                  <li><Link className="dropdown-item" to="/lawyer_dashboard" onClick={handleLinkClick}><i className="fa-sharp fa-solid fa-pen"></i><span>  Dashboard</span></Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link to={"/"} className="dropdown-item mt-2 " onClick={() => handleLogout()}><i className="fa-solid fa-right-from-bracket"></i><span>  Sign Out</span></Link></li>
                </ul>
              </div>
            ) : (
              <div className="d-flex">
                <Link to={"/login"} onClick={handleLinkClick}><button className="btn btns-primary me-2 w-100" type="submit">Login</button></Link>
                <Link to={"/signup"} onClick={handleLinkClick}><button className="btn btns-primary ms-2" type="submit">Sign Up</button></Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
export default Navbar
