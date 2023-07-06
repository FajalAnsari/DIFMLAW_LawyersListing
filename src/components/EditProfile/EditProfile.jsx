import React, {useEffect, useState} from 'react'
import "../EditProfile/EditProfile.css";
import { query, collection, getDocs, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { db } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { doc, updateDoc } from "firebase/firestore";
import { Link } from 'react-router-dom';
import { auth } from '../../firebase';
import { storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const EditProfile = () => {
    const navigate = useNavigate();
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
    const fetchUserName = async () => {
    
      const q = query(collection(db, "lawyers"), where("uid", "==", user.uid));
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
  

const handleUpdate = async (e) => {
    e.preventDefault()

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
        
      }).then(() => {
        alert("Document successfully updated!");
      })
    } catch (err) {
      alert(err)
    }    
  }
  return (
    <div>
      <div className="container-xl px-4 mt-4" id='sections'>
    <div className="row">
        <div className="col-xl-4">
           
            <div className="card mb-4 mb-xl-0">
                <div className="card-header">Profile Picture</div>
                <div className="card-body text-center">
                   
                    <img className="img-account-profile uspro mb-2" src={url} alt="user_profile"/>
                   
                    <div className="small font-italic text-muted mb-4"><b className='fs-4'>{username}</b></div>
                    <label for="file" className="btn btns-primary w-10">Upload New Image</label>
                    <input type='file' id='file' onChange={handleImageChange} />
                    
                </div>
            </div>
        </div>
        <div className="col-xl-8">
            {/* <!-- Account details card--> */}
            <div className="card mb-4">
                <div className="card-header">User Details</div>
                <div className="card-body">
                    <form onSubmit={handleUpdate}>
                        {/* <!-- Form Row--> */}
                        <div className="row gx-3 mb-3">
                            <div className="col-md-6">
                                <label className="small mb-1" for="inputFirstName">Full Name</label>
                                <input className="form-control ed" id="inputFirstName" type="text" placeholder={username} value={username} onChange={(e) => {setUsername(e.target.value)}}/>
                            </div>
                            <div className="col-md-6">
                                <label className="small mb-1" for="inputEmail">Email</label>
                                <input className="form-control ed" id="inputEmail" type="email" placeholder={email} value={email} onChange={(e) => {setEmail(e.target.value)}}  disabled/>
                            </div>
                        </div>
                        <div className="row gx-3 mb-3">
                        <div className="col-md-6">
                                <label className="small mb-1" for="inputMobile">Mobile</label>
                                <input className="form-control ed" id="inputMobile" type="tel" placeholder={number} value={number} onChange={(e) => {setNumber(e.target.value)}}/>
                            </div>
                            
                            <div className="col-md-6">
                                <label className="small mb-1" for="inputExperience">Experience</label>
                                <select id="inputExperience" value={experience}
                                 onChange={(e) => {setExperience(e.target.value)}} class="form-select">
                                       <option selected>{experience}</option>
                                        <option value="1 Year">1 Year</option>
                                         <option value="2 Year">2 Years</option>
                                          <option value="3 Year">3 Years</option>
                                          <option value="4 Year">4 Years</option>
                                             <option value="5 Year">5 Years</option>
                                               <option value="6 Year">6 Years</option>
                                                  <option value="7 Year">7 Years</option>
                                                     <option value="8 Year" >8 Years</option>
                                                <option value="9 Year">9 Years</option>
                                                   <option value="10+ Year">10+ Years</option>
                                     </select>
                            
                            </div>
                        </div>
                       
                        <div className="row gx-3 mb-3">
                            <div className="col-md-6">
                                <label className="small mb-1" for="inputSpecialization">Specialization</label>
                                <select id="inputSpecialization" value={specialization} onChange={(e) => {setSpecialization(e.target.value)}} class="form-select">
                                   <option selected>{specialization}</option>
                                   <option value="Injury Lawyers">Injury Lawyers</option>
                                     <option value="Family Law Lawyers">Family Law Lawyers</option>
                                       <option value="Defense Lawyers">Defense Lawyers</option>
                                       <option value="Corporate Lawyers">Corporate Lawyers</option>
                                       <option value="Immigration Lawyers">Immigration Lawyers</option>
                                          <option value="Property Lawyers">Property Lawyers</option>
                                       <option value="Real Estate Lawyers">Real Estate Lawyers</option>
                                   <option value="Employment Lawyers">Employment Lawyers</option>
                                 </select>
                            
                            </div>
                           
                            <div className="col-md-6">
                                <label className="small mb-1" for="inputEducation">Education</label>
                                <input className="form-control ed" id="inputEducation" type="text" name="education" placeholder="Describe your education qualifications" value={education} onChange={(e) => {setEducation(e.target.value)}} required/>
                            </div>
                        </div>
                        <div className="row gx-3 mb-3">
                            <div className="col-md-6">
                                <label className="small mb-1" for="inputWork">Work Type</label>
                                <select id="inputWork" value={work} onChange={(e) => {setWork(e.target.value)}} class="form-select">
                                 <option selected>Choose..</option>
                                   <option value="Full Day">Full Day</option>
                                    <option value="Half Day">Half Day</option>

                                </select>
                            </div>
                           
                            <div className="col-md-6">
                            <label className="small mb-1" for="inputWork">Enter or choose location</label>
                            <div class="input-group mb-3">
                             <input type="text" class="form-control" id="inputZip" placeholder="Location, country, city, state..." value={location} onChange={(e) => {setLocation(e.target.value)}}/>
                             <span class="input-group-text btns-primary" ><i class="bi bi-geo-alt"></i></span>
                           </div>
                            </div>
                        </div>
                        <div class="col-md-12">
                        <label for="inputZip" class="form-label">Bio/Profile Summary</label>
                        <textarea class="form-control ed text-primary" maxLength="250"  id="form6Example7" rows="4" placeholder={bio} value={bio} onChange={biohaldle}></textarea>
                        </div>
                        <div className="row gutters">
			                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-4">
				                      <div className="text-end">
					                      <Link to="/"><button type="button" id="submits" name="submit" className="btn btn-secondary">Cancel</button></Link>
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
  )
}

export default EditProfile