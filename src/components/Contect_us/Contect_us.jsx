import React, { useState } from 'react'
import "./Contect_us.css";
import Testimonial from '../Testimonial/Testimonial';
import { Link } from 'react-router-dom';
import Contect_Sugg from "../About_page/Contect_sugg";

const Contect_us = () => {
 
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [username, setUsername] = useState("");
  
    const baseUrl = "http://localhost:8000";
  
    const sendEmail = async () => {
      let dataSend = {
        email: email,
        username: username,
        message: message,
      };
  
      const res = await fetch(`${baseUrl}/emails/sendEmails`, {
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
    <div className="container"  style={{marginTop:"120px"}}>
    <div className="row mt-5">
        <div className="col-md-6 mt-5 contact_form_users_lawyer">
        <h2 className='font-color'>Get In Touch</h2>
        <p className='fs-5 w-75 text-white' style={{textAlign: "justify"}}>If you have any questions or comments about our difmlaw, please do not hesitate to contact us. Our team of dedicated professionals is available to assist you with any inquiries you may have.</p>
        <div className="mt-4 all_social">
            <button className="btn btn-white btn-flat pk-1 me-2 px-2 ficon">
            <i className="bi bi-facebook"></i>
            </button>
            <button className="btn btn-white btn-flat pk-1 me-2 px-2 ficon">
            <i className="bi bi-linkedin"></i>
            </button>
            <button className="btn btn-white btn-flat pk-1 me-2 px-2 ficon">
            <i className="bi bi-twitter"></i>
            </button>
            <button className="btn btn-white btn-flat pk-1 px-2 ficon">
            <i className="bi bi-envelope-fill"></i>
            </button>
          </div>
        </div>

        <div className="col-md-6 border border-prime rounded forms" style={{backgroundColor: "var(--fourth-primary)"}}>
        <form
            className="row g-3 me-4 mx-4 mt-4"
            // onSubmit={handleLawyerFormSubmit}
          >
            <div className="col-md-6">
              <label for="inputEmail4" className="form-label font-color">
                Enter Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="form-control contect-bgColors"
                id="inputEmail4"
                // value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label for="inputPassword4" className="form-label  font-color">
                Enter Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="form-control contect-bgColors"
                id="inputPassword4"
                // value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
      
           
            <div class="col-md-12">
              <label for="inputZip" class="form-label  font-color">
                Message
              </label>
              <textarea
                className="form-control contect-bgColors"
                placeholder="Write about yourself..."
                id="form6Example7"
                rows="4"
                // value={bio}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>

            <div className="form-check mb-0 mx-2">
              <input className="form-check-input me-2 contect-bgColors" type="checkbox" value="" id="form2Example3"/>
              <label className="form-check-label  text-white" for="form2Example3">
              I agree to the <Link to="/terms_condition" className='text-decoration-none font-color'>Terms & conditions</Link>
              </label>
            </div>
            {/* <p className="text-danger fs-5">{error}</p> */}
            <div className="col-md-12 mb-4 ">
              <button
                type="submit"
                className="btn btns-primary form-control mt-2 mb-5 signup"
                onClick={() => sendEmail()}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* second row section */}
      <div className="row mt-5 mb-5 contact_us_section_second">
 

       <div className="col-md-6">
        <h2 className='font-color'>Contact Us</h2>
        <p className='fs-5 w-75 text-white' style={{textAlign: "justify"}}>We're here to help! Please feel free to reach out to us with any questions or concerns you may have.</p>
        <div className='contact_email'>
        <h4 className='mt-4 font-color'>Email:</h4>
        <p className='text-white fs-6'>info@difmlaw.com</p>
        </div>
        <div className='contact_email'>
        <h4 className='mt-4 font-color'>Phone:</h4>
        <p className='text-white fs-6'>Contact@difmlaw.com</p>
        </div>
        <div className='contact_email contact_add'>
        <h4 className='mt-4 font-color headquarter'>Headquarters:</h4>
        <p className='text-white fs-6 address'>30 N Gould St, Sheridan, WY 82801, United States</p>
        </div>
        <a href="" className='mt-4 text-decoration-none text-white'>Get Direction <i className="bi bi-arrow-right font-color"></i></a>
        </div> 

        <div className="col-md-6 ">
        <iframe
                src="https://www.google.com/maps/embed?pb=!1.771070944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5335fabc2a66677f%3A0x8f85bd068d1afb8a!2s30%20N%20Gould%20St%2C%20Sheridan%2C%20WY%2082801%2C%20USA!5e0!3m2!1sen!2sin!4v1684734636299!5m2!1sen!2sin"
                width="104%"
                allowFullScreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                className="h-100 border border-prime rounded border-2"
                style={{marginLeft:"-11px"}}
              ></iframe>
        </div>
      </div>
      <div className="sugg_contects4" style={{marginTop:"170px"}}>
    <Contect_Sugg />
    </div>
    </div>  
    <Testimonial />
    </>
  )
}

export default Contect_us
