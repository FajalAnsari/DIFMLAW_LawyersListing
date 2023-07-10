import React, { useState } from 'react';
import { sendPasswordResetEmail} from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';

const ForgetPassword = () => {
    
  const navigate = useNavigate();
  const [error , setError] = useState(null);
  const [email, setEmail] = useState('');

  const handleEmailChange = event => {
    setEmail(event.target.value);
  };


  const handlePasswordReset = event => {
    event.preventDefault();

      sendPasswordResetEmail(auth, email).then(value => navigate('/')).catch((err) =>
      setError(err.message));
    

  };

  return (
    <div className="container">
        <div className="mx-auto mt-5">
        <form>
      <div class="card" style={{width: "600px"}}>
    <div class="card-header h5 font-color ">Password Reset</div>
    <div class="card-body px-5">
        <p class="card-text">
            Enter your email address and we'll send you an email with instructions to reset your password.
        </p>
        <div class="form-outline">
        <label class="form-label" for="typeEmail">Email:</label>
            <input type="email" id="typeEmail"  name="email" 
              value={email}

              onChange={handleEmailChange} placeholder='Enter Your Email' class="form-control my-3" />       
        </div>
        <p className='text-danger fs-6 mt-4'>{error}</p>
        <button  class="btn btns-primary w-100" onClick={handlePasswordReset}>Reset password</button>
        <div class="d-flex justify-content-between mt-4">
            <Link class="text-decoration-none font-color" to="/login">Login</Link>
            <Link class="text-decoration-none font-color" to="/signup">Register</Link>
        </div>
    </div>
</div>
</form>
</div>
    </div>
  )
}

export default ForgetPassword
