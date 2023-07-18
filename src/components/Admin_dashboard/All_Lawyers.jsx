import React, {useEffect, useState} from 'react';
import { collection, getDocs} from "firebase/firestore";
import { db } from '../../firebase';
import "./admin.css";


const All_Lawyers = () => {

    const [lawyers, setLawyers] = useState([]);
  const fetchPost = async () => {
       
    await getDocs(collection(db, "lawyers"))
        .then((querySnapshot)=>{              
            const newData = querySnapshot.docs
                .map((doc) => ({...doc.data(), id:doc.id }));
            setLawyers(newData);                
            console.log(lawyers);
        }) 
    }

useEffect(()=>{
    fetchPost();
}, [])

  return (
    <div className='admin_dashboard'>
    <div className='container mt-5 mb-5 form-control' style={{backgroundColor:"var(--fourth-primary)"}}>
       <table class="table ">
                        <thead>
                            <tr className='text-white'>
                                <th scope="col">I.D</th>
                                <th scope="col">Lawyers Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Registration Date</th>
                                <th scope="col">Loaction</th>
                                <th scope="col"> Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                lawyers.map((element, id) => {
                                    return (
                                        <>
                                            <tr className='text-white'>
                                                <th scope="row">0{id + 1}</th>
                                                <td>{element.username}</td>
                                                <td>{element.email}</td>
                                                <td>34/09/2023</td>                                             
                                                <td>{element.address}</td>
                                                <td className="d-flex justify-content-between">
                                                  <i class="bi bi-eye"></i>
                                                  <i class="bi bi-pencil"></i>
                                                  <i class="bi bi-trash3"></i>
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })
                            }
                        </tbody>
                    </table>

    </div>
    </div>
  )
}

export default All_Lawyers
