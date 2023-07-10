import React from 'react';

const Add_Comment = () => {
  return (
    <>
    <div className="add-comment bg-secondary py-4 px-4 rounded-3  border border-prime border-1">
      <div className="row">
        <div className="col-md-2">
          <img src="https://www.dlf.pt/dfpng/middlepng/569-5693658_dummy-user-image-png-transparent-png.png" alt="" className='w-75 rounded-circle'/>
        </div>
        <div className="col-md-10">
            <div className="row">
                <div className="col-md-8">
                  <p className='fs-5 font-color'>Fajal Ansari<br />June 2, 2023</p>
                </div>
                <div className="col-md-4">
                 <div className="btns-primary px-2 w-50">
                 <i class="bi bi-star"></i>
                 <i class="bi bi-star"></i>
                 <i class="bi bi-star"></i>
                 <i class="bi bi-star"></i>
                 <i class="bi bi-star"></i>
                 {/* <i><p>5.0</p></i> */}
                 </div>
                </div>
                <p className='text-white' style={{fontSize:"13px"}}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consequat nunc ac a magna at elementum. Cras arcu varius in aliquam habitant fermentum. Mi sit lorem mollis vitae quis curabitur vestibulum.<br/><br/>

                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consequat nunc ac a magna at elementum. Cras arcu varius in aliquam habitant fermentum. Mi sit lorem mollis vitae quis curabitur vestibulum.<br/><br/>

                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consequat nunc ac a magna at elementum. Cras arcu varius in aliquam habitant fermentum. Mi sit lorem mollis vitae quis curabitur vestibulum.
                </p>
            </div>
        </div>
      </div>
      </div>
    </>
  )
}

export default Add_Comment
