import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import "../form/forget.css";

const ForgetPassword = () => {

    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault()
        const emalVal = e.target.email.value;
        sendPasswordResetEmail(auth, emalVal).then(data => {
            alert("Check your gmail")
            navigate("/login")
        }).catch(err => {
            setError("User is not found!")
        })
    }

    return (
        <div className="delete_section" style={{ marginTop: "1px" }}>
            <div className="container">
                <div class="card text-center py-4 deteles">
                    <p class="fs-2 font-color ">Password Reset</p>
                    <div class="card-body px-5">
                        <p class="card-text text-white forgot-p">
                            Enter your email address and we'll send you an email with instructions to reset your password.
                        </p>
                        <form onSubmit={(e) => handleSubmit(e)} className='form-style'>
                            <div class="input-group mbs mt-5">
                                <input className="form-control contect-bgColors dm" id="typeEmail" type="email" name="email" placeholder="Enter your email" />
                                <span class="input-group-text btns-primary border-prime dm" ><i class="bi bi-envelope-open"></i></span>
                            </div>
                            <p className='text-danger fs-6 mt-4'>{error}</p>
                            <button href="#" class="btn btns-primary w-100">Reset password</button>
                        </form>
                        <div class="d-flex justify-content-between regi-group mt-4">
                            <Link class="text-decoration-none font-color" to="/login">Login</Link>
                            <Link class="text-decoration-none font-color regi-text" to="/signup">Register</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgetPassword
