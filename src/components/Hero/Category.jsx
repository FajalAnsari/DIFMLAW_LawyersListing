import React from 'react';
import "./Category.css";
import Contect_us from '../Contect_now/Contect_now';
import CategoryCards from "./CategoryCards";
import { category } from "../constant/data";
import Join_Network from '../join_network/Join_Network';
import Lawyerscards from './Lawyerscards';
import { useAuthState } from "react-firebase-hooks/auth";
import Testimonial from '../Testimonial/Testimonial';
import { auth } from '../../firebase';
import Contect_sugg from '../About_page/Contect_sugg';



const Category = () => {
  const [user, loading] = useAuthState(auth);

  return (
    <>
      <div className="section-2">
        <div className="container ">
          <div className="row">
            <div className="col-lg-6">
              <h1 className="mt-4 text-white">
                Explore by
                <span id="cat" className="ms-2">
                  categories
                </span>
              </h1>
            </div>
            <div className="col-lg-6 ">
              <a href="/alllawyer" className='text-white'>
              <div className="d-flex mt-4 float-xl-end">
                <p className="fs-6 fw-bold mt-2">Show all lawyers</p>
                <i class="bi bi-arrow-right ms-2 fs-2 font-color arr"></i>
              </div>
              </a>
            </div>
          </div>

          {/* law categories start */}
          <div className="row categories">
            {/* injury lawyer */}
            {category.map((category) => (
              <CategoryCards key={category.id} {...category} />
            ))}
            {/* injury lawyer */}
          </div>
          {/* law categories end */}

          {/* suggestions field */}
          <Contect_us />
        </div>
      </div>

      {/* lawyers featued start */}

      <div className="lawyers">
        <div className="container  pb-5">
          <div className="row">
            <div className="col-lg-6 featured">
              <h1 className="mt-4 text-white">
                Featured
                <span id="cat" className="ms-2">
                  Lawyers
                </span>
              </h1>
            </div>
            <div className="col-lg-6 featured">
            <a href="/alllawyer" className='text-dark'>
              <div className="d-flex mt-4 float-xl-end sal">
                <p className="fs-6 fw-bold mt-2 text-white">Show all lawyers</p>
                <i class="bi bi-arrow-right ms-2 fs-2 font-color arr"></i>
              </div>
            </a>
            </div>
          </div>

          {/* lawyers featured end */}
          <Lawyerscards />
        </div> 
        {/* lawyers featued end */}
      </div>
      {user ? (
         <div className='container'>
         <Contect_sugg />
         </div>
       ) : ( 
        <>
         {/* join network start */}
       <div className='cat_law'>
       <div className='container'>
      <Join_Network /> 
      </div>
      </div>
      </>
       )}

      
      {/* join network end */}


      <Testimonial />
    </>
  );
};

export default Category;
