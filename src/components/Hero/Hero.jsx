import React from 'react'
import law from "../images/DIFMLAW-Findlaw.png";
import Category from './Category';
import "../../index.css";
import "./Hero.css";

const Hero = () => {
  return (
    <>
   {/* <!-- ======= Hero Section ======= --> */}
  <section id="hero" class="d-flex align-items-center">

    <div class="container">
      <div class="row">
        <div class="col-lg-6 d-flex flex-column justify-content-center pt-4 pt-lg-0 order-2 order-lg-1" data-aos="fade-up" data-aos-delay="200">
          <h2 className='fq-1'>Find the<br />
          <span className='t-1 '>Right Lawyer</span></h2>
          <h2 className='fq-2 mb-4'>For Your Legal Needs</h2>
        
      <div class="row no-pad me-2">
        <div class="col-md-4 col-5 "><input type="search" placeholder='Search Lawyers' class="form-control s-3" /></div>
        <div class="col-md-4 col-6"><input type="search" placeholder='Search by Location' class="form-control s-2" /></div>
        <div class="col-md-4 col-1"><button type="button" class="btn btn-primary s-1"><i class="bi bi-search"></i></button></div>
      </div>
        </div>
        <div class="col-lg-6 order-1 order-lg-2" data-aos="zoom-in" data-aos-delay="200">
          <img src={law} class="w-75 mt-4 mx-5" alt=""/>
        </div>
      </div>
    </div>

  </section>
  {/* <!-- End Hero --> */}
  <Category />
    </>
  )
}

export default Hero
