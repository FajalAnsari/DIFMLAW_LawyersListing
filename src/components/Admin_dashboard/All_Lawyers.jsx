import React, {useEffect, useState} from 'react';
import { collection, deleteDoc, doc, getDocs} from "firebase/firestore";
import { db } from '../../firebase';
import "./admin.css";
import { useNavigate } from 'react-router-dom';


const All_Lawyers = () => {

    const [lawyers, setLawyers] = useState([]);
    const [checked, setChecked] = useState([]);
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
      // delete the lawyer
      const handleDelete = async (id) => {
  
        const confirmDelete = window.confirm('Are you sure you want to delete this Lawyer?');
     
        if (confirmDelete) {
          // User confirmed, proceed with deletion
          // Your deletion logic here...
          await deleteDoc(doc(db, "lawyers", id));
          alert(`Deleting the lawyer ID: ${id}`);
        } else {
          // User canceled the deletion
          alert('Deletion canceled.');
        }
         
         }
         const handleCheckAllChange = (e) => {
            const isChecked = e.target.checked;
            setChecked(isChecked ? lawyers.map((c) => c.id) : []);
          };
             // checkbox click delete all user
    const handleCountryChange = (e, element) => {
        const isChecked = e.target.checked;

        if (isChecked) {
          // If the checkbox is checked, add the element's username to the checked array
          setChecked((prevChecked) => [...prevChecked, element.id]);
        } else {
          // If the checkbox is unchecked, remove the element's username from the checked array
          setChecked((prevChecked) =>
            prevChecked.filter((item) => item !== element.id)
          );
        }
      };
      const handleDeleteSelected = async () => {
        const confirmDelete = window.confirm('Are you sure you want to delete the Lawyers?');
        if(confirmDelete){
                // Filter out the selected countries from the countries list
        const filteredusers = lawyers.filter(
            (c) => !checked.includes(c.id)
          );
          setChecked([]);
          setLawyers(filteredusers); // Update the countries array without the selected countries
           // Loop through the selected usernames and delete each user
      for (const id of checked) {
          const userToDelete = lawyers.find((u) => u.id === id);
          if (userToDelete) {
            await deleteDoc(doc(db, "lawyers", userToDelete.id));
            alert(`Deleted user with username: ${id}`);
          }
        }

        }
        else {
            // User canceled the deletion
            alert('Deletion canceled.');
          }
    
      };

useEffect(()=>{
    fetchPost();
}, [])



  return (
    <div className='admin_dashboard'>
    <div className='mt-5 mb-5 form-control admindash'>
        <div className="row">
            <div className="col-md-10 col-sm-8 d-flex">
                <p className='px-4 text-white mt-4'>All Lawyers</p>
                <div>
      <button className='bt btns-primary mt-3 ms-4 p-1 input-group' onClick={handleDeleteSelected}>Delete All</button></div>
            </div>
            
            <div className="col-md-2 col-sm-4">
               <div className="input-group mt-3 px-4 ">
                  <div className="form-outline">
                    <button type="button" className="btn nt btns-primary">
                     Filter 
                    </button>
                 </div>
              <select id="inputState" className="form-select contect-bgColors selct" style={{width:"10%"}}>
                 <option selected>latest</option>
                 <option value="Full Day">VIP</option>
              </select>
             </div>
         </div>
      </div>
      <div class="table-responsive" id="no-more-tables">
       <table className="table ">
                        <thead>
                            <tr className='text-white'>
                            <th scope="col"><input
          className="form-check-input"
          type="checkbox"
          id="selectAll"
          checked={checked.length === lawyers.length}
          onChange={handleCheckAllChange}
        />
        <label className="form-check-label text-white ms-2" htmlFor="selectAll">
          Select all
        </label></th>
                                <th scope="col">I.D</th>
                                <th scope="col">Lawyers Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Registration Date</th>
                                <th scope="col">Location</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                lawyers.map((element, id) => {
                                    return (
                                        <>
                                            <tr className='text-white rounded-3'>
                                            <td>
                    <input
            className="form-check-input"
            type="checkbox"
            id={element.id}


            
            checked={checked.includes(element.id)}
            onChange={(e) => handleCountryChange(e, element)}
          />
                  
                </td>
                                                <th scope="row" >{(id + 1).toString().padStart(2, '0')}</th>
                                                <td data-title="Name">{element.username}</td>
                                                <td data-title="Email">{element.email}</td>
                                                <td data-title="Reg. Date">34/09/2023</td>                                             
                                                <td data-title="Location">{element.address || "N/A"}</td>
                                                <td className="d-flex justify-content-between" data-title="Action">
                                                  <p style={{color:"green"}}><i className="bi bi-eye" onClick={() => navigate(`/lawyer_dashboard/profile/${element.uid}`)}></i></p>
                                                  <p style={{color:"skyblue"}}><i className="bi bi-pencil" onClick={() => navigate(`/lawyer_dashboard/profile/${element.uid}`)}></i></p>
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

export default All_Lawyers
