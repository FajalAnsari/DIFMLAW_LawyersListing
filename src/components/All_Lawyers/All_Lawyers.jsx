import React, { useState } from 'react';
import "./AllLawyer.css";
import { lawyer_pic } from '../images';
import { alllawyercategory } from '../constant/data';
import Lawyerscards from '../Hero/Lawyerscards';
import AllLawyersection from './AllLawyersection';
import { collection, getCountFromServer } from "firebase/firestore";
import { db } from '../../firebase';

const All_Lawyers = () => {
  const [totalLawyers, setTotalLawyers] = useState(0);
  const [selectedValue, setSelectedValue] = useState('');


  const [searchLawyer, setLawyerSearch] = useState("");
  const [lawyeradd, setLawyeradd] = useState("");

  const SubmitLawyer = () =>{
    console.log(searchLawyer);
    alert("search lawyer");
  }
// total lawyers count
const total_count = async () => {
  const coll = collection(db, "lawyers");
  const snapshot = await getCountFromServer(coll);
  setTotalLawyers(snapshot.data().count);

}
total_count();

  return (
    <>
   
<div class="container">
<h1 className='text-center' id='dis'>Discover more than <span className='discov'>5000+ Lawyers</span></h1>
<div className="col-10 mx-auto">
    <div class="row mt-5 ">
      <div class="col-lg-5 col-md-6 col-sm-12 col-12 col-xl-5">
        <div class="input-group mb-3">
          <input type="text" class="form-control" onChange={(e)=> setLawyerSearch(e.target.value)} placeholder="Enter job title, keyword..."/>
          <span class="input-group-text"><i class="bi bi-search"></i></span>
        </div>
      </div>
      <div class="col-lg-5 col-md-6 col-sm-12 col-12 col-xl-5">
        <div class="input-group mb-3">
          <input type="text" class="form-control" onChange={(e)=> setLawyeradd(e.target.value)} placeholder="Location, country, city, state..."/>
          <span class="input-group-text" ><i class="bi bi-geo-alt"></i></span>
        </div>
      </div>
      <div class="col-lg-2 col-md-12 col-sm-12 col-12 col-xl-2">
        <button class="btn btn-primary btn-block" onClick={SubmitLawyer}>Search</button>
      </div>
      </div>
      <p className='fs-6'>Popular searches :  Defense Lawyers, Real Estate </p>
    </div>   
    
    <div className="col-12 mx-auto mt-5">
    <div className="row mx-auto">

    <div className="col-md-4">
    {alllawyercategory.map((service) => (
      <>
         <h4 className='mt-3'>{service.title}</h4>
         {service.children &&
            service.children.map((child) => (
         <div class="form-check mt-2">
          <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
           <label class="form-check-label" for="flexCheckDefault">
           {child.title}
           </label>
        </div>
         ))}
        </>
      ))}
    </div>
  
  <div className="col-md-8">
     <div className="row">
        <div className="col-md-6">
         <h4>All Lawyers</h4>
         <p className='fs-6'>Showing {totalLawyers} results</p> 
        </div>


        <div class="col-lg-6 col-md-6 col-sm-12 col-12 ">
        <div class="input-group mb-3">
        <span class="input-group-text btn-primary" >Sort by : </span>
          <select id="inputState"  class="form-select" onChange={(e)=>setSelectedValue(e.target.value)}>
            <option selected> Most relevant</option>
            <option value="Full Day">Full Day</option>
            <option value="Half Day">Half Day</option>
        </select> 
        </div>
       </div>

      {/* all lawyer section cards start */}
       <AllLawyersection name={searchLawyer} location={lawyeradd} type={selectedValue}/>
      {/* all lawyer section cards end */}

     </div>
   </div>

    </div>
    </div>

    <div className="bg-white">
        <div className="container  pb-5">
          <div className="row">
            <div className="col-lg-6 featured">
              <h1 className="mt-4">
              Recommended
                <span id="cat" className="ms-2">
                  Lawyers
                </span>
              </h1>
            </div>
            <div className="col-lg-6 featured" >
              <div className="d-flex mt-4 float-xl-end">
                <p className="fs-6 fw-bold mt-2"><a href='#dis' className='text-decoration-none fs-5 text-dark'>Show all lawyers</a></p>
                <i class="bi bi-arrow-right ms-2 fs-2"></i>
              </div>
            </div>
          </div>

          {/* lawyers featured end */}
          <Lawyerscards />
        </div> 
        {/* lawyers featued end */}
      </div>   

  </div>
    </>
  )
}

export default All_Lawyers
