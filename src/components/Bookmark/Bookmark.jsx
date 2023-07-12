import React,{useState, useEffect} from 'react';
import { auth } from '../../firebase';
import { db } from '../../firebase';
import Add_Lawyercart from './Add_Lawyercart';

const Bookmark = () => {

     // state of cart products
     const [add_Lawyercarts, setAdd_Lawyercarts]=useState([]);

     // getting cart products from firestore collection and updating the state
     useEffect(()=>{
         auth.onAuthStateChanged(user=>{
             if(user){
                 db.collection('Cart ' + user.uid).onSnapshot(snapshot=>{
                     const newCartProduct = snapshot.docs.map((doc)=>({
                         ID: doc.id,
                         ...doc.data(),
                     }));
                     Add_Lawyercart(newCartProduct);                    
                 })
             }
             else{
                 console.log('user is not signed in to retrieve cart');
             }
         })
     },[])
     
  return (
    <>
      {add_Lawyercarts.length > 0 && (
        <div className='container'>
          <Add_Lawyercart />
        </div>
      )}
      {add_Lawyercarts.length < 1 && (
        <div className='container'>
         No Data SHow
        </div>
      )}
    </>
  )
}

export default Bookmark
