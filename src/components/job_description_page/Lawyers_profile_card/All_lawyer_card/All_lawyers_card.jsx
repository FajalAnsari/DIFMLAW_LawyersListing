import React, {useEffect, useState} from 'react';
import { collection, getDocs} from "firebase/firestore";
import { db } from '../../../../firebase';

import { useNavigate } from 'react-router-dom';
import "./All_lawyers_card.css";
import { Link } from 'react-router-dom';

const All_lawyers_card = () => {
  const [allLawyersRatings, setAllLawyersRatings] = useState({}); 
  // const [lawyers, setLawyers] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add isLoading state
  const UserRating = async () => {
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

    const navigate = useNavigate();
    const [lawyers, setLawyers] = useState([]);
    const fetchPost = async () => {
         
      await getDocs(collection(db, "lawyers"))
          .then((querySnapshot)=>{              
              const newData = querySnapshot.docs
                  .map((doc) => ({...doc.data(), id:doc.id }));
              setLawyers(newData);                
              console.log(lawyers);
          }) 
      }
  
  useEffect(()=>{
      fetchPost();
      UserRating();
  }, [])
  
  const [currentPage] = useState(0);
  const usersPerPage = 5;
  const offset = currentPage * usersPerPage;
  const currentUsers = lawyers.slice(offset, offset + usersPerPage);

  return (
    <>
    {
       currentUsers?.map((data,i)=>(
        <div className='view_buttons load_more mt-2 border border-dark' style={{backgroundColor: "var(--second-primary)"}}>
      <div className="row"> 
      <div className="col-lg-9 col-sm-6 col-9">
          <div className="row">
            <div className="col-lg-4 col-6 mt-2">
                <img src={data.image} className='rounded-circle pics-pro' alt="image" />
            </div>

            <div className="col-lg-8 col-6">
          
            <h5 className='mt-2 fs-6 lawyer_name fw-bold font-color'>{data.username}</h5>
            <span className='fs-6 lawyer_work_type fw-bold text-white'>{data.work}</span>&nbsp;<span className="fw-bold mt-3 fs-6 text-white">{[...Array(5)].map((star, index) => (
        <p key={index} className="fw-bold  star fs-6" style={{display:'inline'}}>
          <i className={allLawyersRatings[data.id] > index + 1 ? 'bi bi-star-fill' : allLawyersRatings[data.id] > index + 0.5 ? 'bi bi-star-half' : 'bi bi-star'} style={{ color: '#D1B06B', fontSize:'10px'}}></i>
        </p>
      ))}</span><br></br>
            <span className='lawyer_work_experience fw-bold text-white'>{data.experience}  in practice</span>

            </div>
          </div>
      </div>

      <div className="col-lg-3 col-sm-6 col-3">
          <div className="row">
            <button className="view_more btn btns-primary cont mt-4 w-75 fs-6" onClick={(e)=> navigate(`/job/${data.id}`)}>
              View Profile
            </button>  
          </div>
      </div>
      </div>
 </div>
 ))
    }
    <div className='mt-2'>
      <Link className='abd' to='/alllawyer'><p className='fs-5 text-center font-color'>View More</p>
      </Link>
     </div>
    
 </>
  )
}

export default All_lawyers_card