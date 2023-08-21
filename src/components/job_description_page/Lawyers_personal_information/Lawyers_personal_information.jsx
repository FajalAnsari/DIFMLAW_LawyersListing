import React from 'react'
import "./Lawyer_personal_info.css";
import { Link } from 'react-router-dom';
const Lawyers_personal_information = (props) => {
  return (
    <div className='row mt-5 law p-4 border border-prime rounded' style={{backgroundColor: "var(--second-secondary)"}}>
        
      <h3 className='bt-primary p-2 fs-5'>Lawyer's Profile Information</h3>
      <p className='fs-6'>Basic contact Information</p>
      <div className='row'>
        <div className='col-lg-6'>
            <div className='row'>
                <div className='col-lg-6 col-6'>
                    <p className='info fw-bold'>Phone No.</p>
                    <p className='info fw-bold'>Email</p>
                    <p className='info fw-bold'>Location</p>
                    <p className='info fw-bold'>Work time</p>
                    <p className='info fw-bold'>Website</p>
                </div>
                <div className='col-lg-6 col-6'>
                    <p className='info'>{props.Phone || "N/A"}</p>
                    <p className='info'>{props.Email || "N/A"}</p>
                    <p className='info'>{props.Address || "N/A"}</p>
                    <p className='info'>{props.Work || "N/A"}</p>
                    <Link to={window.location.href}><p className='info'>{window.location.href}</p></Link>
                </div>
            </div>
        </div>
        <div className='col-lg-6'></div>
      </div>

    </div>
  )
}

export default Lawyers_personal_information