import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import "./Lawyerscards.css";
import "../images/DIFM_LAW_bgcolor_mobile.jpg"

const Lawyerscards = () => {
  const navigate = useNavigate();
  const [limit] = useState(8);
  // const [rate, setrate] = useState("");
  const [allLawyersRatings, setAllLawyersRatings] = useState({});
  const [lawyers, setLawyers] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add isLoading state
  const fetchPost = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'lawyers'));
      const lawyersData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

      const lawyersWithRatings = lawyersData.map((lawyer) => {
        const ratings = lawyer.ratings;

        if (ratings) {
          const sumRatings = Object.keys(ratings).reduce((sum, rating) => {
            return sum + parseFloat(rating) * ratings[rating];
          }, 0);

          const totalRatings = Object.values(ratings).reduce((total, count) => {
            return total + count;
          }, 0);

          const averageRating = totalRatings === 0 ? 0 : sumRatings / totalRatings;

          return {
            ...lawyer,
            averageRating: averageRating.toFixed(2),
          };
        }

        return lawyer;
      });

      // Calculate and store ratings for all lawyers in an object
      const allLawyersRatings = lawyersWithRatings.reduce((ratingsObj, lawyer) => {
        ratingsObj[lawyer.id] = lawyer.averageRating;
        return ratingsObj;
      }, {});

      // Set the state with lawyers and ratings
      setLawyers(lawyersWithRatings);
      setAllLawyersRatings(allLawyersRatings); // Store all lawyers ratings in state
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching lawyers:", error);
      setIsLoading(false);
    }
  };


  // Call the function to fetch lawyers' data and ratings
  // fetchLawyersAndRatings();


  useEffect(() => {
    fetchPost();
    // ratings();
  }, []);

  const slice = lawyers.slice(0, limit);

  function scrollToTop() {
    window.scrollTo(0, 0);
  }

  
  return (
    <>
      {/* Lawyers featured */}
      {isLoading ? ( // Wrap the content in a conditional statement that checks if the data is still loading
        <div className="row mx-auto lawyers_profile">
          {[...Array(8)].map((_, i) => (
            <div className="col-lg-3  rounded-3 lawyer ecard mt-4 card shadow p-3 mb-5 bg-body rounded lawyers-card" key={i}>
              <div style={{ height: 430, width: 300 }}>
                <div className="row mt-2" id="lawyer">
                  <div className="col-lg-4 col-sm-4 col-6">
                    <div className='preloader-img1 loading-animation'></div>
                  </div>
                  <div className="col-lg-8 col-sm-8 col-6">
                    <div className='preloader-img2 loading-animation rounded-pill'></div>
                    <div className='preloader-img3 loading-animation rounded-pill'></div>
                  </div>
                </div>
                <div className="fs-5 fw-normal text-center preloader-img4 loading-animation rounded-pill"></div>

                <div className="mt-3 ms-3 me-3">
                  <p className="font-weight-bold fs-6 mb-1 preloader-img5 loading-animation rounded-pill p-1"></p>
                  <p className="fs-6 lawyers-desc font-weight-normal lh-base text-justify summ preloader-img6 rounded loading-animation"></p>
                  <div className="row mt-4 practice">
                    <div className="col-lg-6 col-sm-6 col-6">
                      <div className="fs-6 exp preloader-img7 rounded-pill p-1 loading-animation"></div>
                    </div>
                    <div className="col-lg-6 col-sm-6 col-6">
                      <div className="preloader-img8 rounded-pill p-3 loading-animation">

                      </div>
                    </div>
                  </div>
                </div>
                <Skeleton height={430} width={300} />
              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className="row mx-auto lawyers_profile">
          {slice.map((data, i) => (
            <div className="col-lg-3  rounded-3 lawyer ecard mt-4 card shadow p-3 mb-5 bg-body rounded lawyers-card" key={i}>
              <div className="row mt-2" id="lawyer">
                <div className="col-lg-4 col-sm-4 col-4">
                  <img src={data.image} className="lawpics" alt="lawyer_card"></img>
                </div>
                <div className="col-lg-8 col-sm-8 col-8">
                  <p className="fs-6 mb-0 pb-1 h6">{data.username}</p>
                  <p className="city mb-0 pb-1"><i class="bi bi-geo-alt"></i> {data.address}</p>
                  <p className='fs-6 city'>
                    {[...Array(5)].map((star, index) => (
                      <p key={index} className="fw-bold fs-6" style={{ display: 'inline' }}>
                        <i className={allLawyersRatings[data.id] > index + 1 ? 'bi bi-star-fill' : allLawyersRatings[data.id] > index + 0.5 ? 'bi bi-star-half' : 'bi bi-star'} style={{ color: '#D1B06B' }}></i>
                      </p>
                    ))}
                  </p>
                </div>
              </div>
              <span className="fs-5 fw-normal ms-3">{data.specialization}</span>

              <div className="mt-2 ms-3 me-3">
                <p className="font-weight-bold fs-6 mb-1">{data.work}</p>
                <p className="fs-6 lawyers-desc font-weight-normal lh-base text-justify summ">{data.summary}</p>
                <div className="row mt-4 practice">
                  <div className="col-lg-6 col-sm-6 col-6">
                    <span className="fs-6 exp">{data.experience} in practice</span>
                  </div>
                  <div className="col-lg-6 col-sm-6 col-6">
                    <button className="btn btns-primary sfcs viewbtn" onClick={(e) => { navigate(`/job/${data.id}`); scrollToTop() }}>
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Lawyers featured end */}
    </>
  );
};

export default Lawyerscards;