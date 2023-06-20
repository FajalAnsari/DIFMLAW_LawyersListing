import React, { useEffect, useState } from 'react'
import { query, collection, getDocs, where, getCountFromServer } from "firebase/firestore";
import { db } from '../../firebase';
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
          
          <div className='category rounded-3 mt-4 p-4 ecard'>
              <img src={logo} style={{marginLeft:"30%"}} />
          <p className='mt-2 mx-2' >{type}</p>
          <div className='d-flex'>
          <h6 className='mt-2'>{Count}{ avalilabe}</h6>
          <div><i class="bi bi-arrow-right ms-2 fs-4"></i></div>
          </div>
          
          </div>
        
      </div>
   
    </>
  )
}

export default CategoryCards
