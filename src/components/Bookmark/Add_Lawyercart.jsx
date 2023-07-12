import React from 'react'

const Add_Lawyercart = ({add_Lawyercart}) => {
  
  return (
    <div className="row mx-auto lawyers_profile">
      <div className="col-lg-3 rounded-3 lawyer ecard mt-4  card shadow p-3 mb-5 bg-body rounded lawyers-card">
        <div className="row  mt-2" id="lawyer">
          <div className="col-lg-4 col-sm-4 col-6">
            <img src={add_Lawyercart.image} className="ms-2 lawpics" alt='lawyer_card'></img>
          </div>
          <div className="col-lg-8 col-sm-8 col-6">
            <p className="fs-6 mb-0 pb-1 h6">{add_Lawyercart.username}</p>
            <p className="city">{add_Lawyercart.address}</p>
          </div>
        </div>

        <span className="fs-5 fw-normal text-center">{add_Lawyercart.specialization}</span>

        <div className="mt-3 ms-3 me-3">
          <p className="font-weight-bold fs-6 mb-1">{add_Lawyercart.work}</p>
          <p className="fs-6 lawyers-desc font-weight-normal lh-base text-justify summ">
            {add_Lawyercart.summary}
          </p>
          <div className="row mt-4 practice">
            <div className="col-lg-6 col-sm-6 col-6">
              <span className="fs-6 exp">{add_Lawyercart.experience} in practice</span>
            </div>
            <div className="col-lg-6 col-sm-6 col-6">
              <button className="btn btns-primary sfcs viewbtn">
                View Profile
              </button>
              <div className="col-md-1 mx-3 res4">
          <i class="bi bi-bookmark fw-bold fs-3"></i>
          <p className='fs-6 savelist'>save</p>
          </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Add_Lawyercart
