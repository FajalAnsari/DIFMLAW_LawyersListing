import React from 'react'
import "./Dashboard.css";
import { dummy } from '../../images';
import { Link } from 'react-router-dom';

const Lawyer_Profiles = () => {

  return (
    <>
    <div className="lawyer_profile" id='message'>
       <div className="row">
          <div className="col-md-4">
             <div className='user_pro'>
                 <div className="d-flex px-4 border border-prime border-4 rounded-full  um">
<<<<<<< HEAD
                   <img src={dummy} alt="dummy" className='' style={{width:"225%",height:"100%",marginLeft:"-24px"}}/>
                  <label for='changepic' style={{marginTop:'67px'}}><span className='text-white' style={{fontSize:'12px', marginLeft:'-68px'}}>Change</span></label>
                  <input type='file' name='file' id='changepic' className='d-none'></input>
=======
                   <img src={dummy} alt="dummy" className='umm' style={{width:"225%",height:"100%",marginLeft:"-24px"}}/>
>>>>>>> cb2c9e60160635a50af4db5c9c9ba1600aab1b51
                 </div>
                 
              </div>
          </div>
          <div className="col-md-8">
              <div className='msg_1'>
              <div className=" mb-4 px-5 py-5" >
                <div className="card-body">
                    <form>
                        {/* <!-- Form Row--> */}
                        <div className="row gx-3 mb-1">
                            <div className="col-md-6 mbs1">
                                <label className="small mb-1 text-white " for="inputFirstName">Full Name</label>
                                <div class="input-group mb-3 mbs">
                                 <input className="form-control contect-bgColors" id="inputFirstName" type="text"/>
                                 <span class="input-group-text btns-primary border-prime bolder dm"><i class="bi bi-person"></i></span>
                               </div>
                            </div>
                            <div className="col-md-6 mbs1">
                                <label className="small mb-1 text-white" for="inputEmail">Email</label>
                                <div class="input-group mb-3 mbs">
                                <input className="form-control contect-bgColors dm" id="inputEmail" type="email"  disabled/>
                                 <span class="input-group-text btns-primary border-prime dm" ><i class="bi bi-envelope-open"></i></span>
                               </div>
                            </div>
                        </div>
                        <div className="row gx-3 mb-1">
                        <div className="col-md-6 mbs1">
                                <label className="small mb-1 text-white" for="inputMobile">Mobile</label> 
                                <div class="input-group mb-3 mbs">
                                  <input className="form-control contect-bgColors dm" id="inputMobile" type="tel"/>
                                  <span class="input-group-text btns-primary border-prime dm" ><i class="bi bi-telephone"></i></span>
                                </div>    
                            </div>
                            
                            <div className="col-md-6 mbs1">
                                <label className="small mb-1 text-white" for="inputExperience">Experience</label>    
                                <div class="input-group mb-3 mbs">
                                <input className="form-control contect-bgColors" id="inputExperience" type="text"/>
                                <span class="input-group-text btns-primary border-prime dm" ><i class="bi bi-briefcase-fill"></i></span>
                              </div>
                            </div>
                        </div>
                       
                        <div className="row gx-3 mb-1">
                            <div className="col-md-6 mbs1">
                                <label className="small mb-1 text-white" for="inputSpecialization">Specialization</label>
                                <div class="input-group mb-3 mbs">
                                <input className="form-control contect-bgColors" id="inputSpecialization" type="text"/>
                                <span class="input-group-text btns-primary border-prime dm" ><i class="bi bi-person-fill"></i></span>
                              </div>
                            
                            </div>
                           
                            <div className="col-md-6 mbs1">
                                <label className="small mb-1 text-white" for="inputEducation">Education</label>   
                                <div class="input-group mb-3 mbs">
                                <input className="form-control contect-bgColors" id="inputEducation" type="text" name="education" placeholder="Describe your education qualifications"  required/>
                                  <span class="input-group-text btns-primary border-prime dm" ><i class="bi bi-person-fill"></i></span>
                                </div>
                            </div>
                        </div>
                        <div className="row gx-3 mb-3">
                            <div className="col-md-6 mbs1">
                                <label className="small mb-1 text-white" for="inputWork">Work Type</label>
                                <div class="input-group mb-3 mbs">
                                <input className="form-control contect-bgColors" id="inputWor" type="text"/>
                                <span class="input-group-text btns-primary border-prime dm" ><i class="bi bi-person-workspace"></i></span>
                              </div>
                            </div>
                           
                            <div className="col-md-6 mbs1">
                            <label className="small mb-1 text-white" for="inputWork">Enter or choose location</label>
                            <div class="input-group mb-3 mbs">
                             <input type="text" class="form-control contect-bgColors" id="inputZip" placeholder="Location, country, city, state..." />
                             <span class="input-group-text btns-primary dm" ><i class="bi bi-geo-alt"></i></span>
                           </div>
                            </div>
                        </div>
                        <div class="col-md-12 mbs1">
                        <label for="inputZip" class="form-label text-white">Bio/Profile Summary</label>
                        <textarea class="form-control ed text-primary contect-bgColors" maxLength="250"  id="form6Example7" rows="4" ></textarea>
                        </div>
                        <div className="row gutters">
			                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-4">
				                      <div className="text-end">
					                      <Link to="/"><button type="button" id="submits" name="submit" className="btn btn-secondary">Cancel</button></Link>
					                      <button type="submit" id="submit" name="submit" className="btn btns-primary ms-2">Update</button>
				                     </div>
			                     </div>
		                     </div>
      
                    </form>
                </div>
            </div>
        </div>
              </div>
          </div>
       </div>
    
  </>
  )
}

export default Lawyer_Profiles
