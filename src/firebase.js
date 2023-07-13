// Your web app's Firebase configuration
import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "@firebase/firestore";
import { getStorage } from "firebase/storage";
import "firebase/storage";
import {getAuth, onAuthStateChanged } from "firebase/auth";



const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyBGlJAxV-RPR16FjHjHX9WHtUNamiyfUVY",
  authDomain: "difm-law.firebaseapp.com",
  projectId: "difm-law",
  storageBucket: "difm-law.appspot.com",
  messagingSenderId: "66111685114",
  appId: "1:66111685114:web:5db517fca847978f3c6443",
  measurementId: "G-S5ZD0622Y6"
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


