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
    const [loginUser, setloginUser] = useState("");
  
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(async (user) => {
        if (user) {
          try {
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const res = [];
      const doc = await getDocs(q);
      doc.forEach(value=>{
          res.push({
              id: value.id,
              ...value.data()
          });
      });
      setloginUser(res[0].name);
      setloginUserID(user.uid);
      console.log('jhjd '+ user.uid);
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
  
    // console.log(add_Lawyercarts);
  
  
     // fetch allusers messages
  
  const Messages = async () => {
  
    // if (user) {
        const cartRef = collection(db, "User_Messages", "AllUsers");
        const allUsersRef = doc(cartRef, "pVJBOA5VDeXrbetqkrlqpBiXV0a2");
        
        const snapshot = await getDoc(allUsersRef);
        
        if (snapshot.exists()) {
          const userData = {
            id: snapshot.id,
            ...snapshot.data(),
          };
        
          console.log(userData);
        } else {
          console.log("No user found");
        }
        
    
      
    //   }
   
    
    
  }
  return (
    <>
    <div className="lawyer_message" id="message">
        <div className="row">
          <div className="col-md-4">       
              <div className="user_pro">
          
                  <div className="d-flex px-4  usersl um" >
                    <img
                      src={dummy}
                      alt="dummy"
                      className="mt-1"
                      style={{ width: "20%", height: "20%" }}
                    />
                    <p className="ms-3 mt-2 fs-6 text-white" onClick={Messages}>{loginUser}</p>
      
                  </div>
          
              </div>    
          </div>
          <div className="col-md-8">
            <div className="msg_1">
        
              <div className="text_msg1 py-4 px-5 text-white">
                <p>
                  <b>Phone No. :</b> <a href='tel:${messages.number}' className="text-white" style={{textDecoration:'none'}}>{messages.number}</a> 
                </p>
                <p>
                  <b>Email :</b> {messages.email}
                </p>
                <p className="fs-5 pb">
                  <b>Message :</b>{messages.message}
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