import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db } from "../../firebase";
import { auth } from "../../firebase";
// import { useAuthState } from 'react-firebase-hooks/auth';
import "../form/form.css";


const Signup = () => {
  const [userErr,setUserErr] = useState("");
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
  const [getImage, setImage] = useState("");
  const [fileError ,setFileError] =useState("");


  //this for user form
  const [name, setName] = useState("");
  const [emails, setEmails] = useState("");
  const [state, setState] = useState("");
  const [number, setNumber] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  // const [user, loading] = useAuthState(auth);

  
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

       
        const res = createUserWithEmailAndPassword(auth, email, password).then(
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
                      setImage(url);
                      console.log(url);
                      addDoc(collection(db, "lawyers"), {
                        uid: user.uid,
                        username,
                        authProvider: "local",
                        email,
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
        const res = createUserWithEmailAndPassword(auth, emails, pass).then(
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
      <div className="container  form-container mt-4 form-control">

        {isLawyer && (
          <>
          <button
          type="button"
          class="btn btn-primary me-4 mt-2"
          id="regist1"
          onClick={handleRegisterAsLawyer}
        >
          Register as Lawyer
        </button>
        <button
          type="button"
          class="btn btn-light mt-2"
          id="regist2"
          onClick={handleRegisterAsUser}
        >
          Register as User
        </button>
          <form
            class="row g-3 me-4 mx-4 mt-4"
            onSubmit={handleLawyerFormSubmit}
          >
            <div class="col-md-6">
              <label for="inputEmail4" class="form-label">
                Enter Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                class="form-control"
                id="inputEmail4"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div class="col-md-6">
              <label for="inputPassword4" class="form-label">
                Enter Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                class="form-control"
                id="inputPassword4"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div class="col-md-6">
              <label for="inputPassword4" class="form-label">
                Phone No.
              </label>
              <input
                type="number"
                placeholder="Enter your number"
                class="form-control"
                id="inputPassword4"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div class="col-md-6">
              <label for="inputState" class="form-label">
                Experience
              </label>
              <select
                id="inputState"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                class="form-select"
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
              <label for="inputState" class="form-label">
                Specialization(s)
              </label>
              <select
                id="inputState"
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                class="form-select"
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
              <label for="inputZip" class="form-label">
               Enter or choose location
              </label>
               <div class="input-group mb-3">
               <input type="text" class="form-control" id="inputZip" placeholder="Location, country, city, state..." value={location}
                onChange={(e) => setLocation(e.target.value)}/>
               <span class="input-group-text" ><i class="bi bi-geo-alt"></i></span>
             </div>
            </div>
            <div class="col-md-6">
              <label for="inputState" class="form-label">
                Work Type
              </label>
              <select
                id="inputState"
                value={work}
                onChange={(e) => setWork(e.target.value)}
                class="form-select"
              >
                <option selected>Choose..</option>
                <option value="Full Day">Full Day</option>
                <option value="Half Day">Half Day</option>
              </select>
            </div>
            <div class="col-md-6">
              <p class="form-label  fs-6">Profile Picture</p>
              <label for="inputpictur" class="form-control pic5">
                Choose your profile picture
              </label>
              <input
                type="file"
                placeholder="Choose your profile picture"
                class="form-control"
                id="inputpictur"
                name="picture"
                onChange={(e) => setPicture(e.target.files[0])}
              />
              <span className="text-danger">{fileError}</span>
            </div>
            <div class="col-md-6">
              <label for="inputZip" class="form-label">
                Password
              </label>
              <input
                type="text"
                placeholder="Password "
                class="form-control"
                id="inputZip"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div class="col-md-6">
              <label for="inputZip" class="form-label">
                Confirm password
              </label>
              <input
                type="text"
                placeholder="Confirm password"
                class="form-control"
                id="inputZip"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div class="col-md-12">
              <label for="inputZip" class="form-label">
                Bio/Profile Summary
              </label>
              <textarea
                class="form-control"
                placeholder="Write about yourself..."
                id="form6Example7"
                rows="4"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              ></textarea>
            </div>
            <p className="text-danger fs-5">{error}</p>
            <div class="col-md-12 mb-4 ">
              <button
                type="submit"
                class="btn btn-primary form-control mt-2 mb-5 signup"
              >
                Register Now
              </button>
            </div>
          </form>
          </>
        )}

        {isUser && (
          <>
          <button
          type="button"
          class="btn btn-light me-4 mt-2"
          id="regist1"
          onClick={handleRegisterAsLawyer}
        >
          Register as Lawyer
        </button>
        <button
          type="button"
          class="btn btn-primary mt-2"
          id="regist2"
          onClick={handleRegisterAsUser}
        >
          Register as User
        </button>
          <form class="row g-3 me-4 mx-4 mt-4" onSubmit={handleUserFormSubmit}>
            <div class="col-md-6">
              <label for="inputEmail4" class="form-label">
                Enter Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                class="form-control"
                id="inputEmail4"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div class="col-md-6">
              <label for="inputPassword4" class="form-label">
                Enter Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                class="form-control"
                id="inputPassword4"
                value={emails}
                onChange={(e) => setEmails(e.target.value)}
              />
            </div>
            <div class="col-md-6">
              <label for="inputPassword4" class="form-label">
                Phone No.
              </label>
              <input
                type="number"
                placeholder="Enter your number"
                class="form-control"
                id="inputPassword4"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>

            <div class="col-md-6">
              <label for="inputZip" class="form-label">
                State
              </label>
              <input
                type="text"
                placeholder="Select your state"
                class="form-control"
                id="inputZip"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </div>

            <div class="col-md-6">
              <label for="inputZip" class="form-label">
                Password
              </label>
              <input
                type="text"
                placeholder="Password "
                class="form-control"
                id="inputZip"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              />
            </div>
            <div class="col-md-6">
              <label for="inputZip" class="form-label">
                Confirm password
              </label>
              <input
                type="text"
                placeholder="Confirm password"
                class="form-control"
                id="inputZip"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
              />
                
            </div>
            {/* <span className="text-danger">{userErr}</span> */}
            <div class="col-md-12 mb-4 ">
              <button
                type="submit"
                class="btn btn-primary form-control mt-2 mb-5 signup"
              >
                Register Now
              </button>
            </div>
          </form>
          </>
        )}
      </div>
    </>
  );
};

export default Signup;
