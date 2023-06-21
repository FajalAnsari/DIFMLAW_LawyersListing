import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { useFirebase } from '../firebase';

const Protected = (props) => {
  const firebase = useFirebase();
    const {Component} = props;
    const navigate = useNavigate();

    useEffect(() => {
       let login =firebase.isLoggedIn;
       if(!login){
        // alert("First you have to login!");
        navigate('/login');
       }
    },[firebase, navigate]);
  return (
    <div>
      <Component />
    </div>
  )
}

export default Protected