import React, {useEffect, useState} from 'react';
import { collection, getDocs} from "firebase/firestore";
import { db } from '../../firebase';
import "./admin.css";
import { useNavigate } from 'react-router-dom';


const All_Lawyers = () => {

    const [lawyers, setLawyers] = useState([]);
    const navigate = useNavigate();
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
    <div className='mt-5 mb-5 form-control admindash'>
        <div className="row">
            <div className="col-md-10">
                <p className='px-4 text-white mt-4'>All Lawyers</p>
            </div>
            <div className="col-md-2">
               <div class="input-group mt-3 px-4 ">
                  <div class="form-outline">
                    <button type="button" class="btn btns-primary">
                     Filter 
                    </button>
                 </div>
              <select id="inputState" class="form-select contect-bgColors selct" style={{width:"10%"}}>
                 <option selected>latest</option>
                 <option value="Full Day">Full Day</option>
                 <option value="Half Day">Half Day</option>
              </select>
             </div>
         </div>
      </div>
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
                                                <th scope="row">{(id + 1).toString().padStart(2, '0')}</th>
                                                <td>{element.username}</td>
                                                <td>{element.email}</td>
                                                <td>34/09/2023</td>                                             
                                                <td>{element.address}</td>
                                                <td className="d-flex justify-content-between">
                                                  <p style={{color:"green"}}><i class="bi bi-eye" onClick={() => navigate(`/lawyer_dashboard/profile/${element.uid}`)}></i></p>
                                                  <p style={{color:"skyblue"}}><i class="bi bi-pencil" onClick={() => navigate(`/lawyer_dashboard/profile/${element.uid}`)}></i></p>
                                                  <p style={{color:"red"}}><i class="bi bi-trash3"></i></p>
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
