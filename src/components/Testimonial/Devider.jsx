import React from 'react'
import "./Testimonial.css";
import { Devider_left , Devider_right ,icon_diver} from '../images';

const Devider = () => {
  return (
    <>
      <div className="container mt-5 p-5  devider_page">
        <div className="row">
            <div className="col-md-5 col-sm-5 col-5">
             <img src={Devider_left} alt="devider" className='Devider_left'/>
            </div>
            <div className="col-md-2 col-sm-2 col-2 d-flex">
                <img src={icon_diver} alt="icon devder" className='icon-diver'/>
                <p className='text-white mt-2 ms-2'>DIFM LAW</p>
            </div>
            <div className="col-md-5 col-sm-5 col-5">
            <img src={Devider_right} alt="devider" className='ms-4'/>
            </div>
            
        </div>
      </div>
    </>
  )
}

export default Devider
