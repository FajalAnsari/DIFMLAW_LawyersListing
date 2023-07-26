import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import loginimg from "../images/Difm_Login_Image.svg";

const Login = () => {

  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);


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
    // Write logic to submit the form data to the server
    if (!email || !password) {
      setError("Please Fill the all field!");
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((value) => {
          // Save credentials to local storage if "Remember Me" is checked
          if (rememberMe) {
            localStorage.setItem("rememberedEmail", email);
            localStorage.setItem("rememberedPassword", password);
          } else {
            // Clear credentials from local storage if "Remember Me" is not checked
            localStorage.removeItem("rememberedEmail");
            localStorage.removeItem("rememberedPassword");
          }
          navigate("/");
        })
        .catch((err) => setError(err.message));
    }
  };
  

  return (
    <>
      <section className="vh-50 form-control p-5 mb-5 w-50 mx-auto forms-bg fom-bg border-prime" style={{ marginTop: "140px" }}>
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
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
                    <input className="form-control contect-bgColors dm" id="inputEmail" type="email" placeholder="Enter your email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                    <span className="input-group-text btns-primary border-prime dm" ><i className="bi bi-envelope-open"></i></span>
                  </div>
                </div>


                <div className="form-outline mb-3">
                  <label className="form-label font-color" for="form3Example4">Password</label>
                  <div className="input-group mbs">
                    <input className="form-control contect-bgColors" id="inputSpecialization" type="password" placeholder="Enter your password" value={password} onChange={handlePasswordChange} required />
                    <span className="input-group-text btns-primary border-prime dm" ><i className="bi bi-lock-fill"></i></span>
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
                  <p className="small fw-bold mt-2 pt-1 mb-0 text-white">Don't have an account? <Link to="/signup"
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

