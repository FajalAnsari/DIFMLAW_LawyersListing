import React from 'react';
import { dummy } from '../../images';
import "./review_section.css";

const Add_Comment = () => {
  return (
    <>
    <div className="add-comment py-4 px-4 rounded-3  border border-prime border-1" style={{backgroundColor:"var(--fourth-primary)"}}>
      <div className="row">
        <div className="col-md-2">
          <img src={dummy} alt="" className='w-100 rounded-circle'/>
        </div>
        <div className="col-md-10">
            <div className="row">
                <div className="col-md-8">
                  <p className='fs-6' style={{color:"var(--third-secondary)"}}>Fajal Ansari<br />June 2, 2023</p>
                </div>
                <div className="col-md-4">
                 <div className="btns-primary d-flex px-1 w-50" style={{height:"23px"}}>
                 <i class="bi bi-star me-1"></i>
                 <i class="bi bi-star me-1"></i>
                 <i class="bi bi-star me-1"></i>
                 <i class="bi bi-star me-1"></i>
                 <i class="bi bi-star me-1"></i>
                  <div className=' px-2 ' style={{height:"23px",backgroundColor:"var(--third-secondary)"}}>
                    <p className='fs-6 fw-bold font-color' style={{marginTop:"-2px"}}>5.0</p>
                  </div>
                 </div>
                </div>
                <p style={{fontSize:"13px",color:"var(--text-color)"}}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consequat nunc ac a magna at elementum. Cras arcu varius in aliquam habitant fermentum. Mi sit lorem mollis vitae quis curabitur vestibulum.<br/><br/>

                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consequat nunc ac a magna at elementum. Cras arcu varius in aliquam habitant fermentum. Mi sit lorem mollis vitae quis curabitur vestibulum.<br/><br/>

                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consequat nunc ac a magna at elementum. Cras arcu varius in aliquam habitant fermentum. Mi sit lorem mollis vitae quis curabitur vestibulum.
                </p>
                <hr
              className="mb-1 ms-2 add_com"
            />
            </div>
        </div>
      </div>
      </div>
    </>
  )
}

export default Add_Comment
