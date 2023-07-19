import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { dummy } from "../../images";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { auth } from "../../../firebase";



const Lawyer_Message = () => {
  const [add_Lawyercarts, setAdd_Lawyercarts] = useState([]);
  const [messages, setAllmessages] = useState([]);
  const [loginlawyerId, getLoginLawyerId] = useState("");


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
          getLoginLawyerId(user.uid);
            console.log(loginlawyerId);
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

const Messages = async (id) => {
  
  // Get the element you want to style
const element = document.getElementById("text_msg3"); 
element.classList.add("block-style");
const element1 = document.getElementById("no"); 
element1.classList.add("block-styles");

  const cartRef = collection(db, 'User_Messages');
  const userCartRef = doc(cartRef, loginlawyerId);
  const userMessagesRef = doc(collection(userCartRef, 'AllUsers'), id);
  
  const snapshot = await getDoc(userMessagesRef);
  
  if (snapshot.exists()) {
    const messageData = {
      id: snapshot.id,
      ...snapshot.data()
    };

    // Check if createdAt field is a server timestamp
    if (messageData) {
      // Convert server timestamp to a JavaScript Date object
      const createdAtDate = messageData.date.toDate();

      // Format the date as a readable string
      const formattedDate = createdAtDate.toLocaleDateString();
      const formattedTime = createdAtDate.toLocaleTimeString();

      // Add the formatted date and time back to the messageData object
      messageData.createdAtDate = formattedDate;
      messageData.createdAtTime = formattedTime;
    }
    setAllmessages(messageData);
    console.log(messageData.createdAtDate);
  } else {
    console.log('No message found');
  }

  
}


  return (
    <>
      <div className="lawyer_message" id="message">
        <div className="row">
          <div className="col-md-4">       
              <div className="user_pro">
                <p className="text-white mt-4 text-center">Messages</p>
              {add_Lawyercarts.map((add_Lawyercart, i) => (
                  <div className="d-flex px-4 usersl mb-2" onClick={()=> {Messages(add_Lawyercart.id)}} key={i} activeClassName="active">
                    <img
                      src={dummy}
                      alt="dummy"
                      className="mt-1"
                      style={{ width: "20%", height: "20%" }}
                    />
                    <p className="ms-3 mt-2 fs-6 text-white">{add_Lawyercart.username}</p>
                    {/* {setUserName[{...add_Lawyercart.name}]} */}
                  </div>
                  ))}
              </div>    
          </div>
          <div className="col-md-8">
            <div className="msg_1">
              <p className="text-center text-white fs-5" style={{padding:"28%"}} id="no">No Message Selected</p>
              <div className="text_msg1 py-4 px-5 text-white" id="text_msg3">
                <p>
                  <b>Phone No. :</b> <a href='tel:${messages.number}' className="text-white" style={{textDecoration:'none'}}>{messages.number}</a> 
                </p>
                <p>
                  <b>Email :</b> {messages.email}
                </p>
                <p className="fs-5 pb">
                  <b>Message :</b>{messages.message}
                </p>
                <p className="fs-5 pb">
                  <b>Date :</b> {messages.createdAtDate} {messages.createdAtTime}
                </p>
              </div>
          
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Lawyer_Message;
