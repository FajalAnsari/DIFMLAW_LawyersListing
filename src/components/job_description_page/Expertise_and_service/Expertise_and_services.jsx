import { collection, doc, getCountFromServer } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { db } from '../../../firebase';

const Expertise_and_services = (props) => {
    const [reviewCount, setReviewCount] = useState(0); // Initialize with 0 reviews

    const fetchRate = async () => {
      try {
        if (props.uid) {
          const userCartRef = doc(db, 'User_Messages', props.uid);
          const itemsCollectionRef = collection(userCartRef, 'Ratings_review');
          const querySnapshot = await getCountFromServer(itemsCollectionRef);
          const count = querySnapshot.data().count || 0;
          setReviewCount(count);
          console.log('count: ', count);
        } else {
          console.log('props.uid is undefined or empty');
        }
      } catch (error) {
        console.error('Error fetching review count:', error);
      }
    };
    
    useEffect(() => {
      fetchRate();
    }, [props.uid]); // Run the effect whenever props.uid changes
    
   

  return (
    <div className='row border law border border-prime rounded mt-5 p-4 expertise_service' style={{backgroundColor: "var(--second-secondary)"}}>
        <h3 className='bt-primary p-2 fs-5'>Expertise and Services</h3>
        <p className='fs-6'>{props.Bio}</p>
        <h2 className='fs-3'>Requirements:</h2>
        <div className='row'>
            <div className='col-lg-6'>
                <div className='row'>
                    <div className='col-lg-6 col-6'>
                        <p className='fw-bold fs-6'>Practice Areas</p>
                        <p className='fw-bold fs-6'>Experience</p>
                        <p className='fw-bold fs-6'>Rating</p>
                        <p className='fw-bold fs-6'>Reviews</p>
                    </div>
                    <div className='col-lg-6 col-6'>
                        <p className='fs-6'>{props.cat || "N/A"}</p>
                        <p className='fs-6'>{props.experience || "N/A"}</p>
                        <p className='fs-6'>{props.rating || "N/A"}</p>
                        <p className='fs-6'>{reviewCount || 0}</p>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-lg-6 col-6'>
                        <Link to="/contect_us"><button className='connect_now btn btns-primary w-75 h-100'>Connect Now</button></Link>
                    </div>
                    <div className='col-lg-6 col-6'>
                    <Link to="/"><button className='btn btn-secondary'>Back</button></Link>
                    </div>
                </div>
            </div>
         



            <div className='col-lg-6'></div>
        </div>
    </div>
  )
}

export default Expertise_and_services