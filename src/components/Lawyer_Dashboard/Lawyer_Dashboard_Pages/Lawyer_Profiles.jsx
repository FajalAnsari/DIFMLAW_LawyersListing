import React, {useEffect, useState} from 'react'
import "./Dashboard.css";
import { query, collection, getDocs, where, doc, updateDoc, and, or  } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, storage, db } from '../../../firebase';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { dummy } from '../../images';
import { useParams } from 'react-router-dom';


const Lawyer_Profiles = () => {

  const navigate = useNavigate();
  const params = useParams();
  const [userRole, setUserRole] = useState(null);
  const [user, loading] = useAuthState(auth);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [experience, setExperience] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [education, setEducation] = useState('');
  const [work, setWork] = useState('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [setUserId ,getUserId] = useState("");
  const [url , setUrl] = useState("");
  const [picture, setPicture]= useState([]);
  const [multiImages,setMultiImages] = useState([]);
  const [multipleImages ,setMultipleImages] = useState([]);
  const fetchUserName = async () => {
 
    // check login as a user or lawyer
  const loginUserORLawyer = async () => {
    if(user){
      const q = query(collection(db, "lawyers"), where("uid", "==", user.uid));
      const q1 = query(collection(db, "admin"), where("uid", "==", user.uid));
  
  
      const docs = await getDocs(q);
      const info = await getDocs(q1)
     
      // lawyer auth
      if (docs.empty) {
        console.log("No matching documents.");
      } else {
        docs.forEach((doc) => {
          const data = doc.data();
          console.log(data);
          console.log("lawyer login");
          setUserRole("lawyer");
         
        });
      }
      // admin auth
      if (info.empty) {
        console.log("No matching documents.");
      } else {
        info.forEach((doc) => {
          const data = doc.data();
          console.log(data);
          console.log("admin login");
          setUserRole("admin");
       
        });
      }
  
    }
  }
  loginUserORLawyer();

  const alllawyers = collection(db, "lawyers");
  const a = query(alllawyers,
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
      console.log(params.id);
   
      console.log(res[0].id);
      getUserId(res[0].id);
      const data = doc.docs[0].data();
      setUsername(data.username);
      setEmail(data.email);
      setNumber(data.number);
      setSpecialization(data.specialization);
      setExperience(data.experience);
      setLocation(data.address);
      setWork(data.work);
      setBio(data.summary);
      setEducation(data.education);
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
 



  const biohaldle=(e)=>{
    // Here we are checking if the length is equal to 10
    if(e.target.value.length===250){ 
      window.alert("Summary can't be more then 30 words!");
      return false;
    }
    setBio(e.target.value);
  }

// maximum two images upload
const handleMultiImages = (e) => {
  const selectedImages = e.target.files;
  // Check if the total number of images selected is greater than 2
  if (selectedImages.length > 2) {
    alert("Please select up to two images only.");
    return;
  }

  const imageNames = [];
  for (let i = 0; i < selectedImages.length; i++) {
     const NewImage = selectedImages[i]
       // Update the setPicture state with the array of image names
  setPicture((prevState) => [...prevState, NewImage]);
  }
  


  console.log(imageNames);
  
}

const handleUpdate = async (e) => {
  e.preventDefault()
  const promises = []
  console.log(picture);
  picture.map((image)=>{
      // update the lawyer images
  const storageRef = ref(storage, `/images/${image.name}`);
  const uploadTask = uploadBytesResumable(storageRef, image);
  promises.push(uploadTask)
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
   async () => {
        // download url
      await getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
          setMultiImages(url);
            // setMultiImages((prevState)=> [...prevState, url]);
        }).catch((err)=>{
          console.log(err);
        })
    }
   
); 

  })

  const taskDocRef = doc(db,"lawyers", setUserId);

  try{
    await updateDoc(taskDocRef,{
      username: username,
      email: email,
      number: number,
      experience: experience,
      specialization: specialization,
      education: education,
      work: work,
      image: url,
      address: location,
      summary: bio,
      photos:multiImages,
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
                                <label className="small mb-1 text-white" for="inputFirstName">Full Name</label>
                                <div class="input-group mb-3 mbs">
                                 <input className="form-control contect-bgColors dm py-0" id="inputFirstName" type="text" placeholder={username} value={username} onChange={(e) => {setUsername(e.target.value)}}/>
                                 <span class="input-group-text btns-primary border-prime bolder dm"><i class="bi bi-person"></i></span>
                               </div>
                            </div>
                            <div className="col-md-6 mbs1">
                                <label className="small mb-1 text-white" for="inputEmail">Email</label>
                                <div class="input-group mb-3 mbs">
                                <input className="form-control contect-bgColors dm" id="inputEmail" type="email"  placeholder={email} value={email} onChange={(e) => {setEmail(e.target.value)}}  disabled/>
                                 <span class="input-group-text btns-primary border-prime dm" ><i class="bi bi-envelope-open"></i></span>
                               </div>
                            </div>
                        </div>
                        <div className="row gx-3 mb-1">
                        <div className="col-md-6 mbs1">
                                <label className="small mb-1 text-white" for="inputMobile">Mobile</label> 
                                <div class="input-group mb-3 mbs">
                                  <input className="form-control contect-bgColors dm py-0" id="inputMobile" type="tel" placeholder={number} value={number} onChange={(e) => {setNumber(e.target.value)}} />
                                  <span class="input-group-text btns-primary border-prime dm" ><i class="bi bi-telephone"></i></span>
                                </div> 
                                   
                            </div>
                            
                            <div className="col-md-6 mbs1">
                                <label className="small mb-1 text-white dm" for="inputExperience">Experience</label>    
                                <div class="input-group mb-3 mbs">
                                <select id="inputState" value={experience} onChange={(e) => setExperience(e.target.value)} class="form-select contect-bgColors selct py-0">
                                 <option selected>Choose...</option>
                                 <option value="1 Year">1 Year</option>
                                 <option value="2 Year">2 Years</option>
                                 <option value="3 Year">3 Years</option>
                                 <option value="4 Year">4 Years</option>
                                 <option value="5 Year">5 Years</option>
                                 <option value="6 Year">6 Years</option>
                                 <option value="7 Year">7 Years</option>
                                 <option value="8 Year">8 Years</option>
                                 <option value="9 Year">9 Years</option>
                                 <option value="10+ Year">10+ Years</option>
                               </select>
                                <span class="input-group-text btns-primary border-prime dm" ><i class="bi bi-briefcase-fill"></i></span>
                              </div>
                            </div>
                        </div>
                       
                        <div className="row gx-3 mb-1">
                            <div className="col-md-6 mbs1">
                                <label className="small mb-1 text-white" for="inputSpecialization">Specialization</label>
                                <div class="input-group mb-3 mbs">
                                <select id="inputState" value={specialization} onChange={(e) => setSpecialization(e.target.value)} class="form-select contect-bgColors selct py-0">
                                   <option selected>Select your expertise</option>
                                   <option value="Injury Lawyers">Injury Lawyers</option>
                                   <option value="Family Law Lawyers">Family Law Lawyers</option>
                                   <option value="Defense Lawyers">Defense Lawyers</option>
                                   <option value="Corporate Lawyers">Corporate Lawyers</option>
                                   <option value="Immigration Lawyers">Immigration Lawyers</option>
                                   <option value="Property Lawyers">Property Lawyers</option>
                                   <option value="Real Estate Lawyers">Real Estate Lawyers</option>
                                   <option value="Employment Lawyers">Employment Lawyers</option>
                               </select>
                                <span class="input-group-text btns-primary border-prime dm" ><i class="bi bi-person-fill"></i></span>
                              </div>
                            
                            </div>
                           
                            <div className="col-md-6 mbs1">
                                <label className="small mb-1 text-white" for="inputEducation">Qualification</label>   
                                <div class="input-group mb-3 mbs">
                                <input className="form-control contect-bgColors dm py-0" id="inputEducation" type="text" name="education" placeholder="Describe your education qualifications" value={education} onChange={(e) => {setEducation(e.target.value)}} required/>
                                  <span class="input-group-text btns-primary border-prime dm" ><i class="bi bi-person-fill"></i></span>
                                </div>
                            </div>
                        </div>
                        <div className="row gx-3 mb-3">
                            <div className="col-md-6 mbs1">
                                <label className="small mb-1 text-white" for="inputWork">Location</label>
                                <div class="input-group mb-3 mbs">
                                <input className="form-control contect-bgColors dm py-0" id="inputWor" type="text" placeholder={location} value={location} onChange={(e) => {setLocation(e.target.value)}}/>
                                <span class="input-group-text btns-primary border-prime dm" ><i class="bi bi-geo-alt-fill"></i></span>
                              </div>
                            </div>
                           
                            <div className="col-md-6 mbs1">
                            <label className="small mb-1 text-white" for="inputWork">Pictures</label>
                            <div class="input-group mb-3 mbs">
                             <input type="file" name="file-input" id="file-input" className="contect-bgColors inpu dm" multiple onChange={handleMultiImages} />
                             <span class="input-group-text btns-primary border-prime dm" ><i class="bi bi-card-image"></i></span>
                           </div>
                            </div>
                        </div>
                        <div class="col-md-12 mbs1">
                        <label for="inputZip" class="form-label text-white">Bio/Profile Summary</label>
                        <textarea class="form-control ed text-primary contect-bgColors" maxLength="250"  id="form6Example7" rows="4" placeholder={bio} value={bio} onChange={biohaldle}></textarea>
                        </div>
                        <div className="row gutters">
			                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-4">
				                      <div className="text-end">
					                    {userRole == 'lawyer' &&  <Link to="/"><button type="button" id="submits" name="submit" className="btn btn-secondary">Discard</button></Link>} {userRole == 'admin' && <Link to="/lawyer_dashboard/alllawyers"><button type="button" id="submits" name="submit" className="btn btn-secondary">Back</button></Link>} 
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

export default Lawyer_Profiles
