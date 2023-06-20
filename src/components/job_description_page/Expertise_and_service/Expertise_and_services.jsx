import React from 'react'
import { Link } from "react-router-dom";

const Expertise_and_services = (props) => {
  return (
    <div className='row border law border border-primary rounded mt-5 p-4'>
        <h2>Expertise and Services</h2>
        <p className='fs-5 overflow-hidden'> I am a practitioner of family law I have been working since 2010 ............................. .............................................................................................................................................</p>
        <h2>Requirements:</h2>
        <div className='row'>
            <div className='col-lg-6'>
                <div className='row'>
                    <div className='col-lg-6 col-6'>
                        <p className='fw-bold fs-6'>Practice Areas</p>
                        <p className='fw-bold fs-6'>Experience</p>
                        <p className='fw-bold fs-6'>Rating</p>
                        <p className='fw-bold fs-6'>Fees</p>
                    </div>
                    <div className='col-lg-6 col-6'>
                        <p className='fs-6'>Family, Divorce</p>
                        <p className='fs-6'>{props.experience}</p>
                        <p className='fs-6'>5</p>
                        <p className='fs-6'>$10</p>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-lg-6 col-6'>
                        <Link to="/contect_us"><button className='btn btn-primary'>Connect Now</button></Link>
                    </div>
                    <div className='col-lg-6 col-6'>
                    <Link to="/"><button className='btn btn-secondary'>Back</button></Link>
                    </div>
                </div>
            </div>
         



            <div className='col-lg-6'></div>
        </div>
    </div>
  )
}

export default Expertise_and_services