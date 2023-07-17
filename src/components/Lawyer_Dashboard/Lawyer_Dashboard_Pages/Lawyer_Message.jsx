import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { dummy } from "../../images";
import { collection, getDocs, doc, query, where, getDoc } from "firebase/firestore";
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

  const cartRef = collection(db, 'User_Messages');
  const userCartRef = doc(cartRef, loginlawyerId);
  const userMessagesRef = doc(collection(userCartRef, 'AllUsers'), id);
  
  const snapshot = await getDoc(userMessagesRef);
  
  if (snapshot.exists()) {
    const messageData = {
      id: snapshot.id,
      ...snapshot.data()
    };
    setAllmessages(messageData);
    console.log(messageData);
  } else {
    console.log('No message found');
  }

}
  return (
    <>
      <div className="lawyer_message" id="message">
        <div className="row">
          <div className="col-md-4">       
              <div className="user_pro" >
              {add_Lawyercarts.map((add_Lawyercart, i) => (
                  <div className="d-flex px-4  usersl um" onClick={()=> {Messages(add_Lawyercart.id)}} key={i}>
                    <img
                      src={dummy}
                      alt="dummy"
                      className="mt-1"
                      style={{ width: "20%", height: "20%" }}
                    />
                    <p className="ms-3 mt-2 fs-6 text-white">{add_Lawyercart.name}</p>
                  </div>
                  ))}
              </div>    
          </div>
          <div className="col-md-8">
            <div className="msg_1">
        
              <div className="text_msg1 py-4 px-5 text-white">
                <p>
                  <b>Phone No. :</b> 7800504006
                </p>
                <p>
                  <b>Email :</b> {messages.email}
                </p>
                <p className="fs-5 pb">
                  <b>Message :</b>{messages.message}
                </p>
              </div>
              <div className="text_msg2 py-4 px-5 text-white">
                <p>
                  In publishing and graphic design, Lorem ipsum is a placeholder
                  text commonly used to demonstrate the visual form of a
                  document or a typeface without relying on meaningful content.
                  Lorem ipsum may be used as a placeholder before final copy is
                  available.
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
