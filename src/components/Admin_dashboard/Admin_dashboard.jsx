import React, {useEffect, useState} from 'react';
import { collection, getDocs} from "firebase/firestore";
import { db } from '../../firebase';


const Admin_dashboard = () => {

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
    <div className='container mt-5 mb-5 form-control'>
       <table class="table ">
                        <thead>
                            <tr className="table-light">
                                <th scope="col">User Name</th>
                                <th scope="col">Lawyer Time</th>
                                <th scope="col">Request Date</th>
                                <th scope="col">Expertise In</th>
                                <th scope="col"> Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                lawyers.map((element, id) => {
                                    return (
                                        <>
                                            <tr>
                                                <td>{element.username}</td>
                                                <td>{element.work}</td>
                                                <td>34/09/2023</td>                                             
                                                <td>Technolocgy</td>
                                                <td className="d-flex justify-content-between">
                                                  <i class="bi bi-check2-circle"></i>
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
  )
}

export default Admin_dashboard
