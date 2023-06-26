// Your web app's Firebase configuration
import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "@firebase/firestore";
import { getStorage } from "firebase/storage";
import "firebase/storage";
import {getAuth, onAuthStateChanged } from "firebase/auth";



const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyD9QOV3vIYtbBwFoOBvEUl5TrJQVFycAIk",
  authDomain: "difm-law-listing.firebaseapp.com",
  projectId: "difm-law-listing",
  storageBucket: "difm-law-listing.appspot.com",
  messagingSenderId: "47969149615",
  appId: "1:47969149615:web:22d1fef3b3afc95e202a5a"
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


