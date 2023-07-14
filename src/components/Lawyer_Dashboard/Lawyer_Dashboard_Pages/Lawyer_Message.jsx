import React from 'react';
import "./Dashboard.css";
import { dummy } from '../../images';

const Lawyer_Message = () => {
  return (
    <>
      <div className="lawyer_message" id='message'>
         <div className="row">
            <div className="col-md-4">
               <div className='user_pro'>
                   <div className="d-flex px-4  usersl um">
                     <img src={dummy} alt="dummy" className='mt-1' style={{width:"20%",height:"20%"}}/>
                     <p className='ms-3 mt-2 fs-6 text-white'>Fajal Ansari</p>
                   </div>
                   <div className="d-flex px-4  usersl mt-2">
                     <img src={dummy} alt="dummy" className='mt-1' style={{width:"20%",height:"20%"}}/>
                     <p className='ms-3 mt-2 fs-6 text-white'>Fajal Ansari</p>
                   </div>
                   <div className="d-flex px-4  usersl mt-2">
                     <img src={dummy} alt="dummy" className='mt-1' style={{width:"20%",height:"20%"}}/>
                     <p className='ms-3 mt-2 fs-6 text-white'>Fajal Ansari</p>
                   </div>
                   <div className="d-flex px-4  usersl mt-2">
                     <img src={dummy} alt="dummy" className='mt-1' style={{width:"20%",height:"20%"}}/>
                     <p className='ms-3 mt-2 fs-6 text-white'>Fajal Ansari</p>
                   </div>
                   <div className="d-flex px-4  usersl mt-2">
                     <img src={dummy} alt="dummy" className='mt-1' style={{width:"20%",height:"20%"}}/>
                     <p className='ms-3 mt-2 fs-6 text-white'>Fajal Ansari</p>
                   </div>
                   <div className="d-flex px-4  usersl mt-2">
                     <img src={dummy} alt="dummy" className='mt-1' style={{width:"20%",height:"20%"}}/>
                     <p className='ms-3 mt-2 fs-6 text-white'>Fajal Ansari</p>
                   </div>
                </div>
            </div>
            <div className="col-md-8">
                <div className='msg_1'>
                   <div className='text_msg1 py-4 px-5 text-white'>
                    <p><b>Phone No. :</b> 7800504006</p>
                    <p><b>Email :</b> Fajal@difm.tech</p>
                    <p className='fs-5 pb'><b>Message :</b> In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.</p>
                   </div>
                   <div className="text_msg2 py-4 px-5 text-white">
                     <p>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.</p>
                   </div>
                </div>
            </div>
         </div>
      </div>
    </>
  )
}

export default Lawyer_Message
