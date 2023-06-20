import React, {useEffect, useState} from 'react';
import "./Footer.css";
import { Link, useNavigate } from 'react-router-dom';
import { signOut} from 'firebase/auth';
import logo from "../images/Vector.svg";
import { query, collection, getDocs, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { db } from '../../firebase';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../../firebase';


const Navbar = () => {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const fetchUserName = async () => {
    // auth check
    onAuthStateChanged(auth, async (user) => {
      if (user) {
  
      console.log("user is login");
        const q = query(collection(db, "lawyers"), where("uid", "==", user.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.username);
      console.log(data)
      setImage(data.image);
      console.log(user);
      
        const uid = user.uid;
        // ...
        console.log("uid", uid)
      } else {
        // User is signed out
        // ...
        console.log("user is logged out")
      }
    });
  
    
  };
  // logout
  const handleLogout = () => {               
    signOut(auth).then(() => {
    // Sign-out successful.
        navigate("/");
        alert("Signed out successfully")
    }).catch((error) => {
       alert(error);
    });
} 
  useEffect(() => {
    if (loading) 
    return;
    fetchUserName();
  }, [user, loading]);

  if (user === null){
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light  bg-white shadow">
  <div class="container p-2">
    <img src={logo} className='me-4 logo mb-2' alt="" />
    <Link class="navbar-brand" to={"/"}>DIFM LAW</Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <Link class="nav-link active" aria-current="page"  to={"/"}>Home</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to={"/about"}>About Us</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to={"/contect_us"}>Contact us</Link>
        </li>
      </ul>
      <div class="d-flex">
       <Link to={"/login"}><button class="btn btn-outline-secondary me-2" >Login</button></Link> 
       <Link to={"/signup"}><button class="btn btn-primary" type="submit">Sign Up</button></Link>
      </div>
    </div>
  </div>
</nav>
    </>
  );
}


return (
  <>
      <nav class="navbar navbar-expand-lg navbar-light  bg-white shadow">
  <div class="container p-2">
    <img src={logo} className='me-4 logo mb-2' alt="" />
    <Link class="navbar-brand" to={"/"}>DIFM LAW</Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <Link class="nav-link active" aria-current="page"  to={"/"}>Home</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to={"#"}>About Us</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to={"#"}>Contact us</Link>
        </li>
      </ul>
      <div className="btn-group">
        <Link className="bg-white dropdown-toggle new3 p-1  border border-3 border-primary text-decoration-none npjh" data-bs-toggle="dropdown" aria-expanded="false">
           <img src={image} id='profiles' className="per1  border border-3 border-primary" alt="avatar" />
             <b>{name}</b>
       </Link>
       <ul className="dropdown-menu">
          <li><Link className="dropdown-item" to="/profile"><i className="fa-solid fa-user-pen"></i><span >Profile</span></Link></li>
          <li><Link className="dropdown-item" to="/dashboard"><i className="fa-sharp fa-solid fa-pen"></i><span>  Dashboard</span></Link></li>
          <li><Link className="dropdown-item" to="/profile"><i className="fa-solid fa-user-pen"></i><span>  Change Password</span></Link></li>
          <li><hr className="dropdown-divider"/></li>
         <li><Link to={"/"} className="dropdown-item mt-2 " onClick={() => handleLogout()}><i className="fa-solid fa-right-from-bracket"></i><span>  Sign Out</span></Link></li>
       </ul>
     </div>
    </div>
  </div>
</nav>
    </>
);
}
export default Navbar
