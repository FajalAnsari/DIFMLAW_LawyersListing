import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";
import { auth } from "../../firebase";
// import { useAuthState } from 'react-firebase-hooks/auth';
import "../form/form.css";


const Signup = () => {
  const [setUserErr] = useState("");
  const navigate = useNavigate();
  const [isLawyer, setIsLawyer] = useState(true);
  const [isUser, setIsUser] = useState(false);
  const [showPassword, setShowPassword] = useState(false);


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
  const [errors, setErrors] = useState(null);
  const [fileError, setFileError] = useState("");

  const baseUrl = "http://localhost:8000";

  //this for user form
  const [name, setName] = useState("");
  const [emails, setEmails] = useState("");
  const [state, setState] = useState("");
  const [number, setNumber] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  // const [user, loading] = useAuthState(auth);

  const biohaldle = (e) => {
    // Here we are checking if the length is equal to 10
    if (e.target.value.length === 250) {
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
                      image: url,
                      date: serverTimestamp()
                    })
                   .then(() => {
                    let dataSend = {
                      email: email,
                      name: username,
                    };
                
                    const res = fetch(`${baseUrl}/emailslawsign/sendEmailLawyersign`, {
                      method: "POST",
                      body: JSON.stringify(dataSend),
                      headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                      },
                    })
                        navigate("/");
                      }).catch((err) => { alert(err); })
                  });
                });
            }).catch((error) => {
              if (error.code === 'auth/email-already-in-use') {
                alert('You are already registered please login!.');
                navigate("/login");
              } 
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
      setErrors("Please fill all the value!");
    } else {
      if (pass === confirmPass) {
        createUserWithEmailAndPassword(auth, emails, pass).then(
          async (res) => {
            const user = res.user;
            console.log(user);
            await addDoc(collection(db, "users"), {
              uid: user.uid,
              username: name,
              authProvider: "local",
              email: emails,
              number: number,
              address: state,
              image: 'https://www.dlf.pt/dfpng/middlepng/569-5693658_dummy-user-image-png-transparent-png.png',
              date: serverTimestamp()
            });
            let dataSend = {
              email: email,
              name: username,
            };
        
            const rese = fetch(`${baseUrl}/emailsusersign/sendEmailUsersign`, {
              method: "POST",
              body: JSON.stringify(dataSend),
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            })
            navigate("/");
          }
        ).catch((err) => {
          if (err.code === 'auth/email-already-in-use') {
            alert('You are already registered please login!.');
            navigate("/login");
          } 
        })
      } else {
        setErrors("Your password and confirm password is doesn't match!");
      }
    }
  };

  return (
    <>
      <div className="form-sectionss" style={{ marginTop: "1px" }}>
        <div className="container">
          {isLawyer && (
            <>
              <div class="btns-formssec" style={{ marginLeft: "12.5%" }}>
                <button
                  type="button"
                  class="btns-primary border-prime btn-law"
                  id="regist1"
                  style={{ marginTop: "10%" }}
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
              <div className="shadow form-container forms-bg w-75 mx-auto p-2">

                <form
                  class="row g-3 me-4 mx-4"
                  onSubmit={handleLawyerFormSubmit}
                >
                  <div class="col-md-6 mt-4">
                    <label className="small mb-1 text-white " for="inputFirstName">Full Name</label>
                    <div class="input-group mbs">
                      <input className="form-control contect-bgColors" id="inputFirstName" type="text" placeholder="Enter your full name" value={username} onChange={(e) => { setUsername(e.target.value) }} />
                      <span class="input-group-text btns-primary border-prime bolder"><i class="bi bi-person"></i></span>
                    </div>
                  </div>
                  <div class="col-md-6 mt-4">
                    <label className="small mb-1 text-white" for="inputEmail">Email</label>
                    <div class="input-group mbs">
                      <input className="form-control contect-bgColors" id="inputEmail" type="email" placeholder="Enter your email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                      <span class="input-group-text btns-primary border-prime" ><i class="bi bi-envelope-open"></i></span>
                    </div>
                  </div>
                  <div class="col-md-6 mt-3">
                    <label className="small mb-1 text-white" for="inputMobile">Mobile</label>
                    <div class="input-group mbs">
                      <input className="form-control contect-bgColors" id="inputMobile" type="tel" placeholder="Enter your number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                      <span class="input-group-text btns-primary border-prime" ><i class="bi bi-telephone"></i></span>
                    </div>
                  </div>

                  <div class="col-md-6 mt-3">
                    <label className="small mb-1 text-white" for="inputExperience">Experience</label>
                    <div class="input-group mbs">
                      <select id="inputState" value={experience} onChange={(e) => setExperience(e.target.value)} class="form-select contect-bgColors selct">
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
                      <span class="input-group-text btns-primary border-prime" ><i class="bi bi-briefcase-fill"></i></span>
                    </div>
                  </div>
                  <div class="col-md-6 mt-3">
                    <label className="small mb-1 text-white" for="inputSpecialization">Specialization</label>
                    <div class="input-group mbs">
                      <select id="inputState" value={specialization} onChange={(e) => setSpecialization(e.target.value)} class="form-select contect-bgColors selct">
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
                      <span class="input-group-text btns-primary border-prime" ><i class="bi bi-person-fill"></i></span>
                    </div>
                  </div>

                  <div class="col-md-6 mt-3">
                    <label className="small mb-1 text-white" for="inputWork">Location</label>
                    <div class="input-group mbs">
                      <input className="form-control contect-bgColors" id="inputWor" type="text" placeholder="Location, country, city, state..." style={{ textTransform: 'capitalize' }} value={location} onChange={(e) => { setLocation(e.target.value) }} />
                      <span class="input-group-text btns-primary border-prime" ><i class="bi bi-geo-alt-fill"></i></span>
                    </div>
                  </div>
                  <div class="col-md-6 mt-3">
                    <label className="small mb-1 text-white" for="inputWork">Work</label>
                    <div class="input-group mbs">
                      <select
                        id="inputState"
                        value={work}
                        onChange={(e) => setWork(e.target.value)}
                        class="form-select contect-bgColors selct"
                      >
                        <option selected>Choose..</option>
                        <option value="Full Day">Full Day</option>
                        <option value="Half Day">Half Day</option>
                      </select>
                      <span class="input-group-text btns-primary border-prime" ><i class="bi bi-person-fill"></i></span>
                    </div>
                  </div>
                  <div class="col-md-6 mt-3">
                    <label className="small mb-1 text-white" for="inputWork">Pictures</label>
                    <div class="input-group mbs">
                      <input type="file" name="file-input" id="file-input" className="contect-bgColors inpu" onChange={(e) => setPicture(e.target.files[0])} />
                      <span class="input-group-text btns-primary border-prime" ><i class="bi bi-card-image"></i></span>
                    </div>
                  </div>

                  <div class="col-md-6 mt-3">
                    <label className="small mb-1 text-white" htmlForfor="inputSpecialization">Password</label>
                    <div class="input-group mbs">
                      <input
                        className="form-control contect-bgColors"
                        id="inputSpecialization" type={showPassword ? 'text' : 'password'}
                        placeholder="Enter Your New Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />

                      <span className="input-group-text btns-primary border-prime" onClick={togglePasswordVisibility}>
                        {showPassword ? <i className="bi bi-eye-slash"></i> : <i className="bi bi-eye"></i>}
                      </span>
                    </div>
                  </div>

                  <div class="col-md-6 mt-3">
                    <label className="small mb-1 text-white" for="inputEducation">Confirm Password</label>
                    <div class="input-group mbs">
                      <input className="form-control contect-bgColors" id="inputEducation" type="password" name="education" placeholder="Re Enter The Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                      <span class="input-group-text btns-primary border-prime" ><i class="bi bi-lock-fill"></i></span>
                    </div>
                  </div>
                  <div class="col-md-12 mt-3">
                    <label for="inputZip" class="form-label text-white">Bio/Profile Summary</label>
                    <textarea class="form-control ed text-primary contect-bgColors" maxLength="250" id="form6Example7" rows="4" placeholder="Write about yourself..." value={bio} onChange={biohaldle}></textarea>
                  </div>

                  <div class="form-check mb-0 mx-2 sgn_form">
                    <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-12 col-12"> <input class="form-check-input me-2 contect-bgColors" type="checkbox" value="" id="form2Example3" required checked />
                    <label class="form-check-label  text-white" for="form2Example3">
                      I agree to the <Link to="/terms_condition" className='text-decoration-none font-color'>Terms & conditions</Link>
                    </label></div> 
                    <div className="col-lg-6 col-md-6 col-sm-12 col-12 d-flex justify-content-end do_have_ac"><p className="small fw-bold  pt-1 mb-0 text-white dont_account">Do you have account? <Link to="/login"
                    className="font-color">Login</Link></p></div>
                    </div>
                  </div>
                  <p className="text-danger fs-5">{error}</p>
                  <div class="col-md-12">
                    <button
                      type="submit"
                      class=" mb-4 w-25 signup border-prime btns-primary  btn-regi"
                      style={{ marginTop: "-20px" }}
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
              <div class="btns-formssec" style={{ marginLeft: "12.5%" }}>
                <button
                  type="button"
                  class="btn-light inputs btn-law border-prime font-color"
                  id="regist1"
                  style={{ marginTop: "10%" }}
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
              <div className="shadow form-container forms-bg  mb-4 w-75 mx-auto p-5" id="form-bk">

                <form class="row g-3 me-4 mx-4 mt-1" onSubmit={handleUserFormSubmit}>
                  <div class="col-md-6">
                    <label className="small mb-1 text-white " for="inputFirstName">Full Name</label>
                    <div class="input-group mbs">
                      <input className="form-control contect-bgColors" id="inputFirstName" type="text" placeholder="Enter your full name" value={name} onChange={(e) => { setName(e.target.value) }} />
                      <span class="input-group-text btns-primary border-prime bolder"><i class="bi bi-person"></i></span>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <label className="small mb-1 text-white" for="inputEmail">Email</label>
                    <div class="input-group mbs">
                      <input className="form-control contect-bgColors" id="inputEmail" type="email" placeholder="Enter your email" value={emails} onChange={(e) => { setEmails(e.target.value) }} />
                      <span class="input-group-text btns-primary border-prime" ><i class="bi bi-envelope-open"></i></span>
                    </div>
                  </div>
                  <div class="col-md-6 mt-4">
                    <label className="small mb-1 text-white" for="inputMobile">Mobile</label>
                    <div class="input-group mbs">
                      <input className="form-control contect-bgColors dm" id="inputMobile" type="tel" placeholder="Enter your number" value={number} onChange={(e) => setNumber(e.target.value)} />
                      <span class="input-group-text btns-primary border-prime" ><i class="bi bi-telephone"></i></span>
                    </div>
                  </div>

                  <div class="col-md-6 mt-4">
                    <label className="small mb-1 text-white" for="inputWork">Location</label>
                    <div class="input-group mbs">
                      <input className="form-control contect-bgColors" id="inputWor" type="text" placeholder="Location, country, city, state..." value={state} onChange={(e) => setState(e.target.value)} />
                      <span class="input-group-text btns-primary border-prime" ><i class="bi bi-geo-alt-fill"></i></span>
                    </div>
                  </div>


                  <div class="col-md-6 mt-4">
                    <label className="small mb-1 text-white" for="inputSpecialization">Password</label>
                    <div class="input-group mbs">
                      <input
                        className="form-control contect-bgColors"
                        id="inputSpecialization"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter Your New Password"
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                      />

                      <span className="input-group-text btns-primary border-prime" onClick={togglePasswordVisibility}>
                        {showPassword ? <i className="bi bi-eye-slash"></i> : <i className="bi bi-eye"></i>}
                      </span>
                    </div>
                  </div>


                  <div class="col-md-6 mt-4">
                    <label className="small mb-1 text-white" for="inputEducation">Confirm Password</label>
                    <div class="input-group mbs">
                      <input className="form-control contect-bgColors" id="inputEducation" type="text" name="education" placeholder="Re Enter Your Password" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} />
                      <span class="input-group-text btns-primary border-prime" ><i class="bi bi-lock-fill"></i></span>
                    </div>
                  </div>
                  <div class="form-check mb-0 mx-2 sgn_form">
                    <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-12 col-12"> <input class="form-check-input me-2 contect-bgColors" type="checkbox" value="" id="form2Example3" required checked />
                    <label class="form-check-label  text-white" for="form2Example3">
                      I agree to the <Link to="/terms_condition" className='text-decoration-none font-color'>Terms & conditions</Link>
                    </label></div> 
                    <div className="col-lg-6 col-md-6 col-sm-12 col-12 d-flex justify-content-end do_have_ac"><p className="small fw-bold  pt-1 mb-0 text-white dont_account">Do you have account? <Link to="/login"
                    className="font-color">Login</Link></p></div>
                    </div>
                  </div>
                  <p className="text-danger fs-5">{errors}</p>
                  <div class="col-md-12 mt-5 ">
                    <button
                      type="submit"
                      class=" mt-2 mb-5 signup border-prime btns-primary w-25 btn-regi"
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
