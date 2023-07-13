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
                   <img src={dummy} alt="dummy" className='' style={{width:"225%",height:"100%",marginLeft:"-24px"}}/>
                 </div>
                 
              </div>
          </div>
          <div className="col-md-8">
              <div className='msg_1'>
              <div className=" mb-4 px-5" >
                <div className="card-body">
                    <form>
                        {/* <!-- Form Row--> */}
                        <div className="row gx-3 mb-1">
                            <div className="col-md-6">
                                <label className="small mb-1 text-white" for="inputFirstName">Full Name</label>
                                <div class="input-group mb-3">
                                 <input className="form-control " id="inputFirstName" type="text"/>
                                 <span class="input-group-text btns-primary border-prime bolder"><i class="bi bi-person"></i></span>
                               </div>
                            </div>
                            <div className="col-md-6">
                                <label className="small mb-1 text-white" for="inputEmail">Email</label>
                                <div class="input-group mb-3">
                                <input className="form-control " id="inputEmail" type="email"  disabled/>
                                 <span class="input-group-text btns-primary border-prime" ><i class="bi bi-envelope-open"></i></span>
                               </div>
                            </div>
                        </div>
                        <div className="row gx-3 mb-1">
                        <div className="col-md-6">
                                <label className="small mb-1 text-white" for="inputMobile">Mobile</label> 
                                <div class="input-group mb-3">
                                  <input className="form-control " id="inputMobile" type="tel"/>
                                  <span class="input-group-text btns-primary border-prime" ><i class="bi bi-telephone"></i></span>
                                </div>    
                            </div>
                            
                            <div className="col-md-6">
                                <label className="small mb-1 text-white" for="inputExperience">Experience</label>
                                <select id="inputExperience" 
                                  class="form-select">
                                       <option selected></option>
                                        <option value="1 Year">1 Year</option>
                                         <option value="2 Year">2 Years</option>
                                          <option value="3 Year">3 Years</option>
                                          <option value="4 Year">4 Years</option>
                                             <option value="5 Year">5 Years</option>
                                               <option value="6 Year">6 Years</option>
                                                  <option value="7 Year">7 Years</option>
                                                     <option value="8 Year" >8 Years</option>
                                                <option value="9 Year">9 Years</option>
                                                   <option value="10+ Year">10+ Years</option>
                                     </select>
                            
                            </div>
                        </div>
                       
                        <div className="row gx-3 mb-1">
                            <div className="col-md-6">
                                <label className="small mb-1 text-white" for="inputSpecialization">Specialization</label>
                                <select id="inputSpecialization"  class="form-select">
                                   <option selected></option>
                                   <option value="Injury Lawyers">Injury Lawyers</option>
                                     <option value="Family Law Lawyers">Family Law Lawyers</option>
                                       <option value="Defense Lawyers">Defense Lawyers</option>
                                       <option value="Corporate Lawyers">Corporate Lawyers</option>
                                       <option value="Immigration Lawyers">Immigration Lawyers</option>
                                          <option value="Property Lawyers">Property Lawyers</option>
                                       <option value="Real Estate Lawyers">Real Estate Lawyers</option>
                                   <option value="Employment Lawyers">Employment Lawyers</option>
                                 </select>
                            
                            </div>
                           
                            <div className="col-md-6">
                                <label className="small mb-1 text-white" for="inputEducation">Education</label>   
                                <div class="input-group mb-3">
                                <input className="form-control " id="inputEducation" type="text" name="education" placeholder="Describe your education qualifications"  required/>
                                  <span class="input-group-text btns-primary border-prime" ><i class="bi bi-person-fill"></i></span>
                                </div>
                            </div>
                        </div>
                        <div className="row gx-3 mb-3">
                            <div className="col-md-6">
                                <label className="small mb-1 text-white" for="inputWork">Work Type</label>
                                <div class="input-group mb-3">
                                <select id="inputWork"  class="form-select">
                                 <option selected>Choose..</option>
                                   <option value="Full Day">Full Day</option>
                                    <option value="Half Day">Half Day</option>
                                </select>
                              </div>
                            </div>
                           
                            <div className="col-md-6">
                            <label className="small mb-1 text-white" for="inputWork">Enter or choose location</label>
                            <div class="input-group mb-3">
                             <input type="text" class="form-control" id="inputZip" placeholder="Location, country, city, state..." />
                             <span class="input-group-text btns-primary" ><i class="bi bi-geo-alt"></i></span>
                           </div>
                            </div>
                        </div>
                        <div class="col-md-12">
                        <label for="inputZip" class="form-label text-white">Bio/Profile Summary</label>
                        <textarea class="form-control ed text-primary" maxLength="250"  id="form6Example7" rows="4" ></textarea>
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
