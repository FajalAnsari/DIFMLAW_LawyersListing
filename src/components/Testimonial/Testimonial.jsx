import React from 'react';
import "./Testimonial.css";
import { Testimonial_icon, testimonial_reviewicon,Image_testimonial,Image_testimonial2,Image_testimonial3,Image_testimonial4 } from '../images'

const Testimonial = () => {
  return (
    <>
    <div className="container">
       <h2 className='text-white text-center deviders1'>User’s Opinion & Review</h2> 
       <img src={Testimonial_icon} alt="Testimonial"  className='mx-auto d-block mt-4'/>
       <div className="row mt-5">
         <div className="col-md-3 col-sm-6 SSLSD">
             <div className='testimonial1 w-75'>
                <span><img src={testimonial_reviewicon} alt="testimonial_reviewicon" style={{width: "12%"}}/></span>
                <p className='text-white textimonial-p'>There are  of Lorem Ipsum available, but the majority have su alteration in some form, by injected oir  which don't look even slightly believable.</p>
             </div>
             <div className="row  mt-4 devider2">
                <div className="col-lg-4 col-sm-5 col-3 mts">
                   <img src={Image_testimonial}></img>
               </div>
               <div className="col-lg-8 col-sm-7 col-9 mts">
                 <h4 className="text-white me-4">Nattasha</h4>
                 <p className="fs-5 text-white">Injury Lawyers</p>
               </div>
            </div>
         </div>

         <div className="col-md-3 col-sm-6">
            <div className="row  mt-2 devider2">
                <div className="col-lg-4 col-sm-5 col-3 mts">
                   <img src={Image_testimonial2}></img>
               </div>
               <div className="col-lg-8 col-sm-7 col-9 mts">
                 <h4 className="text-white me-4">Minci pall</h4>
                 <p className="fs-5 text-white">Defense Lawyers</p>
               </div>
            </div>
            <div className='testimonial1 w-75 mt-2 mtss'>
                <span><img src={testimonial_reviewicon} alt="testimonial_reviewicon" style={{width: "12%"}}/></span>
                <p className='text-white textimonial-p'>There are  of Lorem Ipsum available, but the majority have su alteration in some form, by injected oir  which don't look even slightly believable.</p>
             </div>

         </div>

         <div className="col-md-3 SSLSD col-sm-6">
         <div className='testimonial1 w-75'>
                <span><img src={testimonial_reviewicon} alt="testimonial_reviewicon" style={{width: "12%"}}/></span>
                <p className='text-white textimonial-p'>There are  of Lorem Ipsum available, but the majority have su alteration in some form, by injected oir  which don't look even slightly believable.</p>
             </div>
             <div className="row  mt-4 devider2">
                <div className="col-lg-4 col-sm-5 col-3 mts">
                   <img src={Image_testimonial3}></img>
               </div>
               <div className="col-lg-8 col-sm-7 col-9 mts">
                 <h4 className="text-white me-4">Julia Rose</h4>
                 <p className="fs-5 text-white">Property Lawyers</p>
               </div>
            </div>

         </div>

         <div className="col-md-3 col-sm-6">
          <div className="row  mt-2 devider2">
                <div className="col-lg-4 col-sm-5 col-3 mts">
                   <img src={Image_testimonial4}></img>
               </div>
               <div className="col-lg-8 col-sm-7 col-9 mts">
                 <h4 className="text-white me-4">John David</h4>
                 <p className="fs-5 text-white">Corporate Lawyers</p>
               </div>
            </div>
            <div className='testimonial1 w-75 mt-2 mtss'>
                <span><img src={testimonial_reviewicon} alt="testimonial_reviewicon" style={{width: "12%"}}/></span>
                <p className='text-white textimonial-p'>There are  of Lorem Ipsum available, but the majority have su alteration in some form, by injected oir  which don't look even slightly believable.</p>
             </div>


         </div>
       </div>
     </div>
    </>
  )
}

export default Testimonial
