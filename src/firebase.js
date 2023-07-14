// Your web app's Firebase configuration
import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "@firebase/firestore";
import { getStorage } from "firebase/storage";
import "firebase/storage";
import {getAuth, onAuthStateChanged } from "firebase/auth";



const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyA-GweY6qC-cTm-64WIyt2h3nEu5QRtzGI",
  authDomain: "difmlawlist.firebaseapp.com",
  projectId: "difmlawlist",
  storageBucket: "difmlawlist.appspot.com",
  messagingSenderId: "644263167841",
  appId: "1:644263167841:web:49888cb835ebe935a5a720"
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


