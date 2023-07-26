import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "../Hero/Category.css";

const Contect_now = () => {
 
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const baseUrl = "http://localhost:8000";

  const sendEmail = async () => {
    let dataSend = {
      email: email,
      message: message,
    };

    const res = await fetch(`${baseUrl}/email/sendEmail`, {
      method: "POST",
      body: JSON.stringify(dataSend),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      // HANDLING ERRORS
      .then((res) => {
        console.log(res);
        if (res.status > 199 && res.status < 300) {
          alert("Send Successfully !");
        }
      });
  };

  
  return (
    <>

     <div class="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content border border-prime border-3" >
      <div class="modal-header">
        <h4 class="modal-title mx-5" id="exampleModalToggleLabel">Contact Now For Our Suggestion </h4>
      </div>
      <div className='container'>
      <div class="mb-3 mt-4">
  <label for="exampleFormControlInput1" class="form-label">Enter Email</label>
  <input type="email" class="form-control" id="email" placeholder="Enter your email"  onChange={(e) => setEmail(e.target.value)}/>
</div>
<div class="mb-3">
  <label for="exampleFormControlTextarea1" class="form-label">Write your message</label>
  <textarea class="form-control" placeholder='Write your message' id="messages" rows="3"  onChange={(e) => setMessage(e.target.value)}
></textarea>
</div>
</div>
      <div class="mx-auto mb-4">
        <button class="btn btns-primary" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal" data-bs-dismiss="modal" onClick={() => sendEmail()}>Submit</button>
      </div>
    </div>
  </div>
</div>
<div class="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content border border-prime border-3">
      <h5 class=" text-center mt-4">
      Thank you for contacting us we’ll get back to you shortly with some awesome lawyers.
      </h5>
      <a href='/' class="mx-auto mb-4 text-decoration-none mt-4">
        <button class="btn btns-primary" data-bs-target="#exampleModalToggle" data-bs-toggle="modal" data-bs-dismiss="modal">Back to Home</button>
      </a>
    </div>
  </div>
</div>


<div className="row want suggestion shadow w-50 mx-auto" style={{borderRadius: "40px"}}>
            <div className="col-lg-6 text-center col-xs-6">
              <p className="fs-1 fw-bold text-white">
                Want{" "}
                <span id="suggest" className="sugg font-color">
                  Our Suggestions
                </span>{" "}
                <span id="ques" className="sugg">
                  <b>?</b>
                </span>
              </p>
            </div>
            <div className="col-lg-6 text-center col-xs-6">
              <a className="btn btns-primary cont mt-3 w-75 h-50 p-2" data-bs-toggle="modal" href="#exampleModalToggle" role="button">
                Contact Now
              </a>
            </div>
          </div>
    </>
  )
}

export default Contect_now
