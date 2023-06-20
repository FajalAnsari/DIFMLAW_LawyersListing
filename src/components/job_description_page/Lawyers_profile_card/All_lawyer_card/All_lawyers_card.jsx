import React, {useEffect, useState} from 'react';
import { collection, getDocs} from "firebase/firestore";
import { db } from '../../../../firebase';
import { lawyer_pic } from '../../../images';
import { useNavigate } from 'react-router-dom';
import "./All_lawyers_card.css";
import { Link } from 'react-router-dom';

const All_lawyers_card = () => {

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
  }, [])
  
  const [currentPage, setCurrentPage] = useState(0);
  const usersPerPage = 5;
  const offset = currentPage * usersPerPage;
  const currentUsers = lawyers.slice(offset, offset + usersPerPage);

  return (
    <>
    {
       currentUsers?.map((data,i)=>(
        <div className='view_buttons load_more mt-2 border border-dark'>
      <div className="row"> 
      <div className="col-lg-9">
          <div className="row">
            <div className="col-lg-4 col-6 mt-2">
                <img src={data.image} className='rounded-circle w-75 pics-pro' alt="" />
            </div>

            <div className="col-lg-8 col-6">
          
            <h5 className='mt-2 fs-6 lawyer_name fw-bold'>{data.username}</h5>
            <span className='fs-6 lawyer_work_type fw-bold'>{data.work}</span>&nbsp;<span className="fw-bold mt-3 fs-6">*****</span><br></br>
            <span className='lawyer_work_experience fw-bold'>{data.experience}  in practice</span>

            </div>
          </div>
      </div>

      <div className="col-lg-3">
          <div className="row">
           
            <button className="view_more btn btn-primary cont mt-5 w-75 fs-6" onClick={(e)=> navigate(`/job/${data.id}`)}>
              View Profile
            </button>
            

            
          </div>
      </div>
      </div>
 </div>
 ))
    }
    <div className='mt-2'>
      <Link className='abd' to='/alllawyer'><p className='fs-5 text-center'>View More</p>
      </Link>
     </div>
    
 </>
  )
}

export default All_lawyers_card