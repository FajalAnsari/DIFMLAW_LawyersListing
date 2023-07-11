import React, { useState } from 'react'
import "./Add_review.css";
const Add_review = () => {
   // State to show/hide accordion
   const [show, setShow] = useState(false);
   const handleOpen = () => {
     setShow(!show); // Toggle accordion
   };
  return (
    <>
    <div className='mt-5 '>
      <div className='review p-4'>
        <div className='row'>
        <div className='col-lg-6 col-6'><p className='text-white'>Write A Review</p></div>
        <div className='col-lg-6 col-6'><p className='fs-1 font-color d-flex justify-content-end' onClick={handleOpen}><i class="bi bi-caret-down-fill"></i></p></div>

        </div>
        <div style={{backgroundColor:'var(--second-secondary)'}} className='p-3'>
        <div className='row'>
          <div className='col-lg-6'>
            <div className='row'>
              <div className='col-lg-6'>
                <p>Your Rating</p>
              </div>
              <div className='col-lg-6'>
                <div className='d-flex justify-content-end mt-2'>
                {[...Array(5)].map(star => {
                   return   <i class="bi bi-star"></i>
                })}
            </div>
              </div>
            </div>
          </div>
          <div className='col-lg-6'>
            <div className='d-flex justify-content-end'>
            <label for='file'><div className='bg-secondary p-2 text-white'>Browse Image</div></label>
            <input type='file' name='file' id='file' className='d-none'></input>
            </div>
          </div>
        </div>
        </div>
             {/* write your review start */}
             <div className=''>
      {show && (
          <div className="accordian-body">
           <p className='text-white'>Title</p>
          <div className='row'>
            </div>
          </div>
        )}
        </div>
         {/* write your review end */}
      </div>
 
    </div>
    </>
  )
}

export default Add_review