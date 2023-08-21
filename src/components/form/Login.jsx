import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import loginimg from "../images/Difm_Login_Image.svg";
import { useFirebase } from '../../firebase';

const Login = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  };


  const handleEmailChange = event => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };

  useEffect(() => {
 
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    const rememberedPassword = localStorage.getItem("rememberedPassword");
    if (rememberedEmail && rememberedPassword) {
      setEmail(rememberedEmail);
      setPassword(rememberedPassword);
      setRememberMe(true);
    }
  }, []);

  const handleFormSubmit = (event) => {
    event.preventDefault();
  
    // Check if a user is already authenticated
    if (auth.currentUser) {
      setError("Another user is already logged in. Please log out the current user first.");
      return;
    }
  
    if (!email || !password) {
      setError("Please fill in all fields!");
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((value) => {
          // Save credentials to local storage if "Remember Me" is checked
          if (rememberMe) {
            localStorage.setItem("rememberedEmail", email);
            localStorage.setItem("rememberedPassword", password);
          } else {
            localStorage.removeItem("rememberedEmail");
            localStorage.removeItem("rememberedPassword");
          }
          setLoggedInUser(email); // Set the logged-in user
          navigate("/");
        })
        .catch((error) => {
          if (error.code === 'auth/user-not-found') {
            setError('Invalid email address. Please enter a valid email.');
          } else if (error.code === 'auth/wrong-password') {
            setError('Invalid password. Please enter the correct password.');
          } else {
            setError('An error occurred. Please try again later.');
          }
        });
    }
  };


  useEffect(() => {
    if (firebase.isLoggedIn) {
      // navigate to home
      navigate("/");
    }
    
  }, [firebase, navigate]);



  return (
    <>
      <section className="vh-50 form-control login_page_section p-5 mb-5 w-50 mx-auto forms-bg fom-bg border-prime" style={{ marginTop: "140px" }}>
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100 ll">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <div className='login_page_image'>
                <img src={loginimg}
                  className="img-fluid" alt="Sample image" />
              </div>
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form onSubmit={handleFormSubmit}>

                <div className="form-outline mb-4">
                  <label className="form-label font-color" for="form3Example3">Email address</label>
                  <div className="input-group mbs">
                    <input className="form-control contect-bgColors" id="inputEmail" type="email" placeholder="Enter your email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                    <span className="input-group-text btns-primary border-prime" ><i className="bi bi-envelope-open"></i></span>
                  </div>
                </div>


                <div className="form-outline mb-3">
                  <label className="form-label font-color" htmlFor="form3Example4">Password</label>
                  <div className="input-group mbs">
                    <input
                      className="form-control contect-bgColors"
                      id="inputSpecialization"
                      type={showPassword ? 'text' : 'password'} // Use showPassword state to toggle between 'text' and 'password'
                      placeholder="Enter your password"
                      value={password}
                      onChange={handlePasswordChange}
                      required
                    />
                    <span className="input-group-text btns-primary border-prime" onClick={togglePasswordVisibility}>
                      {showPassword ? <i className="bi bi-eye-slash"></i> : <i className="bi bi-eye"></i>}
                    </span>
                  </div>
                </div>

                <p className='text-danger fs-6 mt-4'>{error}</p>
                <div className="d-flex justify-content-between align-items-center">

                  <div className="form-check mb-0">
                    <input
                      className="form-check-input me-2"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={handleRememberMeChange}
                      id="form2Example3"
                    />
                    <label className="form-check-label text-white" htmlFor="form2Example3">
                      Remember me
                    </label>
                  </div>

                  <Link to="/login/forget_password" className="text-body font-color">Forgot password?</Link>
                </div>

                <div className="text-center text-lg-start mt-4 pt-2">
                  <button className="btn btns-primary btn-lg"
                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }} >Login</button>
                  <p className="small fw-bold mt-2 pt-1 mb-0 text-white dont_account">Don't have an account? <Link to="/signup"
                    className="font-color">Register</Link></p>
                </div>
              </form>
            </div>
          </div>
        </div>

      </section>
    </>
  )
}

export default Login;

