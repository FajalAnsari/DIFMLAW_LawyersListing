import React, { useState } from 'react';
import { signInWithEmailAndPassword} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';

const Login = () => {

  const navigate = useNavigate();
  const [error , setError] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = event => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    // Write logic to submit the form data to the server
    if(!email || !password){
      setError("Please Fill the all field!");
    }else {
      signInWithEmailAndPassword(auth, email, password).then(value => navigate('/')).catch((err) =>
      setError(err.message));
    } 

  };

  return (
    <>
    <div className="container">
    <section class="vh-50 form-control p-5 mt-5">
  <div class="container-fluid h-custom">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-md-9 col-lg-6 col-xl-5">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          class="img-fluid" alt="Sample image"/>
      </div>
      <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
        <form onSubmit={handleFormSubmit}>
        
          <div class="form-outline mb-4">
          <label class="form-label" for="form3Example3">Email address</label>
            <input type="email" id="form3Example3" class="form-control form-control-lg"
              placeholder="Enter a valid email address"   
              name="email" 
              value={email}
              onChange={handleEmailChange} required/>            
          </div>

       
          <div class="form-outline mb-3">
          <label class="form-label" for="form3Example4">Password</label>
            <input type="password" id="form3Example4" class="form-control form-control-lg"
              placeholder="Enter Password" 
              name="password" 
              value={password}
              onChange={handlePasswordChange} required/>          
          </div>
          <p className='text-danger fs-6 mt-4'>{error}</p>
          <div class="d-flex justify-content-between align-items-center">

            <div class="form-check mb-0">
              <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3"/>
              <label class="form-check-label" for="form2Example3">
                Remember me
              </label>
            </div>
            <a href="#!" class="text-body">Forgot password?</a>
          </div>

          <div class="text-center text-lg-start mt-4 pt-2">
            <button  class="btn btn-primary btn-lg"
              style={{paddingLeft: "2.5rem", paddingRight: "2.5rem"}} >Login</button>
            <p class="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="/signup"
                class="link-danger">Register</a></p>
          </div>

        </form>
      </div>
    </div>
  </div>
 
</section>
  </div>
        </>
  )
}

export default Login

