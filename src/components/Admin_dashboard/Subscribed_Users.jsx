import React, { useState } from 'react'
import "./admin.css";
import { collection, deleteDoc, doc, getDocs} from "firebase/firestore";
import { db } from '../../firebase';
const Subscribed_Users = () => {
    const [subscribed_users, setSubcribed_users] = useState([]);
    const allSubscriber = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "subscribed_users"));
            // const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id, createdAtDate: createdAtDate ? createdAtDate.toLocaleDateString() : null, }));
            // setSubcribed_users((prevSubscribedUsers) => [...prevSubscribedUsers, ...newData]);
          
            const newData = querySnapshot.docs.map((doc) => {
                const data = doc.data();
                const createdAtDate = data.date?.toDate ? data.date.toDate() : null;
      
                return {
                  id: doc.id,
                  ...data,
                  createdAtDate: createdAtDate ? createdAtDate.toLocaleDateString() : null,
                };
              });
      
              setSubcribed_users(newData);
              console.log(subscribed_users);
        } catch (error) {
            // Handle any errors that occur during data fetching
            console.error("Error fetching subscribed users:", error);
        }
    }


    // delete the subscribers
 const handleDelete = async (id) => {

const confirmDelete = window.confirm('Are you sure you want to delete this Subscriber ?');

if (confirmDelete) {
 
  await deleteDoc(doc(db, "subscribed_users", id));
  alert(`Deleting the user ID: ${id}`);
} else {
  // User canceled the deletion
  alert('Deletion canceled.');
}
 }
//  useEffect(()=>{
    allSubscriber();
//  })
  return (
    <>
        <div className='admin_dashboard'>
    <div className='admindash mt-5 mb-5 form-control'>
    <div className="row">
            <div className="col-md-10">
                <p className='px-4 text-white mt-4'>All Subscribed Users</p>
            </div>
            <div className="col-md-2">
               <div class="input-group mt-3 px-4 ">
                  <div class="form-outline">
                    <button type="button" class="btn nt btns-primary">
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
      <div class="table-responsive" id="no-more-tables">
       <table class="table ">
                        <thead>
                            <tr className='text-white'>
                                <th scope="col">I.D</th>
                                <th scope="col">Email</th>
                                <th scope="col">Request Date</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                                subscribed_users.map((element, id) => {
                                    return (
                                        <>
                                            <tr className='text-white'>
                                                <th scope="row">{(id + 1).toString().padStart(2, '0')}</th>
                                             
                                                <td data-title="Email">{element.email}</td>
                                                <td data-title="Req. Date">{element.createdAtDate}</td>                                             
                                        
                                                <td className="d-flex justify-content-between">
                                                 
                                                  <p style={{color:"red"}}><i class="bi bi-trash3" onClick={() =>{handleDelete(element.id)}}></i></p>
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
    </>
  )
}

export default Subscribed_Users