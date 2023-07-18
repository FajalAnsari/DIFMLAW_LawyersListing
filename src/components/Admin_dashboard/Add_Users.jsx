import React, {useEffect, useState} from 'react'
import "../Lawyer_Dashboard/Lawyer_Dashboard_Pages/Dashboard.css";
import { query, collection, getDocs, where, doc, updateDoc, addDoc  } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, storage, db } from "../../firebase";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { dummy } from '../../images';

const  Add_Users = () => {
    const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
 
  const [url , setUrl] = useState("");
  const [User, setUserAdd] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [fileError, setFileError] = useState("");
  const [picture, setPicture] = useState([]);
  const [title, settitle] =useState("");
  // const [User, setUser] = useState("");

  useEffect(() => {
    if (loading) return;
    // fetchUserName();
    if(!user) navigate("/login");
  }, [user, loading]);
 
// add user
const handleUserChange = (e) => {
  setUserAdd(e.target.value);
  if (e.target.value === "admin") {
 
    settitle("Admin Register");

  } else if (e.target.value === "lawyer") {
    settitle("Lawyer Register");
   
  } else if (e.target.value === "user") {
    settitle("User Register");
  }
};
const handleSubmit = async (e) => {
  e.preventDefault()


  if (
    !username ||
    !email ||
    
    !password ||
    !confirmPassword
  ) {
    setError("Please fill all the value!");
  } else {
    if (password === confirmPassword) {
      if (!picture.name.match(/\.(jpg|jpeg|png)$/)) {
        setFileError('Only Jpg/jpef, png formats are allowed !');
        return false;
      }

      const fileSizeKiloBytes = picture.size / 1024;
      console.log(fileSizeKiloBytes);
      if (fileSizeKiloBytes > 500) {
        setFileError("File size is less than 1 mb");
        // setIsSuccess(false)
        return false;
      }
      else {


        createUserWithEmailAndPassword(auth, email, password).then(
          async (res) => {
            const user = res.user;
            console.log(user);
            const storageRef = ref(storage, `/images/${picture.name}`);
            const uploadTask = uploadBytesResumable(storageRef, picture);
            uploadTask.on(
              "state_changed",
              (snapshot) => {
                const percent = Math.round(
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );

                // update progress
                console.log(percent);
              },
              (err) => console.log(err),
              () => {
                // download url
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {

                  console.log(url);
                  if (User === "admin") {
                    // Add user to the "admin" collection
                     addDoc(collection(db, "admin"), {
                      uid: user.uid,
                      username,
                      authProvider: "local",
                      email,
                      image: url
                    });
                  } else if (User === "lawyer") {
                    // Add user to the "lawyers" collection
                    addDoc(collection(db, "lawyers"), {
                      uid: user.uid,
                      username,
                      authProvider: "local",
                      email,
                      image: url
                    });
                  } else if (User === "user") {
                    // Add user to the "users" collection
                    addDoc(collection(db, "users"), {
                      uid: user.uid,
                      username,
                      authProvider: "local",
                      email,
                      image: url          
                    });
                  }
                  addDoc(collection(db, "lawyers"), {
                    uid: user.uid,
                    username,
                    authProvider: "local",
                    email: email,
                    image: url
                  })
                    .then(() => {
                      navigate("/");
                    }).catch((err) => { alert(err); })
                });
              });
          }).catch((err) => {
            alert(err);
          })
      }
    } else {
      setError("Your password and confirm password is doesn't match!");
    }
  }
}


  return (
    <>
<div className="lawyer_profile" id='message'>
       <div className="row">
          <div className="col-md-4">
             <div className='user_pro'>
                 <div className="d-flex px-4 border border-prime border-4 rounded-full  um">
                   <img src={url} alt="dummy" className='umn'/>
                  <label for='changepic' style={{marginTop:'67px'}}><span className='text-white change' style={{fontSize:'12px', position:"relative"}}>Change</span></label>
                  <input type='file' name='file' id='changepic' className='d-none'  onChange={(e) => setPicture(e.target.files[0])} />
                 </div>
                 <span className="text-danger">{fileError}</span>
                 
              </div>
          </div>
          <div className="col-md-8">
              <div className='msg_1'>
                
              <div className="px-5 py-3">
              <h2 className='text-white text-center'>{title}</h2>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        {/* <!-- Form Row--> */}
                        <div className="row gx-3 mb-1">
                            <div className="col-md-6 mbs1">
                                <label className="small mb-1 text-white " for="inputFirstName">Full Name</label>
                                <div class="input-group mb-3 mbs">
                                 <input className="form-control contect-bgColors" id="inputFirstName" type="text" placeholder={username} value={username} onChange={(e) => {setUsername(e.target.value)}}/>
                                 <span class="input-group-text btns-primary border-prime bolder dm"><i class="bi bi-person"></i></span>
                               </div>
                            </div>
                            <div className="col-md-6 mbs1">
                                <label className="small mb-1 text-white" for="inputEmail">Email</label>
                                <div class="input-group mb-3 mbs">
                                <input className="form-control contect-bgColors dm" id="inputEmail" type="email"  placeholder={email} value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                                 <span class="input-group-text btns-primary border-prime dm" ><i class="bi bi-envelope-open"></i></span>
                               </div>
                            </div>
                        </div>
                       
                        <div className="row gx-3 mb-1">
                            <div className="col-md-6 mbs1">
                                <label className="small mb-1 text-white" for="inputSpecialization">Password</label>
                                <div class="input-group mb-3 mbs">
                                <input className="form-control contect-bgColors" id="inputSpecialization" type="password" placeholder="Enter new password"  onChange={(e) => setPassword(e.target.value)}/>
                                <span class="input-group-text btns-primary border-prime dm" ><i class="bi bi-lock-fill"></i></span>
                              </div>
                            
                            </div>
                           
                            <div className="col-md-6 mbs1">
                                <label className="small mb-1 text-white" for="inputEducation">Confirm Password</label>   
                                <div class="input-group mb-3 mbs">
                                <input className="form-control contect-bgColors" id="inputEducation" type="password" name="password" placeholder="Enter confirm password"  onChange={(e) => setConfirmPassword(e.target.value)}/>
                                  <span class="input-group-text btns-primary border-prime dm" ><i class="bi bi-lock-fill"></i></span>
                                </div>
                            </div>
                        </div>
                        <div className="row gx-3 mb-1 mt-2">
                        <div class="col-md-6 mbs1">
                        <label className="small mb-1 text-white" for="inputState">User Role</label>   
                    <select
                      id="inputState"
                      value={User}
                      onChange={handleUserChange}
                      class="form-select inputs selct"
                      style={{backgroundColor:'red'}}
                    >
                      <option selected>Select user role</option>
                      <option value="admin">Admin</option>
                      <option value="lawyer">Lawyer</option>
                      <option value="user">User</option>
                     
                    </select>
                  </div>
                  </div>
                  <p className="text-danger fs-5">{error}</p>
                      
                        <div className="row gutters">
			                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-4">
				                      <div className="text-end">
					                      <Link to="/"><button type="button" id="submits" name="submit" className="btn btn-secondary">Cancel</button></Link>
					                      <button type="submit" id="submit" name="submit" className="btn btns-primary ms-2">Add</button>
				                     </div>
			                     </div>
		                     </div>
      
                    </form>
                </div>
            </div>
        </div>
              </div>
          </div>
       </div>

    </>
  )
}

export default  Add_Users
