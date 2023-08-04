import React, { useEffect, useState } from 'react'
import { query, collection, where, getCountFromServer } from "firebase/firestore";
import { db } from '../../firebase';
import { Link } from 'react-router-dom';
const CategoryCards = ({logo, type,  avalilabe}) => {
  const [Count, setCount] = useState(0);
  const count_cat = async () =>{
    const q = query(collection(db, "lawyers"), where("specialization", "==", type))

    const snapshot = await getCountFromServer(q);
    setCount(snapshot.data().count);
  

  }
  useEffect(()=>{
    count_cat();
  },[])
  return (
    <>
      <div className='col-lg-3 col-sm-6 p-4'>
          <Link className='text-decoration-none' to={`/alllawyer/${type}`}>
          <div className='category rounded-3 mt-4 p-4 ecard'>
          <img src={logo} className='w-25 mx-auto d-block' style={{marginLeft:"30%",opacity:"0.8"}} alt='cat_logo' />
          <p className='mt-2 text-center text-darks' >{type}</p>
          <div className='d-flex ms-4 mss-4'>
          <h6 className='mt-2 text-darks'>{Count}{ avalilabe}</h6>
          <div className='arrow-icon'><i class="bi bi-arrow-right ms-2 fs-4 font-color"></i></div>
          </div>
          </div>
          </Link>
      </div>
   
    </>
  )
}

export default CategoryCards
