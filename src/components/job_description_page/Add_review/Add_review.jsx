import React, { useEffect, useState } from 'react'
import { db } from '../../../firebase';
import { auth } from '../../../firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, updateDoc, serverTimestamp, query, collection,getDoc, getDocs, where , setDoc } from "firebase/firestore";

import "./review_section.css";

const Add_review = (props) => {
  const [user, loading] = useAuthState(auth);
  const [rating, setRating] = useState(0);
  const [title , setTitle] = useState("");
  const [message ,setMessage] = useState("");
  const [data , setData] = useState([]);
  const [userImage, setUserImage] = useState("");
  const [userName, setUserName] = useState("");





   // State to show/hide accordion
   const [show, setShow] = useState(false);
   const handleOpen = () => {
     setShow(!show); // Toggle accordion
   };

   
    // get username
    if(user){
     
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const res = [];
        
        getDocs(q).then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            res.push({
              id: doc.id,
              ...doc.data()
            });
          });
        setUserImage(res[0].image);
          setUserName(res[0].username);
        }).catch((error) => {
          console.log("Error getting documents: ", error);
        });
  
      // }
    }
  


  //  give rating 
  const giveRating = async (e) =>{
    e.preventDefault()
     // Check if the user has already rated this lawyer
  const userRatedQuery = query(collection(db, "User_Messages", props.id, "Ratings_review"), where("username", "==", userName));
  const userRatedSnapshot = await getDocs(userRatedQuery);
  console.log(userRatedSnapshot);

  if (userRatedSnapshot.size === 0) {
    // User hasn't rated this lawyer, so allow them to submit the rating
       const parentCollection = collection(db, 'User_Messages');
      data.push({
       image:userImage,
       username:userName,
       rating:rating,
       title:title,
       message:message,
       date: serverTimestamp()
   })

   for (const item of data){
        const cartCollectionRef = doc(parentCollection, props.id, 'Ratings_review', user.uid); 
        await setDoc(cartCollectionRef,item).then(()=>{
           alert("message sent successfully");
        }).catch((err)=>{
           console.log(err);
        })
   }
   const taskDocRef = doc(db, "lawyers", props.nid);

   try {
     const ratingValue = parseInt(rating); // Convert the selected rating to a number
   
     // Get the current document data
     const docSnapshot = await getDoc(taskDocRef);
     const currentData = docSnapshot.data();
   
     // Update the ratings object
     const updatedRatings = { ...currentData.ratings };
   
     // Increment the count for the corresponding rating value
     updatedRatings[ratingValue] = (updatedRatings[ratingValue] || 0) + 1;
   
     // Update the document with the new ratings object
     await updateDoc(taskDocRef, {
       ratings: updatedRatings,
     });
   
     alert("Your Rating is " + ratingValue);
   
     // ... (other code)
   } catch (err) {
     alert(err);
   }
 

  } else {
    // User has already rated this lawyer
    alert("You have already rated this lawyer.");
  }

  console.log(props.nid);
  

  
}
   
  return (
    <>
    <div className='mt-5 mb-5 rounded-3  border border-prime border-1'>
      <div className='review p-4 rounded-3'>
        <div className='row'>
        <div className='col-lg-6 col-6'><p className='text-white'>Write A Review</p></div>
        <div className='col-lg-6 col-6'><p className='fs-1 font-color d-flex justify-content-end' onClick={handleOpen}>{show ? <i class="bi bi-caret-up-fill"></i> : <i class="bi bi-caret-down-fill"></i>}</p></div>

        </div>
        <div style={{backgroundColor:'var(--second-secondary)'}} className='p-3 rounded'>
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
               
            </div>
              </div>
            </div>
          </div>
          <div className='col-lg-6 '>
            <div className='d-flex justify-content-end '>
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
              <label className="fs-5 mt-3 text-white mb-1 " for="inputFirstName">Title</label>
              <input className="form-control contect-bgColors" id="inputFirstName" type="text" placeholder="Enter your Title" value={title} onChange={(e) => setTitle(e.target.value)}/>
              <label className="fs-5 mt-3 text-white mb-2 " for="inputMessage">Review</label>
              <textarea rows={10} cols={92} style={{backgroundColor:'var(--second-secondary)'}} id='inputMessage' className='w-100 rounded' placeholder='Write your review' value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
              <button className='btns-primary border-prime w-25 mt-2' onClick={giveRating}><p className='fs-6  fw-bold my-2' style={{fontSize:"20px"}}>Signup & Submit</p></button>
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