import React from 'react'

const Contect_sugg = () => {
  return (
    <>
       <div className="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
       <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">Hello</button>
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content border border-prime border-3">
      <div className="modal-header">
        <h4 className="modal-title mx-5" id="exampleModalToggleLabel">Contact Now For Our Suggestion dfuihfsduoerg replace it</h4>
      </div>
      <div className='container'>
      <div className="mb-3 mt-4">
  <label for="exampleFormControlInput1" className="form-label">Enter Email or Phone </label>
  <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Enter your email"/>
</div>
<div className="mb-3">
  <label for="exampleFormControlTextarea1" className="form-label">Write your message</label>
  <textarea className="form-control" placeholder='Write your message' id="exampleFormControlTextarea1" rows="3"></textarea>
</div>
</div>
      <div className="mx-auto mb-4">
        <button className="btn btns-primary" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal" data-bs-dismiss="modal">Submit</button>
      </div>
    </div>
  </div>
</div>
<div className="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabindex="-1">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content border border-prime border-3">
      <h5 className=" text-center mt-4">
      Thank you for contacting us we’ll get back to you shortly with some awesome lawyers.
      </h5>
      <a href='/' className="mx-auto mb-4 text-decoration-none mt-4">
        <button className="btn btns-primary" data-bs-target="#exampleModalToggle" data-bs-toggle="modal" data-bs-dismiss="modal">Back to Home</button>
      </a>
    </div>
  </div>
</div>


     <div className="row shadow p-5 mb-5 mx-auto consugg" style={{borderRadius: "20px"}}>
       <div className="col-md-6">
       <p className="fs-1 fw-bold text-center text-white">
                Want{" "}
                <span id="suggest">
                  Our Suggestions
                </span>{" "}
                <span>
                  <b>?</b>
                </span>
              </p>
        </div> 

        <div className="col-md-6 col">
        <a className="btn btns-primary ms-5 cont mt-4 w-75 " data-bs-toggle="modal" href="#exampleModalToggle" role="button">
          Contact Now
        </a>
        </div>   
    </div> 
    </>
  )
}

export default Contect_sugg
