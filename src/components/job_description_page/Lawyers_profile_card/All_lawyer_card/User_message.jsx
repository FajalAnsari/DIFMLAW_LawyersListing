import React from 'react';
import { dummy } from '../../../images';

const User_message = () => {
  return (
    <>
      <div class="mt-4 conatiner">
          <div className="p-4 border border-prime rounded review">
            <div class="text-center">
                <h4 class="font-color">Recent Messages</h4>
            </div>
            <div class=" d-flex align-items-center justify-content-center mt-2">
                <div class=" col-md-12">
                    <div class="p-4 rounded shadow-md">
                    <div className='all_lmsg p-1 mb-4' style={{width:"115%",marginLeft:"-30px"}}>
                           <div className="row"> 
                              <div className="col-md-2">
                                <div className='mt-1 all_lmsg1' style={{marginLeft:"8px"}}>
                                <img src={dummy} alt="dummy" width="40"/>
                                </div>
                              </div>
                              <div className="col-md-10">
                                <p className='text-white mt-1 w-100' style={{marginLeft:"-5px",fontSize:"12px",lineHeight:"16px"}}>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used Lorem text mesgaes</p>
                              </div>
                              </div>
                           </div>
                        <button class="btn btns-primary" style={{width:"100%"}}>
                            View All
                        </button>
                    </div>
                </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default User_message
