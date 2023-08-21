import React, { useEffect, useState } from "react";
import { lawyer_pics } from "../../images";
import { Link, Navigate } from "react-router-dom";
import "./Lawyers_profile_card.css";
import All_lawyers_card from "./All_lawyer_card/All_lawyers_card";
import Lawyers_personal_information from "../Lawyers_personal_information/Lawyers_personal_information";
import Expertise_and_services from "../Expertise_and_service/Expertise_and_services";
import { db, useFirebase } from "../../../firebase";
import { useParams } from "react-router-dom";
import Add_Comment from "../Add_review/Add_Comment";
import Add_review from "../Add_review/Add_review";
import User_contact_form from "./All_lawyer_card/User_contact_form";
import User_message from "./All_lawyer_card/User_message";
import { auth } from "../../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const Lawyers_profile_card = () => {
  const [userRole, setUserRole] = useState(null);
  const [rating,setRating] = useState([]);
  const [user] = useAuthState(auth); 
   // check login as a user or lawyer
   const loginUserORLawyer = async () => {
    if(user){
      const q = query(collection(db, "lawyers"), where("uid", "==", user.uid));
      const q1 = query(collection(db, "users"), where("uid", "==", user.uid));
  
  
      const docs = await getDocs(q);
      const info = await getDocs(q1)
     
      // lawyer auth
      if (docs.empty) {
        console.log("No matching documents.");
      } else {
        docs.forEach((doc) => {
          const data = doc.data();
          console.log(data);
          console.log("lawyer login");
          setUserRole("lawyer");
         
        });
      }
      // user auth
      if (info.empty) {
        console.log("No matching documents.");
      } else {
        info.forEach((doc) => {
          const data = doc.data();
          console.log(data);
          console.log("user login");
          setUserRole("user");
       
        });
      }
  
    }
    // else {
    //   Navigate('/');
    // }
  }


  // getting current user uid
  function GetLawyerUid() {
    const [uid, setUid] = useState(null);
    useEffect(() => {
      auth.onAuthStateChanged(user => {
        if (user) {
          setUid(user.uid);
        }
      })
    }, [])
    return uid;
  }

  const uids = GetLawyerUid();

  loginUserORLawyer();
  
  const params = useParams();
  const firebase = useFirebase();

  const [data, setData] = useState("");
  console.log(params);
  console.log(data);

  useEffect(() => {
    firebase.getUsersId(params.lawId).then((value) => setData(value.data()));
    ratings();
  }, []);

  const handleCopyPath = () => {
    const path = window.location.href;
    navigator.clipboard.writeText(path);
    alert('URL path copied to clipboard!');
  }
  


const ratings = async() => {
// Fetch all lawyer documents
const specificLawyerId = params.lawId; // Replace this with the lawyerId you want to fetch data for

const lawyersCollectionRef = collection(db, "lawyers");
const querySnapshot = await getDocs(lawyersCollectionRef);

// Calculate average user rating for the specific lawyer
let specificLawyerRating = 0; // Default value if lawyer not found
querySnapshot.forEach((doc) => {
  const lawyerData = doc.data();
  const ratings = lawyerData.ratings;

  if (doc.id === specificLawyerId && ratings) { // Check if lawyerId matches and ratings is not undefined or null
    const sumRatings = Object.keys(ratings).reduce((sum, rating) => {
      return sum + rating * ratings[rating];
    }, 0);

    const totalRatings = Object.values(ratings).reduce((total, count) => {
      return total + count;
    }, 0);

    specificLawyerRating = totalRatings === 0 ? 0 : sumRatings / totalRatings;
  }
});

setRating(specificLawyerRating.toFixed(2));
console.log("Average User Rating for Specific Lawyer:", specificLawyerRating.toFixed(2));

}
  
  return (
   
    <div className="container" style={{marginTop:"80px"}}>
      <div className="row">
        {/* lawyer profile card start */}
        <div className="col-lg-8 p-5 ">
          <div className="row law ab d-flex border border-prime rounded justify-content-around p-4" style={{backgroundColor: "var(--second-secondary)"}}>
            <div className="col-lg-6">
              <div className="row ab">
                <div className="col-lg-6 col-xs-12 d-flex justify-content-around">
                  <img src={data.image} className="lprocls" alt="lawyer_profile"></img>
                </div>
                <div className="col-lg-6 col-xs-12">
                  <p className="fs-5 fw-bold mb-2">{data.username}</p>
                  <p className="fs-6 mb-2 laywer_city">{data.address || "N/A"}</p>
                  <p className="fs-6 laywer_exp fw-bold">
                  {data.experience || "N/A"} 
                  </p>
                  <div style={{marginTop:"-20px"}}>
                  {[...Array(5)].map((star, index) => (
        <p key={index} className="fw-bold fs-6" style={{display:'inline'}}>
          <i className={rating > index + 1 ? 'bi bi-star-fill' : rating > index + 0.5 ? 'bi bi-star-half' : 'bi bi-star'} style={{ color: '#D1B06B'}}></i>
        </p>
      ))}
      </div>

      
                </div>
              </div>
            </div>
            <div className="col-lg-6 text-end d-flex justify-content-end gap-2">
              <div className="me-4 w-50">
               <Link to="/contect_us"><button className="btn btns-primary me-4 w-100 rounded-pill mt-5">
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

          <Expertise_and_services experience={data.experience} Bio={data.summary} rating={rating} cat={data.specialization}/>
          {/* expertise and services end */}

        {/* review start */}
        < Add_review id={data.uid} nid={params.lawId}/>
        <Add_Comment />
        {/* review end */}

        </div>
        {/* lawyer profile card end */}

        <div className="col-lg-4 mt-3">
          {/* photos */}
          <h4 className="font-color">Photos</h4>
          <div className="row">
           
          {data.photos && data.photos.length > 0 ? (
    // If data.photos array has image URLs, display the images
    data.photos.map((photoUrl, index) => (
      <div className="col-lg-6 col-6" key={index}>
        <img style={{ width: '108%' }} src={photoUrl} alt={`lawyer_pic_${index}`} />
      </div>
    ))
  ) : (
    // If data.photos array is empty, display the default lawyer picture
    <>
      <div className="col-lg-6 col-6">
        <img src={lawyer_pics} alt="default_lawyer_pic" />
      </div>
      <div className="col-lg-6 col-6">
        <img src={lawyer_pics} alt="default_lawyer_pic" />
      </div>
    </>
  )}
          </div>
          {/* photos */}

          {/* our location */}
          <h4 className="mt-3 font-color">Our Location</h4>

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
          <h4 className="mt-3 font-color">Refer to a friend</h4>
          <span class="mt-5">
            <button class="btn btn-dark btn-flat p-1 me-5 px-2 btn-primary pk-1 ficon">
              <i class="bi bi-facebook"></i>
            </button>
            <button class="btn btn-dark btn-flat p-1 me-5 px-2 btn-primary pk-1 ficon">
              <i class="bi bi-linkedin"></i>
            </button>
            <button class="btn btn-dark btn-flat p-1 me-5 px-2 btn-primary pk-1 ficon">
              <i class="bi bi-twitter"></i>
            </button>
            <button class="btn btn-dark btn-flat p-1 px-2 btn-primary pk-1 ficon">
              <i class="bi bi-envelope-fill"></i>
            </button>
          </span>
          {/* refer to a friend social media icons*/}

          {/* job url link */}
          <h5 className="mt-4 font-color">Copy job URL link</h5>
          <div class="input-group mt-2">
            <div class="form-outline">
              <input
                type="search"
                value={window.location.href}
                class="form-control ss-2 w-100"
              />
            </div>
            <button type="button" class="btn btns-primary s-1" onClick={handleCopyPath}>
              Copy link
            </button>
          </div>
          {/* job url link */}

         {/* this contect form for laywer start */}
           {userRole == "user" &&
       <User_contact_form lawyer_id={data.uid} lawyer_email={data.email} lawyer_profile={data.image} lawyer_name={data.username} />
      }
      {userRole == "lawyer" &&
       <User_message />
      }
         {/* this contect form for laywer end */}

         {/* all lawyers card */}
         <div className="row mt-4 law p-2 border border-prime rounded review">
          <h4 className="font-color">Top Lawyers</h4>
           <All_lawyers_card />
           </div>
         {/* all lawyers card */}
        </div>
      </div>
    </div>
  );
};

export default Lawyers_profile_card;
