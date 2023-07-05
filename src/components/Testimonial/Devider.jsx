import React from 'react'
import "./Testimonial.css";
import { icon_devider} from '../images';

const Devider = () => {
  return (
    <>
      <div className="container mt-5 p-5  devider_page">
        <div className="asa">
            <img src={icon_devider} alt="icon" className='img-fluids' />
        </div>
      </div>
    </>
  )
}

export default Devider
