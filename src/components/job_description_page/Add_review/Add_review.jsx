import React, { useEffect, useState } from 'react'
import { query, collection, getDocs, where } from "firebase/firestore";
import { db } from '../../../firebase';
import { auth } from '../../../firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, updateDoc } from "firebase/firestore";
import "./review_section.css";
const Add_review = (props) => {
  const [user, loading] = useAuthState(auth);
  const [rating, setRating] = useState(null);
  const [count, setCount] =useState(0);
  const [fiveRating , setFiverating] = useState(rating)
  const [setUserId, getUserId] = useState("");
   // State to show/hide accordion
   const [show, setShow] = useState(false);
   const handleOpen = () => {
     setShow(!show); // Toggle accordion
   };
  //  fetch user id to update rating



const fetchUserId = async () => {
  const q = query(collection(db, "lawyers"), where("uid", "==", user.uid));
   const res = [];
     const doc = await getDocs(q);
     doc.forEach(value=>{
         res.push({
             id: value.id,
             ...value.data()
         });
     });
     getUserId(res[0].id)
    
}

  //  give rating 
  const giveRating = async (e) =>{
    e.preventDefault()
    if(rating===5){
      setFiverating(true);
      setCount(count+1);
      console.log(count)
      alert("yes is "+ rating);
    }
    else if(rating===4){
      setFiverating(true);
      console.log(count+1)
      alert("yes is "+ rating);
    }
    const taskDocRef = doc(db,"lawyers", setUserId);

    try{
      await updateDoc(taskDocRef,{
         rating:{ 
          5:count,
          4:count,
          3:count,
          2:count,
          1:count,
         }
        
      }).then(() => {
        alert("Your Rating is"+ rating);
      })
    } catch (err) {
      alert(err)
    }  
  alert(rating);

  }
  useEffect(()=>{
    fetchUserId();
    console.log('yes'+props.id);
  },[])
  
   
  return (
    <>
    <div className='mt-5 mb-5'>
      <div className='review p-4'>
        <div className='row'>
        <div className='col-lg-6 col-6'><p className='text-white'>Write A Review</p></div>
        <div className='col-lg-6 col-6'><p className='fs-1 font-color d-flex justify-content-end' onClick={handleOpen}>{show ? <i class="bi bi-caret-up-fill"></i> : <i class="bi bi-caret-down-fill"></i>}</p></div>

        </div>
        <div style={{backgroundColor:'var(--second-secondary)'}} className='p-3'>
        <div className='row'>
          <div className='col-lg-6'>
            <div className='row'>
              <div className='col-lg-6'>
                <p>Your Rating</p>
              </div>
              <div className='col-lg-6'>
                <div className='d-flex justify-content-end mt-2'>
                {[...Array(5)].map((star,index) => {
                  const currentRating = index + 1;
                   return (
                    <label>
                      <input type='radio' className='d-none' name='rating' value={currentRating} onClick={() => {setRating(currentRating)}}></input>
                    <i class="bi bi-star-fill" style={{color:currentRating <= rating ? '#ffc107': ''}}></i>
                    </label>
                   ) 
                })}
                {rating}
            </div>
              </div>
            </div>
          </div>
          <div className='col-lg-6'>
            <div className='d-flex justify-content-end'>
            <label for='file'><div className='bg-secondary p-2 text-white'>Browse Image</div></label>
            <input type='file' name='file' id='file' className='d-none'></input>
            </div>
          </div>
        </div>
        </div>
             {/* write your review start */}
             <div className=''>
      {show && (
          <div className="accordian-body">
           <p className='text-white fs-5 mt-1'>Title</p>
          <div className=''>
           <div style={{backgroundColor:'var(--second-secondary)'}} className='p-1'><p className='fs-6  ms-3'>Example : It was awesome experience with Mr. Fajal Ansari</p></div>
            </div>
            <p className='text-white fs-5 mt-1'>Review</p>
            <div className=''>
          <textarea rows={10} cols={92} style={{backgroundColor:'var(--second-secondary)'}} className='' placeholder='Write your review'></textarea>
              </div>
              <button className='btns-primary w-25' onClick={giveRating}><p className='fs-6 p-1 fw-bold'>Signup & Submit</p></button>
          </div>
        )}
        </div>
         {/* write your review end */}
      </div>
 
    </div>
    </>
  )
}

export default Add_review