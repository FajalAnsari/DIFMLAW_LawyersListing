import React, {useEffect, useState} from 'react'
import "../Lawyer_Dashboard/Lawyer_Dashboard_Pages/Dashboard.css";
import { query, collection, getDocs, where, doc, updateDoc, getDoc  } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, storage, db } from "../../firebase";
import { dummy } from "../images";
const User_messages = () => {
    const [add_Lawyercarts, setAdd_Lawyercarts] = useState([]);
    const [messages, setAllmessages] = useState([]);
    const [loginUserId, setloginUserID] = useState("");


    // getting current user uid
  function GetLawyerUid() {
    const [uid, setUid] = useState(null);
    useEffect(() => {
      auth.onAuthStateChanged(user => {
        if (user) {
          setUid(user.uid);
        }
      })
    }, [])
    return uid;
  }
  const uids = GetLawyerUid();
  
  
  useEffect(() => {
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
        
          console.log(add_Lawyercarts);
          setloginUserID(user.uid);
            console.log(loginUserId.uid);
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






  // fetch allusers messages
  const Messages = async () => {
    if (uids !== null) {
      const cartRef = collection(db, 'User_Messages');
      const userCartRef = doc(cartRef, "xhQiwTrA11bddTf9Ll3akVas47w2");
      const userMessagesRef = doc(collection(userCartRef, 'AllUsers'), uids);      
      const snapshot = await getDoc(userMessagesRef);
      
      if (snapshot.exists()) {
        const messageData = {
          id: snapshot.id,
          ...snapshot.data()
        };
    
        
        setAdd_Lawyercarts(messageData);
        } else {
          console.log(loginUserId);
        }
        
      }
  }
  Messages();


  return (
    <>
    <div className="lawyer_message" id="message">
        <div className="row">
          <div className="col-md-4">       
              <div className="user_pro">
          
                  <div className="d-flex px-4  usersl um">
                    <img
                      src={dummy}
                      alt="dummy"
                      className="mt-1"
                      style={{ width: "20%", height: "20%" }}
                    />
                    <p className="ms-3 mt-2 fs-6 text-white">{add_Lawyercarts.username}</p>
      
                  </div>
          
              </div>    
          </div>
          <div className="col-md-8">
            <div className="msg_1">
        
              <div className="text_msg1 py-4 px-5 text-white">
                <p>
                  <b>Phone No. :</b> <a href='tel:${messages.number}' className="text-white" style={{textDecoration:'none'}}>{add_Lawyercarts.number}</a> 
                </p>
                <p>
                  <b>Email :</b> {add_Lawyercarts.email}
                </p>
                <p className="fs-5 pb">
                  <b>Message :</b>{add_Lawyercarts.message}
                </p>
              </div>
          
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default User_messages