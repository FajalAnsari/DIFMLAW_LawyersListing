import React from 'react'
import "./Contect_us.css";
import Testimonial from '../Testimonial/Testimonial';
import { Link } from 'react-router-dom';
import Contect_sugg from "../About_page/Contect_sugg";

const Contect_us = () => {
  return (
    <>
    <div className="container">
    <div className="row mt-5">
        <div className="col-md-6 mt-5">
        <h2 className='font-color'>Get In Tauch</h2>
        <p className='fs-5 w-75 text-white' style={{textAlign: "justify"}}>If you have any questions or comments about our difmlaw, please do not hesitate to contact us. Our team of dedicated professionals is available to assist you with any inquiries you may have.</p>
        <span class="mt-4 ">
            <button class="btn btn-white btn-flat pk-1 me-2 px-2 ficon">
            <i class="bi bi-facebook"></i>
            </button>
            <button class="btn btn-white btn-flat pk-1 me-2 px-2 ficon">
            <i class="bi bi-linkedin"></i>
            </button>
            <button class="btn btn-white btn-flat pk-1 me-2 px-2 ficon">
            <i class="bi bi-twitter"></i>
            </button>
            <button class="btn btn-white btn-flat pk-1 px-2 ficon">
            <i class="bi bi-envelope-fill"></i>
            </button>
          </span>
        </div>

        <div className="col-md-6 border border-prime rounded forms" style={{backgroundColor: "var(--fourth-primary)"}}>
        <form
            class="row g-3 me-4 mx-4 mt-4"
            // onSubmit={handleLawyerFormSubmit}
          >
            <div class="col-md-6">
              <label for="inputEmail4" class="form-label font-color">
                Enter Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                class="form-control contect-bgColors"
                id="inputEmail4"
                // value={username}
                // onChange={handleUsernameChange}
              />
            </div>
            <div class="col-md-6">
              <label for="inputPassword4" class="form-label  font-color">
                Enter Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                class="form-control contect-bgColors"
                id="inputPassword4"
                // value={email}
                // onChange={handleEmailChange}
              />
            </div>
            <div class="col-md-6">
              <label for="inputPassword4" class="form-label  font-color">
                Phone No.
              </label>
              <input
                type="number"
                placeholder="Enter your number"
                class="form-control contect-bgColors"
                id="inputPassword4"
                // value={phone}
                // onChange={handlePhoneChange}
              />
            </div>
            <div class="col-md-6">
              <label for="inputState" class="form-label  font-color">
                Subject
              </label>
              <select
                id="inputState"
                // value={work}
                // onChange={handleWorkChange}
                class="form-select contect-bgColors"
              >
                <option selected>Choose Subject..</option>
                <option value="Full Day">Full Day</option>
                <option value="Half Day">Half Day</option>
              </select>
            </div>
            <div class="col-md-12">
              <label for="inputZip" class="form-label  font-color">
                Bio/Profile Summary
              </label>
              <textarea
                class="form-control contect-bgColors"
                placeholder="Write about yourself..."
                id="form6Example7"
                rows="4"
                // value={bio}
                // onChange={handleBioChange}
              ></textarea>
            </div>

            <div class="form-check mb-0 mx-2">
              <input class="form-check-input me-2 contect-bgColors" type="checkbox" value="" id="form2Example3"/>
              <label class="form-check-label  text-white" for="form2Example3">
              I agree to the <Link to="/terms_condition" className='text-decoration-none font-color'>Terms & conditions</Link>
              </label>
            </div>
            {/* <p className="text-danger fs-5">{error}</p> */}
            <div class="col-md-12 mb-4 ">
              <button
                type="submit"
                class="btn btns-primary form-control mt-2 mb-5 signup"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* second row section */}
      <div className="row mt-5 mb-5">
        <div className="col-md-6">
        <h2 className='font-color'>Contact Us</h2>
        <p className='fs-5 w-75 text-white' style={{textAlign: "justify"}}>We're here to help! Please feel free to reach out to us with any questions or concerns you may have.</p>
        <h4 className='mt-4 font-color'>Email</h4>
        <p className='text-white fs-6'>info@difmlaw.com</p>

        <h4 className='mt-4 font-color'>Phone</h4>
        <p className='text-white fs-6'>Contact@difmlaw.com</p>

        <h4 className='mt-4 font-color'>Headquarters</h4>
        <p className='text-white fs-6'>30 N Gould St, Sheridan, WY 82801, United States</p>

        <a href="" className='mt-4 text-decoration-none text-white'>Get Direction <i class="bi bi-arrow-right font-color"></i></a>
        </div>

        <div className="col-md-6 ">
        <iframe
                src="https://www.google.com/maps/embed?pb=!1.771070944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5335fabc2a66677f%3A0x8f85bd068d1afb8a!2s30%20N%20Gould%20St%2C%20Sheridan%2C%20WY%2082801%2C%20USA!5e0!3m2!1sen!2sin!4v1684734636299!5m2!1sen!2sin"
                width="100%"
               
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                className="h-100 border border-primary"
              ></iframe>
        </div>
      </div>
      <div className="sugg_contects4">
    <Contect_sugg />
    </div>
    </div>  
    <Testimonial />
    </>
  )
}

export default Contect_us
