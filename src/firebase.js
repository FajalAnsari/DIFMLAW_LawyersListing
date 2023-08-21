
// Your web app's Firebase configuration
import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "@firebase/firestore";
import { getStorage } from "firebase/storage";
import "firebase/storage";
import {getAuth, onAuthStateChanged } from "firebase/auth";


const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyBZ4oGm9tU2FYQK6kjxXa3R6A6XgK5t2Dc",
  authDomain: "difm-law-aa3a6.firebaseapp.com",
  projectId: "difm-law-aa3a6",
  storageBucket: "difm-law-aa3a6.appspot.com",
  messagingSenderId: "273862122226",
  appId: "1:273862122226:web:bc0b382d1c5165fa34ce6b",
  measurementId: "G-F83ZD8019L"
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
// export const Admin = admin(firebaseConfig);
// export { admin };
