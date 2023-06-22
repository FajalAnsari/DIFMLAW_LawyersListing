import React, {useEffect, useState} from 'react';
import { and, collection, getDocs, or, query, where} from "firebase/firestore";
import { db } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';


const AllLawyersection = (props) => {
    const navigate = useNavigate();
    const [lawyers, setLawyers] = useState([]);
    const [getSelectValue, setSelectValue] =useState([]);
    const [getCheckboxData, setCheckboxData] = useState("");
    const [set, unset] = useState(false);
    const fetchPost = async () => {
      
    await getDocs(collection(db, "lawyers"))
        .then((querySnapshot)=>{              
            const newData = querySnapshot.docs
                .map((doc) => ({...doc.data(), id:doc.id }));
            setLawyers(newData);                
            
        }) 
    }
     // get select option value data
    const selected = async () => {
  
      const q = query(collection(db, "lawyers"), where("work", "==", props.type))
    

           await getDocs(q).then((qq) => {
        const newData = qq.docs
        .map((doc) => ({...doc.data(), id:doc.id }));
        setSelectValue(newData);                
        console.log(getSelectValue);
      });
      unset(true); 
    }

    // get checkbox data
    
    const checked = async () => {
      const citiesRef = collection(db, "lawyers");
     const a = query(citiesRef,
        and( or( where("specialization", "==", props.checkbox), where("work", "==", props.checkbox),  where("address", "==", props.checkbox) ),
          
        )
      )
           await getDocs(a).then((res) => {
        const catData = res.docs
        .map((doc) => ({...doc.data(), id:doc.id }));
        setCheckboxData(catData);  

    
      });
    
    }
   
   


useEffect(()=>{
    fetchPost();
}, [])

const [currentPage, setCurrentPage] = useState(0);
const usersPerPage = 6;
const offset = currentPage * usersPerPage;
const currentUsers = lawyers.slice(offset, offset + usersPerPage);
const currentUser = getSelectValue.slice(offset, offset + usersPerPage);
const currentCheckboxUser = getCheckboxData.slice(offset, offset + usersPerPage);

  return (
    <>
    { 
     !set && (
      currentUsers.filter((item)=>{return props.name.toLowerCase() === '' ? item : item.specialization.toLowerCase().includes(props.name) }).filter((items)=>{return props.location.toLowerCase() === '' ? items : items.address.toLowerCase().includes(props.location)}).filter((item)=>{return props.type === '' ? item : selected() }).filter((item)=>{return props.checkbox === '' ? item : checked() }).map((data,i)=>(
        <div className='view_buttons mt-4 alllawyersection border border-dark'>
    <div className="row mx-auto"> 
    <div className="col-md-6">
        <div className="row">
           <div className="col-md-3 mt-3">
               <img src={data.image} className='rounded-full lawpicd' alt="lawyer_profile" />
          </div>

          <div className="col-md-9">
          <h4 className='mt-2'>{data.specialization}</h4>
          <h5 className='nam fs-6'>{data.username}</h5>
          <div className='d-flex'>
          <p className='fs-6'>{data.work}</p>
          <p className='fs-6 mx-4'>{data.experience}  in practice</p>
          </div>
          </div>
        </div>
    </div>

    <div className="col-md-6">
        <div className="row">
           <div className="col-md-10 d-flex justify-content-end">
           <button className="btn btn-primary cont profi w-75" onClick={(e)=> navigate(`/job/${data.id}`)}>
             View Profile
           </button>
          </div>

          <div className="col-md-1 mx-3">
          <i class="bi bi-bookmark fw-bold fs-3"></i>
          <p className='fs-6 savelist'>save</p>
          </div>
        </div>
    </div>
    </div>
 </div>
 ))
 )
    }


    { 
     set && (
      currentUser.filter((item)=>{return props.name.toLowerCase() === '' ? item : item.specialization.toLowerCase().includes(props.name) }).filter((items)=>{return props.location.toLowerCase() === '' ? items : items.address.toLowerCase().includes(props.location)}).filter((item)=>{return props.checkbox === '' ? item : checked() }).map((data,i)=>(
        <div className='view_buttons mt-4 alllawyersection border border-dark'>
    <div className="row mx-auto"> 
    <div className="col-md-6">
        <div className="row">
           <div className="col-md-3 mt-3">
               <img src={data.image} className='rounded-full lawpicd' alt="lawyer_profile" />
          </div>

          <div className="col-md-9">
          <h4 className='mt-2'>{data.specialization}</h4>
          <h5 className='nam fs-6'>{data.username}</h5>
          <div className='d-flex'>
          <p className='fs-6'>{data.work}</p>
          <p className='fs-6 mx-4'>{data.experience}  in practice</p>
          </div>
          </div>
        </div>
    </div>

    <div className="col-md-6">
        <div className="row">
           <div className="col-md-10 d-flex justify-content-end">
           <button className="btn btn-primary cont profi w-75" onClick={(e)=> navigate(`/job/${data.id}`)}>
             View Profile
           </button>
          </div>

          <div className="col-md-1 mx-3">
          <i class="bi bi-bookmark fw-bold fs-3"></i>
          <p className='fs-6 savelist'>save</p>
          </div>
        </div>
    </div>
    </div>
 </div>
 ))
 )
 
 
    }
 
    

<div id="react-paginate" className='mt-5'>
          <ReactPaginate
            previousLabel={<i className="bi bi-arrow-left-circle-fill m-2 "></i>}
            nextLabel={<i className="bi bi-arrow-right-circle-fill m-2"></i>}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={Math.ceil(lawyers.length / usersPerPage)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={(data) => setCurrentPage(data.selected)}
            containerClassName={'pagination'}
            activeClassName={'active'}
            previousClassName={'paginate-prev'}
            nextClassName={'paginate-next'}
          />
          </div>
 </>
  )
}

export default AllLawyersection