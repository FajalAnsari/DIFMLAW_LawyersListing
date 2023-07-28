import React, { useState } from 'react';
import "../Hero/Category.css";

const Contect_now = () => {

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const baseUrl = "http://localhost:8000";

  const sendEmail = async () => {
    if (message.trim() === '' || email.trim() === '') {
      alert('Please fill in all fields!');
    } else {
      alert("form submit");
   
        setSubmitted(true);
     
     
      // let dataSend = {
      //   email: email,
      //   message: message,
      // };
  
      // const res = await fetch(`${baseUrl}/email/sendEmail`, {
      //   method: "POST",
      //   body: JSON.stringify(dataSend),
      //   headers: {
      //     Accept: "application/json",
      //     "Content-Type": "application/json",
      //   },
      // })
      //   // HANDLING ERRORS
      //   .then((res) => {
      //     console.log(res);
      //     if (res.status > 199 && res.status < 300) {
      //       setSubmitted(true);
      //       alert("Send Successfully !");
      //     }
      //   });
    }
 
  };







  return (
    <>

      <div className="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border border-prime border-3" >
            <div className="modal-header">
              <h4 className="modal-title" id="exampleModalToggleLabel">Contact Now For Our Suggestion </h4>
              <span><button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></span>
            </div>
            <div className='container'>
              <div className="mb-3 mt-4">
                <label for="exampleFormControlInput1" className="form-label">Enter Email</label>
                <input type="email" className="form-control" id="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="mb-3">
                <label for="exampleFormControlTextarea1" className="form-label">Write your message</label>
                <textarea className="form-control" placeholder='Write your message' id="messages" rows="3" onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className="mx-auto mb-4">
              <button className="btn btns-primary"  data-bs-target={!submitted ? '#exampleModalToggle' : '#exampleModalToggle2'} data-bs-toggle="modal" data-bs-dismiss="modal" onClick={() => sendEmail()}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    
      <div className="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabindex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border border-prime border-3">
            <h5 className=" text-center mt-4">
              Thank you for contacting us we’ll get back to you shortly with some awesome lawyers.
            </h5>
            <div className="mx-auto mb-4 text-decoration-none mt-4">
            <button type="button"  className='btn btns-primary' data-bs-dismiss="modal">Back to home</button>
            </div>
          </div>
        </div>
      </div>


      <div className="row want suggestion shadow w-50 mx-auto" style={{ borderRadius: "40px" }}>
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
       {/* <div>
      {submitted ? (
        <div>
          <h2>Thank You!</h2>
          <p>Form submitted successfully.</p>
          <button onClick={handleReset}>Submit Another Form</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      )}
    </div> */}
    </>
  )
}

export default Contect_now
