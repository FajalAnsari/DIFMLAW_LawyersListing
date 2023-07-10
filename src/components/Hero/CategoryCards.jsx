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
      <div className='col-lg-3 p-4'>
          <Link className='text-decoration-none' to={`/alllawyer/${type}`}>
          <div className='category rounded-3 mt-4 p-4 ecard'>
              <img src={logo} style={{marginLeft:"30%"}} alt='cat_logo' />
          <p className='mt-2 mx-2 text-dark' >{type}</p>
          <div className='d-flex'>
          <h6 className='mt-2 text-dark'>{Count}{ avalilabe}</h6>
          <div><i class="bi bi-arrow-right ms-2 fs-4 font-color"></i></div>
          </div>
          </div>
          </Link>
      </div>
   
    </>
  )
}

export default CategoryCards
