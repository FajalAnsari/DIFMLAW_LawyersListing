import React from 'react'

const Default_page = () => {
  return (
    <div className='container'>
       <div className="row shadow mx-auto " style={{borderRadius: "20px", marginTop:"105px", padding: "5%", marginBottom: "105px"}}>
       <div className="col-md-6">
       <p className="fs-1 fw-bold text-center">
                404 - {" "}
                <span id="suggest">
                Page Not
                </span>{" "}
                <span>
                  <b>Found</b>
                </span>
              </p>
              <p className='text-center'>Sorry, the page you are looking for does not exist.</p>
        </div> 

        <div className="col-md-6 col">
        <a className="btn btn-primary ms-5 cont mt-5 w-75 " href="/">
          Back to Home
        </a>
        </div>   
    </div> 
    </div>
  )
}

export default Default_page
