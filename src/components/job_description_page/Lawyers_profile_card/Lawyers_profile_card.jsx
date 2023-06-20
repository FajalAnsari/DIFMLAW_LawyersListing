import React, { useEffect, useState } from "react";
import { lawyer_pics } from "../../images";
import { Link } from "react-router-dom";
import "./Lawyers_profile_card.css";
import All_lawyers_card from "./All_lawyer_card/All_lawyers_card";
import Lawyers_personal_information from "../Lawyers_personal_information/Lawyers_personal_information";
import Expertise_and_services from "../Expertise_and_service/Expertise_and_services";
import { useFirebase } from "../../../firebase";
import { useParams } from "react-router-dom";

const Lawyers_profile_card = () => {
  
  const params = useParams();
  const firebase = useFirebase();

  const [data, setData] = useState("");
  console.log(params);
  console.log(data);

  useEffect(() => {
    firebase.getUsersId(params.lawId).then((value) => setData(value.data()));
  }, []);

 
  
  return (
   
    <div className="container">
      <div className="row">
        {/* lawyer profile card start */}
        <div className="col-lg-8 p-5 ">
          <div className="row law ab d-flex border border-primary rounded justify-content-around p-4">
            <div className="col-lg-6">
              <div className="row ab">
 
                <div className="col-lg-6 col-xs-12 d-flex justify-content-around">
                  <img src={data.image} className="lprocls"></img>
                </div>
                <div className="col-lg-6 col-xs-12">
                  <p className="fs-5 fw-bold mb-2">{data.username}</p>
                  <p className="fs-6 mb-2 laywer_city">{data.address}</p>
                  <p className="fs-6 laywer_exp fw-bold">
                  {data.experience} in practice
                  </p>
                  <p className="fw-bold mb-2 star fs-5">*****</p>
                </div>
              </div>
            </div>
            <div className="col-lg-6 text-end d-flex justify-content-end gap-2">
              <div className="me-4 w-50">
               <Link to="/contect_us"><button className="btn btn-primary me-4 w-100 rounded-pill mt-5">
                  Contact Now
                </button>
                </Link> 
              </div>
              <div>
                <span className="fw-bold fs-3">
                  <i class="bi bi-bookmark"></i>
                </span>
                <p className="fs-6 save text-center">save</p>
              </div>
            </div>
          </div>

          {/* lawyer personal information card start */}
          <Lawyers_personal_information Phone={data.number} Email={data.email} Work={data.work} Address={data.address}/>
          {/* lawyer personal information card end */}

          {/* expertise and services start */}

          <Expertise_and_services experience={data.experience}/>
          {/* expertise and services end */}
        </div>
        {/* lawyer profile card end */}

        <div className="col-lg-4 mt-3">
          {/* photos */}
          <h4>Photos</h4>
          <div className="row">
            <div className="col-lg-6 col-6">
              <img src={lawyer_pics}></img>
            </div>
            <div className="col-lg-6 col-6">
              <img src={lawyer_pics}></img>
            </div>
          </div>
          {/* photos */}

          {/* our location */}
          <h4 className="mt-3">Our Location</h4>

          <div className="md:w-1/2">
            {/* Map */}
            <div className="mt-2">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1.771070944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5335fabc2a66677f%3A0x8f85bd068d1afb8a!2s30%20N%20Gould%20St%2C%20Sheridan%2C%20WY%2082801%2C%20USA!5e0!3m2!1sen!2sin!4v1684734636299!5m2!1sen!2sin"
                width="100%"
                height="170"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                className="rounded-[20px]  sm:h-[500px] -mt-4 w-[320px]  -ml-10 sm:ml-0 sm:w-full"
              ></iframe>
            </div>
          </div>

          {/* our location */}

          {/* refer to a friend social media icons*/}
          <h4 className="mt-3">Refer to a friend</h4>
          <span class="mt-5">
            <button class="btn btn-dark btn-flat p-1 me-5 px-2 btn-primary">
              <i class="bi bi-facebook"></i>
            </button>
            <button class="btn btn-dark btn-flat p-1 me-5 px-2 btn-primary">
              <i class="bi bi-linkedin"></i>
            </button>
            <button class="btn btn-dark btn-flat p-1 me-5 px-2 btn-primary">
              <i class="bi bi-twitter"></i>
            </button>
            <button class="btn btn-dark btn-flat p-1 px-2 btn-primary">
              <i class="bi bi-envelope-fill"></i>
            </button>
          </span>
          {/* refer to a friend social media icons*/}

          {/* job url link */}
          <h5 className="mt-4">Copy job URL link</h5>
          <div class="input-group mt-2">
            <div class="form-outline">
              <input
                type="search"
                value="https://www.kreate.com/job-apply-325..."
                class="form-control ss-2 w-100"
              />
            </div>
            <button type="button" class="btn btn-primary s-1">
              Copy link
            </button>
          </div>
          {/* job url link */}
         {/* all lawyers card */}
         <div className="row mt-4 law p-2 border border-primary rounded">
          <h4>Top Lawyers</h4>
           <All_lawyers_card />
           </div>
         {/* all lawyers card */}
        </div>
      </div>
    </div>
  );
};

export default Lawyers_profile_card;
