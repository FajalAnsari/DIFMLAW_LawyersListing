import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db } from "../../firebase";
import { auth } from "../../firebase";
// import { useAuthState } from 'react-firebase-hooks/auth';
import "../form/form.css";


const Signup = () => {
  const [setUserErr] = useState("");
  const navigate = useNavigate();
  const [isLawyer, setIsLawyer] = useState(true);
  const [isUser, setIsUser] = useState(false);

 
 

  const handleRegisterAsLawyer = () => {
    setIsLawyer(true);
    setIsUser(false);
  };

  const handleRegisterAsUser = () => {
    setIsLawyer(false);
    setIsUser(true);
  };

  // this for lawyer form
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [experience, setExperience] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [location, setLocation] = useState("");
  const [work, setWork] = useState("");
  const [picture, setPicture] = useState([]);
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
 
  const [fileError ,setFileError] =useState("");


  //this for user form
  const [name, setName] = useState("");
  const [emails, setEmails] = useState("");
  const [state, setState] = useState("");
  const [number, setNumber] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  // const [user, loading] = useAuthState(auth);

  const biohaldle=(e)=>{
    // Here we are checking if the length is equal to 10
    if(e.target.value.length===250){ 
      window.alert("Summary can't be more then 30 words!");
      return false;
    }
    setBio(e.target.value);
  }

  const handleLawyerFormSubmit = (event) => {
    event.preventDefault();
    // Write logic to submit the form data to the server
    if (
      !username ||
      !email ||
      !phone ||
      !experience ||
      !specialization ||
      !location ||
      !work ||
      !picture ||
      !bio ||
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
    if(fileSizeKiloBytes > 500){
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
                      addDoc(collection(db, "lawyers"), {
                        uid: user.uid,
                        username,
                        authProvider: "local",
                        email: email,
                        number: phone,
                        experience: experience,
                        specialization: specialization,
                        address: location,
                        work: work,                      
                        summary: bio,
                        image: url
                      })
                     .then(()=>{alert("uploaded");                    
                     navigate("/");
                    }).catch((err) => {alert(err);})
                  });
              }); 
            }).catch((err)=>{
              alert(err);
            })
          }
      } else {
        setError("Your password and confirm password is doesn't match!");
      }
    }

  };

  //this is for users
  const handleUserFormSubmit = (event) => {
    event.preventDefault();
    // Write logic to submit the form data to the server
    if (
      !name ||
      !emails ||
      !number ||
      !state ||
      !pass ||
      !confirmPass
    ) {
      setError("Please fill all the value!");
    } else {
      if (pass === confirmPass) {
         createUserWithEmailAndPassword(auth, emails, pass).then(
          async (res) => {
            const user = res.user;
            console.log(user);
            await addDoc(collection(db, "users"), {
              uid: user.uid,
              name,
              authProvider: "local",
              email: emails,
              number: number,
              state: state,
            });
            navigate("/");
          }
        ).catch((err)=>{
          setUserErr(err);
          alert(err);
        })
      } else {
        setError("Your password and confirm password is doesn't match!");
      }
    }
  };

  return (
    <>
    <div className="form-sectionss">
      <div className="container">
        {isLawyer && (
          <>
          <div class="btns-formssec" style={{marginLeft: "12.5%"}}>
          <button
          type="button"
          class="btns-primary border-prime btn-law"
          id="regist1"
          style={{marginTop:"10%"}}
          onClick={handleRegisterAsLawyer}
        >
           Lawyer
        </button>
        <button
          type="button"
          class="btn-light mt-2 inputs btn-law border-prime font-color"
          id="regist2"
          onClick={handleRegisterAsUser}
        >
          User
        </button>
        </div>
        <div className="shadow form-container forms-bg w-75 mx-auto p-5">

          <form
            class="row g-3 me-4 mx-4 mt-1"
            onSubmit={handleLawyerFormSubmit}
          >
            <div class="col-md-6">
              <input
                type="text"
                placeholder="Enter your full name"
                class="form-control inputs selct"
                id="inputEmail4"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div class="col-md-6">
              <input
                type="email"
                placeholder="Enter your email"
                class="form-control inputs selct"
                id="inputPassword4"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div class="col-md-6">
              <input
                type="number"
                placeholder="Enter your number"
                class="form-control inputs selct"
                id="inputPassword4"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div class="col-md-6">
              <select
                id="inputState"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                class="form-select inputs selct"
              >
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
            </div>
            <div class="col-md-6">
              <select
                id="inputState"
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                class="form-select inputs selct"
              >
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
            </div>

            <div class="col-md-6">
               <div class="input-group mb-3">
               <input type="text" class="form-control inputs selct" id="inputZip" placeholder="Location, country, city, state..." value={location}
                onChange={(e) => setLocation(e.target.value)}/>
               <span class="input-group-text inputs border-prime selct" ><i class="bi bi-geo-alt "></i></span>
             </div>
            </div>
            <div class="col-md-6">
              <select
                id="inputState"
                value={work}
                onChange={(e) => setWork(e.target.value)}
                class="form-select inputs selct"
              >
                <option selected>Choose..</option>
                <option value="Full Day">Full Day</option>
                <option value="Half Day">Half Day</option>
              </select>
            </div>
            <div class="col-md-6">
              <input
                type="file"
                placeholder="Choose your profile picture"
                class="form-control inputs selct"
                name="picture"
                onChange={(e) => setPicture(e.target.files[0])}
              />
              <span className="text-danger">{fileError}</span>
            </div>
            <div class="col-md-6">
              <input
                type="text"
                placeholder="Password "
                class="form-control inputs selct"
                id="inputZip"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div class="col-md-6">
              <input
                type="text"
                placeholder="Confirm password"
                class="form-control inputs selct"
                id="inputZip"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div class="col-md-12 mt-4">
              <textarea
                class="form-control inputs border-grays"
                placeholder="Write about yourself..."
                id="form6Example7"
                rows="4"
                value={bio}
                onChange={biohaldle}
              ></textarea>
            </div>
            <p className="text-danger fs-5">{error}</p>
            <div class="col-md-12 mb-4 ">
              <button
                type="submit"
                class=" mt-2 mb-5 signup border-white btn-regi"
              >
                Register Now
              </button>
            </div>
          </form>
        </div>
          </>
        )}

        {isUser && (
          <>
          <div class="btns-formssec" style={{marginLeft: "12.5%"}}>
          <button
          type="button"
          class="btn-light inputs btn-law border-prime font-color"         
          id="regist1"
          style={{marginTop:"10%"}}
          onClick={handleRegisterAsLawyer}
        >
           Lawyer
        </button>
        <button
          type="button"
          class="btns-primary mt-2  border-prime btn-law"
          id="regist2"
          onClick={handleRegisterAsUser}
        >
          User
        </button>
        </div>
        <div className="shadow form-container forms-bg  mb-4 w-75 mx-auto p-5">

          <form class="row g-3 me-4 mx-4 mt-1" onSubmit={handleUserFormSubmit}>
            <div class="col-md-6">
              <input
                type="text"
                placeholder="Enter your full name"
                class="form-control inputs selct"
                id="inputEmail4"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div class="col-md-6">
              <input
                type="email"
                placeholder="Enter your email"
                class="form-control inputs selct"
                id="inputPassword4"
                value={emails}
                onChange={(e) => setEmails(e.target.value)}
              />
            </div>
            <div class="col-md-6">
              <input
                type="number"
                placeholder="Enter your number"
                class="form-control inputs selct"
                id="inputPassword4"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>

            <div class="col-md-6">
              <input
                type="text"
                placeholder="Select your state"
                class="form-control inputs selct"
                id="inputZip"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </div>

            <div class="col-md-6">
              <input
                type="text"
                placeholder="Password "
                class="form-control inputs selct"
                id="inputZip"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              />
            </div>
            <div class="col-md-6">
              <input
                type="text"
                placeholder="Confirm password"
                class="form-control inputs selct"
                id="inputZip"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
              />
                
            </div>
            {/* <span className="text-danger">{userErr}</span> */}
            <div class="col-md-12 mt-5 ">
              <button
                type="submit"
                class=" mt-2 mb-5 signup border-white btn-regi"
              >
                Register Now
              </button>
            </div>
          </form>
          </div>
          </>
        )}
  </div>
      </div>
    </>
  );
};

export default Signup;
