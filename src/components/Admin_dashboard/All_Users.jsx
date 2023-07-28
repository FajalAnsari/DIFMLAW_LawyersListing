import React, {useEffect, useState} from 'react';
import { collection, deleteDoc, doc, getDocs} from "firebase/firestore";
import { db } from '../../firebase';
import "./admin.css";
import { useNavigate } from 'react-router-dom';

const All_Users = () => {
    const navigate = useNavigate();
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

    // delete the user
    const handleDelete = async (id) => {
  
   const confirmDelete = window.confirm('Are you sure you want to delete this User?');

   if (confirmDelete) {
     // User confirmed, proceed with deletion
     // Your deletion logic here...
     await deleteDoc(doc(db, "users", id));
     alert(`Deleting the user ID: ${id}`);
   } else {
     // User canceled the deletion
     alert('Deletion canceled.');
   }
    
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
               <div className="input-group mt-3 px-4 ">
                  <div className="form-outline">
                    <button type="button" className="btn btns-primary">
                     Filter 
                    </button>
                 </div>
              <select id="inputState" className="form-select contect-bgColors selct" style={{width:"10%"}}>
                 <option selected>latest</option>
                 <option value="Full Day">Full Day</option>
                 <option value="Half Day">Half Day</option>
              </select>
             </div>
         </div>
      </div>
      <div class="table-responsive" id="no-more-tables">
       <table className="table ">
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
                                                <td data-title="Name">{element.username}</td>
                                                <td data-title="Email">{element.email}</td>
                                                <td data-title="Date">34/09/2023</td>                                             
                                                <td data-title="Address">{element.address || "N/A"}</td>
                                                <td className="d-flex justify-content-between" data-title="Action">
                                                  <p style={{color:"green"}}><i className="bi bi-eye" onClick={() => navigate(`/lawyer_dashboard/user_profile/${element.uid}`)}></i></p>
                                                  <p style={{color:"skyblue"}}><i className="bi bi-pencil" onClick={() => navigate(`/lawyer_dashboard/user_profile/${element.uid}`)}></i></p>
                                                  <p style={{color:"red"}}><i className="bi bi-trash3" onClick={() =>{handleDelete(element.id)}}></i></p>
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
    </div>
  )
}

export default All_Users
