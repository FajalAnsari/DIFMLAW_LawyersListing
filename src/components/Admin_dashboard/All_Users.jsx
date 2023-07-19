import React, {useEffect, useState} from 'react';
import { collection, getDocs} from "firebase/firestore";
import { db } from '../../firebase';
import "./admin.css";


const All_Users = () => {

    const [lawyers, setLawyers] = useState([]);
  const fetchPost = async () => {
       
    await getDocs(collection(db, "users"))
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
    <div className='admindash mt-5 mb-5 form-control'>
    <div className="row">
            <div className="col-md-10">
                <p className='px-4 text-white mt-4'>All Users</p>
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
                                <th scope="col">User Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Request Date</th>
                                <th scope="col">Location</th>
                                <th scope="col">Action</th>
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
                                                <td>{element.address || "N/A"}</td>
                                                <td className="d-flex justify-content-between">
                                                  <p style={{color:"green"}}><i class="bi bi-eye"></i></p>
                                                  <p style={{color:"skyblue"}}><i class="bi bi-pencil" onClick={()=>{alert(element.id)}} ></i></p>
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

export default All_Users