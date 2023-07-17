import React, {useEffect, useState} from 'react';
import "./Footer.css";
import { Link, useNavigate } from 'react-router-dom';
import { signOut} from 'firebase/auth';
import logo from "../images/Difm_law_logo.png";
import logo2 from "../images/Logo Transparent png.png";
import { query, collection, getDocs, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { db } from '../../firebase';

import { auth } from '../../firebase';


const Navbar = () => {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const [activeUser, setactiveUser] = useState(false);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const fetchUserName = async () => {
    if (user) {
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
          console.log(data);
          setName(data.username);
          // setName(data.name);
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
          setName(data.name);
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


  return (
    <>
      <nav class="navbar navbar-expand-lg fixed-top" id="headrs">
  <div class="container p-2">

  <Link to='/'>
    <img src={logo} width="240" alt="" />
    {/* <img src={logo2} width="240" alt="" /> */}
    </Link>

    {/* <img src={logo} className='me-4 logo mb-2' alt="" height='100px' width='800px'/> */}
    {/* <Link class="navbar-brand text-white fs-4 head" to={"/"}>DIFM LAW</Link> */}
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0 mt-1">
        <li class="nav-item ms-2">
          <Link class="nav-link text-white fs-5" to={"/about"}>About Us</Link>
        </li>
        <li class="nav-item ms-3">
          <Link class="nav-link text-white fs-5" to={"/alllawyer"}>All Lawyers</Link>
        </li>
        <li class="nav-item ms-3">
          <Link class="nav-link text-white fs-5" to={"/contect_us"}>Contact Us</Link>
        </li>
        <li class="nav-item ms-3">
          <Link class="nav-link text-white fs-5" to={"/lawyer_dashboard"}>Lawyer Dashboard</Link>
        </li>
      </ul>
      {user ? (
 <div className="btn-group">
 <Link className="bg-white dropdown-toggle new3 p-1  border border-3 border-prime text-decoration-none npjh" data-bs-toggle="dropdown" aria-expanded="false">
 {!activeUser ? ( <img src={image} id='profiles' className="per1  border border-3 border-prime" alt="avatar" />  ) :<img src='https://www.dlf.pt/dfpng/middlepng/569-5693658_dummy-user-image-png-transparent-png.png' id='profiles' className="per1  border border-3 border-prime" alt="avatar" />} 
        <b><span>{name} </span></b>
  </Link>
     
  <ul className="dropdown-menu">
     <li><Link className="dropdown-item" to="/profile"><i className="fa-solid fa-user-pen"></i><span >Profile</span></Link></li>
     <li><Link className="dropdown-item" to="/dashboard"><i className="fa-sharp fa-solid fa-pen"></i><span>  Dashboard</span></Link></li>
     <li><Link className="dropdown-item" to="/profile"><i className="fa-solid fa-user-pen"></i><span>  Change Password</span></Link></li>
     <li><hr className="dropdown-divider"/></li>
    <li><Link to={"/"} className="dropdown-item mt-2 " onClick={() => handleLogout()}><i className="fa-solid fa-right-from-bracket"></i><span>  Sign Out</span></Link></li>
  </ul>
</div>
) : (
      <div class="d-flex">
       <Link to={"/login"}><button class="btn btns-primary me-2 w-100" type="submit">Login</button></Link> 
       <Link to={"/signup"}><button class="btn btns-primary ms-2" type="submit">Sign Up</button></Link>
      </div>
         )}
    </div>
  </div>
</nav>
    </>
  );
}
export default Navbar
