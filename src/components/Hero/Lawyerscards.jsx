import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import "./Lawyerscards.css";

const Lawyerscards = () => {
  const navigate = useNavigate();
  const [limit] = useState(8);
  const [lawyers, setLawyers] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add isLoading state

  const fetchPost = async () => {
    await getDocs(collection(db, 'lawyers')).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setLawyers(newData);
      setIsLoading(false); // Set isLoading to false once the data has been fetched
    });
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const slice = lawyers.slice(0, limit);
  
  return (
    <>
      {/* Lawyers featured */}
      {isLoading ? ( // Wrap the content in a conditional statement that checks if the data is still loading
        <div className="row mx-auto lawyers_profile">
          {[...Array(8)].map((_, i) => (
           <div className="col-lg-3 rounded-3 lawyer ecard mt-4 card shadow p-3 mb-5 bg-body rounded lawyers-card" key={i}>
           <div className="row mt-2" id="lawyer">
                <div className="col-lg-4 col-sm-4 col-6">
                  <div className="ms-2 lawpics" style={{backgroundColor:'var(--third-primary)'}} alt="lawyer_card"></div>
                </div>
                <div className="col-lg-8 col-sm-8 col-6">
                  <p className="fs-6 mb-0 pb-1 h6" style={{backgroundColor:'var(--third-primary)'}}></p>
                  <p className="city" style={{backgroundColor:'var(--third-primary)'}}></p>
                </div>
              </div>
              <span className="fs-5 fw-normal text-center"></span>

<div className="mt-3 ms-3 me-3">
  <p className="font-weight-bold fs-6 mb-1"></p>
  <p className="fs-6 lawyers-desc font-weight-normal lh-base text-justify summ"></p>
  <div className="row mt-4 practice">
    <div className="col-lg-6 col-sm-6 col-6">
      <span className="fs-6 exp"> in practice</span>
    </div>
    <div className="col-lg-6 col-sm-6 col-6">
      <button className="btn btns-primary sfcs viewbtn">
        View Profile
      </button>
    </div>
  </div>
</div>
           <div style={{ height: 400 }}>
            <div className='preloader-img'></div>
             <Skeleton height={400} />
           </div>
           
         </div>
          ))}
        </div>
      ) : (
        <div className="row mx-auto lawyers_profile">
          {slice.map((data, i) => (
            <div className="col-lg-3 rounded-3 lawyer ecard mt-4 card shadow p-3 mb-5 bg-body rounded lawyers-card" key={i}>
              <div className="row mt-2" id="lawyer">
                <div className="col-lg-4 col-sm-4 col-6">
                  <img src={data.image} className="ms-2 lawpics" alt="lawyer_card"></img>
                </div>
                <div className="col-lg-8 col-sm-8 col-6">
                  <p className="fs-6 mb-0 pb-1 h6">{data.username}</p>
                  <p className="city">{data.address}</p>
                </div>
              </div>
              <span className="fs-5 fw-normal text-center">{data.specialization}</span>

              <div className="mt-3 ms-3 me-3">
                <p className="font-weight-bold fs-6 mb-1">{data.work}</p>
                <p className="fs-6 lawyers-desc font-weight-normal lh-base text-justify summ">{data.summary}</p>
                <div className="row mt-4 practice">
                  <div className="col-lg-6 col-sm-6 col-6">
                    <span className="fs-6 exp">{data.experience} in practice</span>
                  </div>
                  <div className="col-lg-6 col-sm-6 col-6">
                    <button className="btn btns-primary sfcs viewbtn" onClick={(e) => navigate(`/job/${data.id}`)}>
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