import React, {useEffect, useState} from 'react'
import "../Lawyer_Dashboard/Lawyer_Dashboard_Pages/Dashboard.css";
import { collection, getDocs, where, doc, updateDoc, addDoc  } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, storage, db } from "../../firebase";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';


const  Add_Users = () => {
    const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState(''); 
  const [User, setUserAdd] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [fileError, setFileError] = useState("");
  const [picture, setPicture] = useState([]);
  const [title, settitle] =useState("");
  const [previewUrl, setPreviewUrl] = useState("");

  const baseUrl = "http://localhost:8000";

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


// preview image

const handleImagePreview = (e) => {
  const reader = new FileReader();
  const file = e.target.files[0];

  if (file) {
    reader.onloadend = () => {
      setPicture(file);
      setPreviewUrl(reader.result);
    };

    reader.readAsDataURL(file);
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

                  let collectionName = "";
                  if (User === "admin") {
                    collectionName = "admin";
                  } else if (User === "lawyer") {
                    collectionName = "lawyers";
                  } else if (User === "user") {
                    collectionName = "users";
                  }
                   // Add user to the specified collection
                   addDoc(collection(db, collectionName), {
                    uid: user.uid,
                    username,
                    authProvider: "local",
                    email,
                    image: url
                  })
                  setUsername('');
                  setEmail('');
                  setUserAdd('');
                  setPreviewUrl('');
                  let dataSend = {
                    email: email,
                    name: username,
                    password: password,
                    lawyer_id:user.uid,
                  };
              
                  const res = fetch(`${baseUrl}/emailsssa/sendEmailAdd`, {
                    method: "POST",
                    body: JSON.stringify(dataSend),
                    headers: {
                      Accept: "application/json",
                      "Content-Type": "application/json",
                    },
                  })
                  const resa = fetch(`${baseUrl}/emailsssadmin/sendEmailAdmin`, {
                    method: "POST",
                    body: JSON.stringify(dataSend),
                    headers: {
                      Accept: "application/json",
                      "Content-Type": "application/json",
                    },
                  })

                    .then(() => {
                      alert('Succesfully Register '+ collectionName);
                      let dataSend = {
                        email: email,
                        username: username,
                        password: password,
                        lawyer_id:user.uid
                      };
                    
                      const res = fetch(`${baseUrl}/emailsp/sendEmailsps`, {
                        method: "POST",
                        body: JSON.stringify(dataSend),
                        headers: {
                          Accept: "application/json",
                          "Content-Type": "application/json",
                        },
                      })
                      
                    })
                    .catch((err) => {
                      alert(err);
                    });
                  
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
                   <img src={previewUrl} alt="dummy" className='umn'/>
                  <label for='changepic' style={{marginTop:'67px'}}><span className='text-white change' style={{fontSize:'12px', position:"relative"}}>Change</span></label>
                  <input type='file' name='file' id='changepic' className='d-none'  onChange={handleImagePreview} />
                 </div>
                 <span className="text-danger">{fileError}</span>
                 
              </div>
          </div>
          <div className="col-md-8">
              <div className='msg_1'>
                
              <div className="px-5 py-4">
              <h2 className='text-white text-center'>{title}</h2>
                <div className="card-body">
                    <form>
                        {/* <!-- Form Row--> */}
                        <div className="row gx-3 mb-1">
                            <div className="col-md-6 mbs1">
                                <label className="small mb-1 text-white " for="inputFirstName">Full Name</label>
                                <div className="input-group mb-3 mbs">
                                 <input className="form-control contect-bgColors"  placeholder="Enter Your Full Name" id="inputFirstName" type="text"  value={username} onChange={(e) => {setUsername(e.target.value)}}/>
                                 <span className="input-group-text btns-primary border-prime bolder"><i className="bi bi-person-circle"></i></span>
                               </div>
                            </div>
                            <div className="col-md-6 mbs1">
                                <label className="small mb-1 text-white" for="inputEmail">Email</label>
                                <div className="input-group mb-3 mbs">
                                <input className="form-control contect-bgColors" id="inputEmail" type="email"  placeholder="Enter Your Email" value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                                 <span className="input-group-text btns-primary border-prime" ><i className="bi bi-envelope-open"></i></span>
                               </div>
                            </div>
                        </div>
                       
                        <div className="row gx-3 mb-1">
                            <div className="col-md-6 mbs1">
                                <label className="small mb-1 text-white" for="inputSpecialization">Password</label>
                                <div className="input-group mb-3 mbs">
                                <input className="form-control contect-bgColors" id="inputSpecialization" type="password" placeholder="Enter new password"  onChange={(e) => setPassword(e.target.value)}/>
                                <span className="input-group-text btns-primary border-prime" ><i className="bi bi-lock-fill"></i></span>
                              </div>
                            
                            </div>
                           
                            <div className="col-md-6 mbs1">
                                <label className="small mb-1 text-white" for="inputEducation">Confirm Password</label>   
                                <div className="input-group mb-3 mbs">
                                <input className="form-control contect-bgColors" id="inputEducation" type="password" name="password" placeholder="Enter confirm password"  onChange={(e) => setConfirmPassword(e.target.value)}/>
                                  <span className="input-group-text btns-primary border-prime" ><i className="bi bi-lock-fill"></i></span>
                                </div>
                            </div>
                        </div>
                        <div className="row gx-3 mb-1 mt-2">
                        <div className="col-md-6 mbs1">
                        <label className="small mb-1 text-white" for="inputState">User Role</label>  
                        <div className="input-group mb-3 mbs"> 
                    <select
                      id="inputState"
                      value={User}
                      onChange={handleUserChange}
                      className="form-select  selct contect-bgColors"
                    >
                      <option selected>Select user role</option>
                      <option value="admin">Admin</option>
                      <option value="lawyer">Lawyer</option>
                      <option value="user">User</option>
                    </select>
                    <span className="input-group-text btns-primary border-prime" ><i className="bi bi-person-fill"></i></span>
                    </div>
                  </div>
                  </div>
                  <p className="text-danger fs-5">{error}</p>
                      
                        <div className="row gutters">
			                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-4">
				                      <div className="text-end">
                            
					                      <Link to="/"><button type="button" id="submits" name="submit" className="btn btn-secondary">Cancel</button></Link>
					                      <button type="submit" id="submit" name="submit" className="btn btns-primary ms-2" onClick={handleSubmit}>Add</button>
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
