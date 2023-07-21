import React from 'react';
import { dummy } from '../../images';
import "./review_section.css";
import { auth, db } from '../../../firebase';
import { collection, doc, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';

const Add_Comment = () => {
 
  const [add_Lawyercarts, setAdd_Lawyercarts] = useState([]);

  const filledStars = Math.round(4 * 2) / 2;

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const cartRef = collection(db, 'User_Messages');
          const userCartRef = doc(cartRef, user.uid);
          const itemsCollectionRef = collection(userCartRef, 'Ratings_review');
          const querySnapshot = await getDocs(itemsCollectionRef);
  
          const newCartProduct = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            const createdAtDate = data.date?.toDate ? data.date.toDate() : null;
  
            return {
              id: doc.id,
              image: data.image || '',
              ...data,
              createdAtDate: createdAtDate ? createdAtDate.toLocaleDateString() : null,
            };
          });
  
          setAdd_Lawyercarts(newCartProduct);
        } catch (error) {
          console.error('Error fetching cart:', error);
        }
      } else {
        console.log('User is not signed in to retrieve cart');
      }
    });
  
    return () => {
      unsubscribe();
    };
  }, []);

  


  return (
    <>
    <div className="add-comment py-4 px-4 rounded-3  border border-prime border-1" style={{backgroundColor:"var(--fourth-primary)"}}>
    {add_Lawyercarts.map((add_Lawyercart, i) => (
      <div className="row">
        <div className="col-md-2" key={i}>
          <div className="lim">
          <img src={add_Lawyercart.image} alt="" width="80" className='rounded-circle'/>
          </div>
        </div>
        <div className="col-md-10">
            <div className="row">
                <div className="col-md-8">
                  <p className='fs-6' style={{color:"var(--third-secondary)"}}>{add_Lawyercart.username}<br />{add_Lawyercart.createdAtDate}</p>
                </div>
                <div className="col-md-4">
                 <div className="btns-primary d-flex px-1 w-50" style={{height:"23px"}}>
                 {[...Array(5)].map((star, index) => (
        <i
          key={index}
          className={`bi ${index < filledStars ? 'bi-star-fill' : 'bi-star'} me-1`}
        ></i>
      ))}
                  <div className='px-2 ' style={{height:"23px",backgroundColor:"var(--third-secondary)"}}>
                    <p className='fs-6 fw-bold font-color' style={{marginTop:"-2px"}}>{add_Lawyercart.rating}.0</p>
                  </div>
                 </div>
                </div>
                <p className='fs-6 font-color'>{add_Lawyercart.title}</p>
                <p style={{fontSize:"13px",color:"var(--text-color)"}}>
                {add_Lawyercart.message}
                </p>
                <hr
              className="mb-1 ms-2 add_com"
            />
            </div>
        </div>
      </div>
       ))}
      </div>
    </>
  )
}

export default Add_Comment
