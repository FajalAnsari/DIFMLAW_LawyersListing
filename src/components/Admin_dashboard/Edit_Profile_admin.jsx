import React, {useEffect, useState} from 'react'
import "../Lawyer_Dashboard/Lawyer_Dashboard_Pages/Dashboard.css";
import { query, collection, getDocs, where, doc, updateDoc  } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, storage, db } from "../../firebase";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
// import { dummy } from '../../images';

const  Edit_Profile_admin = () => {
    const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [location, setLocation] = useState('');
  const [setUserId ,getUserId] = useState("");
  const [url , setUrl] = useState("");
  const fetchUserName = async () => {
  
    const q = query(collection(db, "admin"), where("uid", "==", user.uid));
    const res = [];
      const doc = await getDocs(q);
      doc.forEach(value=>{
          res.push({
              id: value.id,
              ...value.data()
          });
      });
      console.log(res[0].id);
      getUserId(res[0].id);
      const data = doc.docs[0].data();
      setUsername(data.name);
      setEmail(data.email);
      setUrl(data.image);

    
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
 

const handleUpdate = async (e) => {
  e.preventDefault()

  const taskDocRef = doc(db,"users", setUserId);

  try{
    await updateDoc(taskDocRef,{
      name: username,
      email: email,
      image: url,
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
                   <img src={url} alt="dummy" className='umn'/>
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
                                <div className="input-group mb-3 mbs">
                                 <input className="form-control contect-bgColors" id="inputFirstName" type="text" placeholder={username} value={username} onChange={(e) => {setUsername(e.target.value)}}/>
                                 <span className="input-group-text btns-primary border-prime bolder"><i className="bi bi-person"></i></span>
                               </div>
                            </div>
                            <div className="col-md-6 mbs1">
                                <label className="small mb-1 text-white" for="inputEmail">Email</label>
                                <div className="input-group mb-3 mbs">
                                <input className="form-control contect-bgColors" id="inputEmail" type="email"  placeholder={email} value={email} onChange={(e) => {setEmail(e.target.value)}}  disabled/>
                                 <span className="input-group-text btns-primary border-prime" ><i className="bi bi-envelope-open"></i></span>
                               </div>
                            </div>
                        </div>
                       
                        <div className="row gx-3 mb-1">
                            <div className="col-md-6 mbs1">
                                <label className="small mb-1 text-white" for="inputSpecialization">Old Password</label>
                                <div className="input-group mb-3 mbs">
                                <input className="form-control contect-bgColors" id="inputSpecialization" type="text" placeholder="Enter your old password" />
                                <span className="input-group-text btns-primary border-prime" ><i className="bi bi-lock-fill"></i></span>
                              </div>
                            
                            </div>
                           
                            <div className="col-md-6 mbs1">
                                <label className="small mb-1 text-white" for="inputEducation">New Password</label>   
                                <div className="input-group mb-3 mbs">
                                <input className="form-control contect-bgColors" id="inputEducation" type="text" name="education" placeholder="Enter new password"/>
                                  <span className="input-group-text btns-primary border-prime" ><i className="bi bi-lock-fill"></i></span>
                                </div>
                            </div>
                        </div>
                      
                        <div className="row gutters">
			                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-4">
				                      <div className="text-end">
					                      <Link to="/lawyer_dashboard/"><button type="button" id="submits" name="submit" className="btn btn-secondary">Cancel</button></Link>
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

export default  Edit_Profile_admin