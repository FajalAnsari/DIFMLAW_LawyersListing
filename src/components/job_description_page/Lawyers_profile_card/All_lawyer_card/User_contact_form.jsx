import React, { useEffect, useState } from 'react'
import { collection,  doc,  getDocs, query, setDoc, where } from "firebase/firestore";
import { db } from '../../../../firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '../../../../firebase';
const User_contact_form = (props) => {
    const [user] = useAuthState(auth);
    const [number, setNumber] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [UserName, setUserName] = useState("");

    // get username
    const fetchuserName = () => {
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const res = [];
      
      getDocs(q).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          res.push({
            id: doc.id,
            ...doc.data()
          });
        });
      
        setUserName(res[0].name);
      }).catch((error) => {
        console.log("Error getting documents: ", error);
      });

    }
   
useEffect(()=>{
  fetchuserName();
})

    // message send to lawyer

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = [];
        if(!number || !email || !message){
            alert("Plese fill the message field!");
        }
        else{
            const parentCollection = collection(db, 'User_Messages');
             data.push({
                name:UserName,
                number:number,
                email:email,
                message:message,
               
            })

            for (const item of data){
                 const cartCollectionRef = doc(parentCollection, props.lawyer_id, 'AllUsers', user.uid); 
                 await setDoc(cartCollectionRef,item).then(()=>{
                    alert("message sent successfully");
                 }).catch((err)=>{
                    console.log(err);
                 })
            }
          
         
        }

    }

  return (
    <>
  <div class="mt-4 conatiner">
          <div className="p-4 border border-prime rounded review">
            <div class="text-center">
                <h4 class="font-color">Contact With This Lawyers</h4>
            </div>
            <div class=" d-flex align-items-center justify-content-center mt-2">
                <div class=" col-md-12">
                    <div class="p-4 rounded shadow-md">
                           <div class="input-group mb-3">
                              <input type="number" name="number" class="form-control" placeholder="Enter your phone" value={number} required style={{backgroundColor:"var( --second-secondary)"}} onChange={(e) => setNumber(e.target.value)}/>
                              <span class="input-group-text btns-primary border-prime" ><i class="bi bi-person fs-5"></i></span>
                           </div>
                    
                           <div class="input-group mb-3">
                              <input type="text" name="email" class="form-control" placeholder="Enter your email" value={email} required style={{backgroundColor:"var( --second-secondary)"}} onChange={(e) => setEmail(e.target.value)}/>
                              <span class="input-group-text btns-primary border-prime" ><i class="bi bi-envelope-open fs-5"></i></span>
                           </div>
                          <div class="mt-3 mb-3">
                            <textarea name="message" cols="20" rows="6" class="form-control"
                            placeholder="Write your message.." style={{backgroundColor:"var( --second-secondary)"}} value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                          </div>
                        <button class="btn btns-primary w-100" onClick={handleSubmit}>
                            Send
                        </button>
                    </div>
                </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default User_contact_form