import React, { useState } from 'react';
import { sendPasswordResetEmail} from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';

const ForgetPassword = () => {
    
  const navigate = useNavigate();
  const [error , setError] = useState(null);

const handleSubmit = async(e)=>{
    e.preventDefault()
    const emalVal = e.target.email.value;
    sendPasswordResetEmail(auth,emalVal).then(data=>{
        alert("Check your gmail")
        navigate("/login")
    }).catch(err=>{
        setError("User is not found!")
    })
}

  return (
    <div className="container">
        <div className="mx-auto mt-5">
      <div class="card" style={{width: "600px"}}>
    <div class="card-header h5 font-color ">Password Reset</div>
    <div class="card-body px-5">
        <p class="card-text">
            Enter your email address and we'll send you an email with instructions to reset your password.
        </p>
        <form onSubmit={(e)=>handleSubmit(e)}>
        <div class="form-outline">
        <label class="form-label" for="typeEmail">Email:</label>
            <input type="email" id="typeEmail"  name="email" 
              placeholder='Enter Your Email' class="form-control my-3" />       
        </div>
        <p className='text-danger fs-6 mt-4'>{error}</p>
        <button href="#" class="btn btns-primary w-100">Reset password</button>
        </form>
        <div class="d-flex justify-content-between mt-4">
            <Link class="text-decoration-none font-color" to="/login">Login</Link>
            <Link class="text-decoration-none font-color" to="/signup">Register</Link>
        </div>
    </div>
</div>
</div>
    </div>
  )
}

export default ForgetPassword
