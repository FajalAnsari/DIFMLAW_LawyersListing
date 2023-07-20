import React, { useEffect } from 'react'
import law from "../images/DIFMLAW-Findlaw.svg";
import Category from './Category';
import "../../index.css";
import "./Hero.css";

const Hero = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  })
  return (
    <>
      {/* <!-- ======= Hero Section ======= --> */}
      <section id="hero" class="d-flex align-items-center main">
        <div class="container heroes">
          <div class="row">
            <div class="col-lg-6 d-flex flex-column justify-content-center pt-4 pt-lg-0 text-white order-2 order-lg-1" data-aos="fade-up" data-aos-delay="200">
              <h2 className='fq-1 t2 mt-5'>Find the<br />
                <span className='t-1 t2'>Right Lawyer</span></h2>
              <h2 className='fq-2 mb-4 t2'>For Your Legal Needs</h2>

              <div className="row no-pad me-2">
                <div className="col-md-4 col-5">
                  <input type="text" placeholder="Search By Category" className="form-control s-3" list="categoryOptions" />
                  <datalist id="categoryOptions">
                    <option value="Injury Lawyers" />
                    <option value="Family Law Lawyers" />
                    <option value="Defense Lawyers" />
                    <option value="Corporate Lawyers" />
                    <option value="Immigration Lawyers" />
                    <option value="Property Lawyers" />
                  </datalist>
                </div>
                <div className="col-md-4 col-6">
                  <input type="search" placeholder="Search By Location" className="form-control s-2" />
                </div>
                <div className="col-md-4 col-1">
                  <button type="button" className="btn btns-primary s-1"><i className="bi bi-search"></i></button>
                </div>
              </div>
            </div>
            <div class="col-lg-6 order-1 order-lg-2" data-aos="zoom-in" data-aos-delay="200">

              <img src={law} class="w-75 mt-4 mx-5 lawfind1" alt="lawfind" />
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
