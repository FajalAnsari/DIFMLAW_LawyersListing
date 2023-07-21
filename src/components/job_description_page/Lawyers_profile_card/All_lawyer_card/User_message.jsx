import React, { useEffect, useState } from 'react';
import { dummy } from '../../../images';
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from '../../../../firebase';
import { auth } from '../../../../firebase';
import { Link } from 'react-router-dom';


const User_message = () => {
  const [add_Lawyercarts, setAdd_Lawyercarts] = useState([]);
  const [userMessage, setUserMessage] = useState("");
  const [loginlawyerId, getLoginLawyerId] = useState("");
  const [userImage, setUserImage] = useState("");
  const [userName, setUserName] = useState("");

  // show users meesages who sent to lawyers
  const unsubscribe = auth.onAuthStateChanged(async (user) => {
    if (user) {
      try {
        const cartRef = collection(db, 'User_Messages');
        const userCartRef = doc(cartRef, user.uid);
        const itemsCollectionRef = collection(userCartRef, 'AllUsers');
        const querySnapshot = await getDocs(itemsCollectionRef);
        const newCartProduct = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          image: doc.data().image || '',
          ...doc.data(),
         
        }));
    
        setAdd_Lawyercarts(newCartProduct);
        setUserImage(add_Lawyercarts[0].image);
        setUserName(add_Lawyercarts[0].username);
        setUserMessage(add_Lawyercarts[0].message)
        getLoginLawyerId(user.uid);
          console.log('the id'+ loginlawyerId);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    } else {
      console.log('User is not signed in to retrieve cart');
    }
  });
  unsubscribe();


  return (
    <>
      <div class="mt-4 conatiner">
          <div className="p-4 border border-prime rounded review">
            <div class="text-center">
                <h4 class="font-color">Your Recent Messages</h4>
            </div>

            {userMessage.length === 0 ?  <h5 className='text-center text-white'>No messages available</h5> 
            : 
            <div class=" d-flex align-items-center justify-content-center mt-2">
                <div class=" col-md-12">
                    <div class="p-4 rounded shadow-md">
                    <div className='all_lmsg p-1 mb-4' style={{width:"115%",marginLeft:"-30px"}}>
                           <div className="row"> 
                              <div className="col-md-2">
                                <img src={userImage} alt="dummy" width="40" height="40" className='mt-1' style={{borderRadius:"50%",marginLeft:"8px",border:"2px solid var(--primary)"}}/>
                              </div>
                              <div className="col-md-10">
                                <p className='text-white mt-1 w-100' style={{marginLeft:"-5px",fontSize:"12px",lineHeight:"16px"}}>{userMessage}</p>
                              </div>
                              </div>
                           </div>
                       <Link to='/lawyer_dashboard/user_messages/'><button class="btn btns-primary" onClick={()=>{window.scrollTo(0, 0)}} style={{width:"100%"}}>
                            View All
                        </button>
                        </Link> 
                    </div>
                </div>
            </div>
            }
          </div>
        </div>
    </>
  )
}

export default User_message
