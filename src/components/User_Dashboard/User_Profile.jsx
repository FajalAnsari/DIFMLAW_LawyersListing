import React, {useEffect, useState} from 'react'
import "../Lawyer_Dashboard/Lawyer_Dashboard_Pages/Dashboard.css";
import { query, collection, getDocs, where, doc, updateDoc, and, or  } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, storage, db } from "../../firebase";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { EmailAuthProvider, getAuth, reauthenticateWithCredential, updatePassword } from "firebase/auth";


const User_Profile = () => {
    const navigate = useNavigate();
    const params = useParams();
  const [user, loading] = useAuthState(auth);
  const [userRole, setUserRole] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [location, setLocation] = useState('');
  const [setUserId ,getUserId] = useState("");
  const [url , setUrl] = useState("");
  const [image, setUserimage] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [NEWPassword, setNEWPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const fetchUserName = async () => {
      // check login as a user or lawyer
  const loginUserORLawyer = async () => {
    if(user){
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const q1 = query(collection(db, "admin"), where("uid", "==", user.uid));
  
  
      const docs = await getDocs(q);
      const info = await getDocs(q1)
     
      // user auth
      if (docs.empty) {
        console.log("No matching documents.");
      } else {
        docs.forEach((doc) => {
          const data = doc.data();
         
          setUserRole("user");
         
        });
      }
      // admin auth
      if (info.empty) {
        console.log("No matching documents.");
      } else {
        info.forEach((doc) => {
          const data = doc.data();
      
          setUserRole("admin");
       
        });
      }
  
    }
  }
  loginUserORLawyer();
  
    const allusers = collection(db, "users");
    const a = query(allusers,
      and(or(where("uid", "==", user.uid), where("uid", "==", params.id)),
  
      )
    )
   
    const res = [];
      const doc = await getDocs(a);
      doc.forEach(value=>{
          res.push({
              id: value.id,
              ...value.data()
          });
      });
      console.log(res[0].id);
      getUserId(res[0].id);
      const data = doc.docs[0].data();
      setUsername(data.username);
      setEmail(data.email);
      setNumber(data.number);
  
      setLocation(data.address);
 
      setUserimage(data.image);

    
  };
 const handleImageChange = (e) => {
   setUrl(e.target.files[0]);
       const storageRef = ref(storage, `/images/${e.target.files[0].name}`);
  const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);
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
            setUrl(url);
        }).catch((err)=>{
          console.log(err);
        })
    }
); 
 }
  useEffect(() => {
    if (loading) return;
    fetchUserName();
    if(!user) navigate("/login");
  }, [user, loading]);
 
// update the password
const handlePasswordUpdate = async (oldPassword, newPassword) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    // Reauthenticate the user with their old password
    const credential = EmailAuthProvider.credential(user.email, oldPassword);
    await reauthenticateWithCredential(user, credential);

    // Update the password
    await updatePassword(user, newPassword);

    // Password updated successfully
    alert("Password updated successfully!");
  } catch (error) {
    // Handle errors
    alert(error);
    console.error("Error updating password:", error);
  }
};

const handleUpdate = async (e) => {
  e.preventDefault()
  handlePasswordUpdate(oldPassword, newPassword); 
  const taskDocRef = doc(db,"users", setUserId);

  try{
    await updateDoc(taskDocRef,{
      username: username,
      email: email,
      number: number,
      image: url || image,
      address: location,
    }).then(() => {
      alert("Document successfully updated!");
    })
  } catch (err) {
    alert(err)
  }   
 
}


  return (
    <>
<div className="lawyer_profile" id='message'>
       <div className="row">
          <div className="col-md-4">
             <div className='user_pro'>
                 <div className="d-flex px-4 border border-prime border-4 rounded-full  um">
                   <img src={ url || image } alt="dummy" className='umn'/>
                  <label for='changepic' style={{marginTop:'67px'}}><span className='text-white change' style={{fontSize:'12px', position:"relative"}}>Change</span></label>
                  <input type='file' name='file' id='changepic' className='d-none' onChange={handleImageChange} />
                 </div>
                 
              </div>
          </div>
          <div className="col-md-8">
              <div className='msg_1'>
              <div className=" mb-4 px-5 py-5" >
                <div className="card-body">
                    <form onSubmit={handleUpdate}>
                        {/* <!-- Form Row--> */}
                        <div className="row gx-3 mb-1">
                            <div className="col-md-6 mbs1">
                                <label className="small mb-1 text-white " for="inputFirstName">Full Name</label>
                                <div class="input-group mb-3 mbs">
                                 <input className="form-control contect-bgColors" id="inputFirstName" type="text" placeholder={username} value={username} onChange={(e) => {setUsername(e.target.value)}}/>
                                 <span class="input-group-text btns-primary border-prime bolder"><i class="bi bi-person"></i></span>
                               </div>
                            </div>
                            <div className="col-md-6 mbs1">
                                <label className="small mb-1 text-white" for="inputEmail">Email</label>
                                <div class="input-group mb-3 mbs">
                                <input className="form-control contect-bgColors" id="inputEmail" type="email"  placeholder={email} value={email} onChange={(e) => {setEmail(e.target.value)}}  disabled/>
                                 <span class="input-group-text btns-primary border-prime" ><i class="bi bi-envelope-open"></i></span>
                               </div>
                            </div>
                        </div>
                        <div className="row gx-3 mb-1">
                        <div className="col-md-6 mbs1">
                                <label className="small mb-1 text-white" for="inputMobile">Phone Number</label> 
                                <div class="input-group mb-3 mbs">
                                  <input className="form-control contect-bgColors " id="inputMobile" type="tel" placeholder={number} value={number} onChange={(e) => {setNumber(e.target.value)}}/>
                                  <span class="input-group-text btns-primary border-prime" ><i class="bi bi-telephone"></i></span>
                                </div>    
                            </div>
                            
                            <div className="col-md-6 mbs1">
                            <label className="small mb-1 text-white" for="inputWork">Location</label>
                            <div class="input-group mb-3 mbs">
                             <input type="text" class="form-control contect-bgColors" id="inputZip" placeholder="Location, country, city, state..."  value={location} onChange={(e) => {setLocation(e.target.value)}}/>
                             <span class="input-group-text btns-primary" ><i class="bi bi-geo-alt"></i></span>
                           </div>
                            </div>
                        </div>
                        {userRole == 'user' && 
                        <div className="row gx-3 mb-1">
                            <div className="col-md-6 mbs1">
                                <label className="small mb-1 text-white" for="inputSpecialization">Old Password</label>
                                <div class="input-group mb-3 mbs">
                                <input className="form-control contect-bgColors" id="inputSpecialization" value={oldPassword} type="password" placeholder="Enter your old password" onChange={(e) => setOldPassword(e.target.value)} />
                                <span class="input-group-text btns-primary border-prime" ><i class="bi bi-lock-fill"></i></span>
                              </div>
                            
                            </div>
                           
                            <div className="col-md-6 mbs1">
                                <label className="small mb-1 text-white" for="inputEducation">New Password</label>   
                                <div class="input-group mb-3 mbs">
                                <input className="form-control contect-bgColors" id="inputEducation" value={newPassword} type="password" name="education" placeholder="Enter new password" onChange={(e) => setNewPassword(e.target.value)}/>
                                  <span class="input-group-text btns-primary border-prime" ><i class="bi bi-lock-fill"></i></span>
                                </div>
                            </div>
                        </div>
                        }
                          {userRole == 'admin' && 
                        <div className="row gx-3 mb-1">
                            <div className="col-md-6 mbs1">
                                <label className="small mb-1 text-white" for="inputSpecialization">New Password</label>
                                <div class="input-group mb-3 mbs">
                                <input className="form-control contect-bgColors" id="inputSpecialization" value={NEWPassword} type="password" placeholder="Enter your New password" onChange={(e) => setNEWPassword(e.target.value)} />
                                <span class="input-group-text btns-primary border-prime" ><i class="bi bi-lock-fill"></i></span>
                              </div>
                            
                            </div>
                           
                            <div className="col-md-6 mbs1">
                                <label className="small mb-1 text-white" for="inputEducation">Confirm Password</label>   
                                <div class="input-group mb-3 mbs">
                                <input className="form-control contect-bgColors" id="inputEducation" value={ConfirmPassword} type="password" name="education" placeholder="Enter Confirm password" onChange={(e) => setConfirmPassword(e.target.value)}/>
                                  <span class="input-group-text btns-primary border-prime" ><i class="bi bi-lock-fill"></i></span>
                                </div>
                            </div>
                        </div>
                        }

                        <div className="row gutters">
			                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-4">
				                      <div className="text-end">
					                    {userRole == 'user' &&  <Link to="/"><button type="button" id="submits" name="submit" className="btn btn-secondary">Discard</button></Link>} {userRole == 'admin' && <Link to="/lawyer_dashboard/allusers"><button type="button" id="submits" name="submit" className="btn btn-secondary">Back</button></Link>} 
					                      <button type="submit" id="submit" name="submit" className="btn btns-primary ms-2">Update</button>
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

export default User_Profile