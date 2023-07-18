import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { dummy } from "../../images";
import { collection, getDocs, doc, query, where, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../../firebase";
import { auth } from "../../../firebase";



const Lawyer_Message = () => {
  const [add_Lawyercarts, setAdd_Lawyercarts] = useState([]);
  const [messages, setAllmessages] = useState([]);
  const [loginlawyerId, getLoginLawyerId] = useState("");
  const [userName, setUserName] = useState("");

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
const fetchServerDate = async () => {
  try {
      var timestamp = snapshot.data().serverTimestamp;
    var date = new Date(timestamp);

    // Format the date as a string
    var dateString = date.toLocaleString();

    console.log("Document created on " + dateString);
    const serverDateSnapshot = await getDoc(doc(cartRef, 'serverTimestamp'));

    if (serverDateSnapshot.exists()) {
      const serverData = serverDateSnapshot.data();
      const serverDate = serverData.serverDate;
      console.log(serverDate);

      if (serverDate) {
        console.log('Server date:', serverDate);
      } else {
        console.log('Server date field not found');
      }
    } else {
      console.log('No server timestamp document found');
    }
  } catch (error) {
    console.log('Error fetching server date:', error);
  }
};

// Call the function to fetch the server date
fetchServerDate();
  
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
              <div className="user_pro">
              {add_Lawyercarts.map((add_Lawyercart, i) => (
                  <div className="d-flex px-4  usersl um" onClick={()=> {Messages(add_Lawyercart.id)}} key={i}>
                    <img
                      src={dummy}
                      alt="dummy"
                      className="mt-1"
                      style={{ width: "20%", height: "20%" }}
                    />
                    <p className="ms-3 mt-2 fs-6 text-white">{add_Lawyercart.name}</p>
                    {/* {setUserName[{...add_Lawyercart.name}]} */}
                  </div>
                  ))}
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
  );
};

export default Lawyer_Message;
