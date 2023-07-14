// Your web app's Firebase configuration
import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "@firebase/firestore";
import { getStorage } from "firebase/storage";
import "firebase/storage";
import {getAuth, onAuthStateChanged } from "firebase/auth";



const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyDEYnLoKhyDPmDSK0vjvFoJq8gdptcQE1E",
  authDomain: "difmlawyer.firebaseapp.com",
  projectId: "difmlawyer",
  storageBucket: "difmlawyer.appspot.com",
  messagingSenderId: "649083345336",
  appId: "1:649083345336:web:70ce2757ccf9c8b11c574d"
};

export const useFirebase = () => useContext(FirebaseContext);
export const FirebaseProvider = (props) => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);
  
  const getUsersId = async (id) => {
    const docRef = doc(db, "lawyers", id);
    const result = await getDoc(docRef);
    return result;
  };

  const isLoggedIn = user ? true : false;

   return < FirebaseContext.Provider 
   value={{ getUsersId, isLoggedIn }}
   >
    {props.children}
    </FirebaseContext.Provider>
  }

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);


