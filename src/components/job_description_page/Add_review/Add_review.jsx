import React from 'react'
import "./Add_review.css";
const Add_review = () => {
  return (
    <>
    <div className='mt-5 '>
      <div className='review p-4'>
        <div className='d-flex'>
        <div><p className='text-white'>Write A Review</p></div>
        <div className='float-right'><p className='fs-1 font-color'><i class="bi bi-caret-down-fill"></i></p></div>

        </div>
        <div className='row'>
          <div className='col-lg-6'>
            <div className='row'>
              <div className='col-lg-6'>
                <p>Your Rating</p>
              </div>
              <div className='col-lg-6'>
              <i class="bi bi-star"></i>
              </div>
            </div>
          </div>
          <div className='col-lg-6'>

          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Add_review