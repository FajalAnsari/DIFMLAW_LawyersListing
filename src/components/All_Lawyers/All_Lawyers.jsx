import React, { useState, useEffect } from 'react';
import "./AllLawyer.css";
import Testimonial from '../Testimonial/Testimonial';
import { alllawyercategory } from '../constant/data';
import Lawyerscards from '../Hero/Lawyerscards';
import { db } from '../../firebase';
import { collection, getCountFromServer, and, getDocs, or, query, where, addDoc, setDoc, doc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import Contect_sugg from '../About_page/Contect_sugg';
import { useParams } from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../../firebase';
import "./all_lawyersketeton.css";
import Skeleton from 'react-loading-skeleton';

const All_Lawyers = () => {

  const [addLayerwishlist, setAddLawyerwishlist] = useState("");

  const params = useParams();
  const [userRole, setUserRole] = useState(null);
  // alllawyer section code start

  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);   //if lawyer login bookmark not show
  const [lawyers, setLawyers] = useState([]);
  const fetchPost = async () => {
<<<<<<< HEAD
    await getDocs(collection(db, "lawyers"))
      .then((querySnapshot) => {
        const newData = querySnapshot.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }));
        setLawyers(newData);

      })
=======
    loginUserORLawyer();
  await getDocs(collection(db, "lawyers"))
      .then((querySnapshot)=>{              
          const newData = querySnapshot.docs
              .map((doc) => ({...doc.data(), id:doc.id }));
          setLawyers(newData);                
          
      }) 
      
>>>>>>> d45adb89b059359ab08315d0dfb41bbd760b55be
  }
const loginUserORLawyer = async () => {
  if(user){
    const q = query(collection(db, "lawyers"), where("uid", "==", user.uid));
    const q1 = query(collection(db, "users"), where("uid", "==", user.uid));


<<<<<<< HEAD
  // getting current user uid
  function GetLawyerUid() {
    const [uid, setUid] = useState(null);
    useEffect(() => {
      auth.onAuthStateChanged(user => {
        if (user) {
          setUid(user.uid);
        }
      })
    }, [])
=======
    const docs = await getDocs(q);
    const info = await getDocs(q1)
   
    // lawyer auth
    if (docs.empty) {
      console.log("No matching documents.");
    } else {
      docs.forEach((doc) => {
        const data = doc.data();
        console.log(data);
        console.log("lawyer login");
        setUserRole("lawyer");
       
      });
    }
    // user auth
    if (info.empty) {
      console.log("No matching documents.");
    } else {
      info.forEach((doc) => {
        const data = doc.data();
        console.log(data);
        console.log("user login");
        setUserRole("user");
        // setImage(data.image);
      });
    }

  }
}

   // getting current user uid
   function GetLawyerUid(){
    const [uid, setUid]=useState(null);
    useEffect(()=>{
        auth.onAuthStateChanged(user=>{
            if(user){
                setUid(user.uid);
            }
        })
    },[])
>>>>>>> d45adb89b059359ab08315d0dfb41bbd760b55be
    return uid;
  }

  const uids = GetLawyerUid();



<<<<<<< HEAD
  useEffect(() => {
    fetchPost();
    console.log(params.cat);
  }, [])
=======
// useEffect(()=>{
 
  fetchPost();
  
  
  
  console.log(params.cat);
// }, [])
>>>>>>> d45adb89b059359ab08315d0dfb41bbd760b55be

  const [currentPage, setCurrentPage] = useState(0);
  const usersPerPage = 6;
  const offset = currentPage * usersPerPage;
  const currentUsers = lawyers.slice(offset, offset + usersPerPage);


  // alllawyer section code end
  const [totalLawyers, setTotalLawyers] = useState(0);
  const [selectedValue, setSelectedValue] = useState('');
  const [getcheckbox, setCheckbox] = useState("");

  const [searchLawyer, setLawyerSearch] = useState("");
  const [lawyeradd, setLawyeradd] = useState("");

  const SubmitLawyer = async (e) => {
    e.preventDefault();
    console.log(searchLawyer);
    console.log(lawyeradd);
    if (!searchLawyer == "" || !lawyeradd == "") {
      const citiesRef = collection(db, "lawyers");

      const q1 = query(citiesRef,
        or(and(where("specialization", "==", searchLawyer), where("address", "==", lawyeradd))

        )
      )


      await getDocs(q1).then((qq) => {
        const newData = qq.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }));
        setLawyers(newData);
        console.log(lawyers);
      });

    }
    else {
      alert("choose value!")
    }

  }
  // reset search
  const handleReset = () => {

    fetchPost();
  }
  // lawyer name search

  const BynameSearch = async () => {
    var input = document.getElementById("lawyername");
    var value = input.value.toLowerCase();
    var capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
    input.value = capitalizedValue;

    console.log(input.value);


    const q = query(collection(db, "lawyers"), where("specialization", "==", searchLawyer))
    console.log(searchLawyer);
    await getDocs(q).then((qq) => {
      const newData = qq.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }));
      setLawyers(newData);
      console.log(lawyers);
    });
  }

  // lawyer location search

  const ByLocationSearch = async () => {
    // console.log(lawyeradd);
    const q = query(collection(db, "lawyers"), where("address", "==", lawyeradd))
    await getDocs(q).then((qq) => {
      const newData = qq.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }));
      setLawyers(newData);
      console.log(lawyers);
    });
  }
  //  laywer select option filled

  const handleSelectValue = async (e) => {
    setSelectedValue(e.target.value);
    const q = query(collection(db, "lawyers"), where("work", "==", e.target.value))
    await getDocs(q).then((qq) => {
      const newData = qq.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }));
      setLawyers(newData);
      console.log(lawyers);
    });
  }

  // total lawyers count
  const total_count = async () => {
    const coll = collection(db, "lawyers");
    const snapshot = await getCountFromServer(coll);
    setTotalLawyers(snapshot.data().count);

  }
  total_count();

  // lawyer checkbox filter

  async function handleCheckbox(e) {
    setCheckbox(e.target.value);
    var get = setCheckbox(e.target.value);
    console.log(getcheckbox);
    const citiesRef = collection(db, "lawyers");
    const a = query(citiesRef,
      and(or(where("specialization", "==", e.target.value), where("work", "==", e.target.value), where("address", "==", e.target.value)),

      )
    )
    await getDocs(a).then((res) => {
      const catData = res.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }));
      setLawyers(catData);


    });

  }


  const checkboxes = document.querySelectorAll('input[type="checkbox"]');

  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function () {
      if (this.checked) {
        checkboxes.forEach(otherCheckbox => {
          if (otherCheckbox !== this) {
            otherCheckbox.checked = false;
          }
        });
      }
    });
  });

  const filterData = () => {
    var para = document.getElementById("filters");
    if (para.style.display === 'none') {
      para.style.display = 'block';
    } else {
      para.style.display = 'none';
    }
  }

  const addToLawyer = async (uid) => {
    if (uids !== null) {

      const q = query(collection(db, 'lawyers'), where('uid', '==', uid));
      const res = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        res.push({
          id: doc.id,
          ...doc.data()
        });
      });

      try {
        const cartCollectionRef = collection(db, `Cart ${uids}`);

        for (const item of res) {
          const cartDocRef = doc(cartCollectionRef);
          await setDoc(cartDocRef, item);
        }

        console.log('Successfully added to cart');
      } catch (error) {
        console.error('Error adding to cart:', error);
      }

      console.log(res);
    } else {
      navigate('/login');
    }
  };




  return (
    <>

      <div class="container" style={{marginTop:"100px"}}>
        <h1 className='text-center text-white' id='dis'>Discover more than <span className='font-color'>5000+ Lawyers</span></h1>
        <div className="col-10 mx-auto">
          <div class="row mt-5 ">
            <div class="col-lg-5 col-md-6 col-sm-12 col-12 col-xl-5">
              <div class="input-group mb-3">
                <input type="text" class="form-control" id="lawyername" onChange={(e) => setLawyerSearch(e.target.value)} placeholder="Enter job title, keyword..." />
                <span class="input-group-text btns-primary border-prime"><i class="bi bi-search" onClick={BynameSearch}></i></span>
              </div>
            </div>
            <div class="col-lg-5 col-md-6 col-sm-12 col-12 col-xl-5">
              <div class="input-group mb-3">
                <input type="text" class="form-control" onChange={(e) => setLawyeradd(e.target.value)} placeholder="Location, country, city, state..." />
                <span class="input-group-text btns-primary border-prime"><i class="bi bi-geo-alt" onClick={ByLocationSearch}></i></span>
              </div>
            </div>
            <div class="col-lg-2 col-md-12 col-sm-12 col-12 col-xl-2">
              <button class="btn btns-primary border-prime btn-block" onClick={SubmitLawyer}>Search</button>
              <button class="btn btns-primary border-prime btn-block ms-2" onClick={handleReset}>Reset</button>
            </div>
          </div>
          <p className='fs-6 text-white pop'>Popular searches :  Defense Lawyers, Real Estate </p>
        </div>

        <div className="text-center filter_btn" onClick={filterData}>
          <button className='btns-primary rounded-pill p-1 border-prime' style={{ width: "45%" }}>Filters</button>
        </div>

        <div className="col-12 mx-auto mt-5">
          <div className="row mx-auto">

            <div className="col-md-4" id='filters'>
              {alllawyercategory.map((service) => (
                <>
                  <h4 className='mt-3 font-color'>{service.title}</h4>
                  {service.children &&
                    service.children.map((child) => (
                      <div class="form-check mt-2">
                        {/* checked={child.title===params.cat} */}
                        <input class="form-check-input" type="checkbox" name='check' value={child.title} id="flexCheckDefault" onClick={handleCheckbox} />
                        <label class="form-check-label text-white" for="flexCheckDefault">
                          {child.title}
                        </label>
                      </div>
                    ))}
                </>
              ))}
            </div>

            <div className="col-md-8">
              <div className="row">
                <div className="col-md-6">
                  <h4 className='font-color'>All Lawyers</h4>
                  <p className='fs-6 text-white'>Showing {totalLawyers} results</p>
                </div>


                <div class="col-lg-6 col-md-6 col-sm-12 col-12 ">
                  <div class="input-group mb-3">
                    <span class="input-group-text border-prime btns-primary" >Sort by : </span>
                    <select id="inputState" class="form-select" onChange={handleSelectValue}>
                      <option selected> Most relevant</option>
                      <option value="Full Day">Full Day</option>
                      <option value="Half Day">Half Day</option>
                    </select>
                  </div>
                </div>



                {/* all lawyer section cards start */}

                {currentUsers.length === 0 ? (
                  <div>
                    {[...Array(10)].map((_, i) => (
                      <div className='view_buttons mt-4 alllawyersection border border-dark' key={i}>
                        <div className="row mx-auto">
                          <div className="col-md-6">
                            <Skeleton circle={true}  width={100} />
                            <Skeleton count={-2} />
                            <div className="row">
                            <div className="col-md-3">
                                <div className='skeleton1 loading-animation'></div>
                            </div>
                            <div className="col-md-9">
                              <h4 className=' font-color skeleton2 rounded-pill loading-animation'></h4>
                              <div className='d-flex'>
                                <div className='nam fs-6 text-white text-capitalize skeleton3 rounded-pill loading-animation' ></div>
                                <div className='mx-auto nameloc skeleton4 rounded-pill loading-animation'></div></div>
                              <div className='d-flex'>
                                <div className=' skeleton5 rounded-pill loading-animation'></div>
                                <div className=' ms-4 skeleton6 rounded-pill loading-animation'></div>
                              </div>
                            </div>
                          </div>
                          </div>
                          <div className="col-md-6">
                            <div className="row mb-3">
                            <div className="col-md-10 d-flex justify-content-end">
                              <div className="w-75 p-4  skeleton7 rounded-pill loading-animation">
                                
                              </div>
                            </div>
                            <div className="col-md-1 mx-3 res4" style={{opacity:"65%"}}>
                            <i class="bi bi-bookmark-fill fw-bold fs-3"></i>
                            </div>
                          </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  currentUsers.map((data, i) => (
                    <div className='view_buttons mt-4 alllawyersection border border-dark'>
                      <div className="row mx-auto">
                        <div className="col-md-6">
                          <div className="row">
                            <div className="col-md-3 mt-3">
                              <img src={data.image} className='rounded-full lawpicd' alt="lawyer_profile" />
                            </div>
                            <div className="col-md-9">
                              <h4 className='mt-2 font-color'>{data.specialization}</h4>
                              <div className='d-flex mt-3'><h5 className='nam fs-6 text-white text-capitalize'>{data.username}</h5>
                                <div className='mx-auto nameloc'><h5 className='fs-6 ms-2 text-capitalize' style={{ marginTop: "-7px" }}> <i class="bi bi-geo-alt"></i> {data.address}</h5></div></div>
                              <div className='d-flex'>
                                <p className='fs-6 text-white'>{data.work}</p>
                                <p className='fs-6 mx-4 text-white lawexp'>{data.experience}  in practice</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="row">
                            <div className="col-md-10 d-flex justify-content-end">
                              <button className="btn btns-primary cont profi w-75" onClick={(e) => navigate(`/job/${data.id}`)}>
                                View Profile
                              </button>
                            </div>
                            <div className="col-md-1 mx-3 res4" onClick={() => addToLawyer(data.uid)}>
                              <i class="bi bi-bookmark fw-bold fs-3"></i>
                              <p className='fs-6 savelist'>save</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                  ))
                )}

                    {/* all lawyer section cards end */}

                <div id="react-paginate" className='mt-5'>
                  <ReactPaginate
                    previousLabel={<i className="bi bi-arrow-left-circle-fill m-2 "></i>}
                    nextLabel={<i className="bi bi-arrow-right-circle-fill m-2"></i>}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={Math.ceil(lawyers.length / usersPerPage)}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={(data) => setCurrentPage(data.selected)}
                    containerClassName={'pagination'}
                    activeClassName={'active'}
                    previousClassName={'paginate-prev'}
                    nextClassName={'paginate-next'}
                  />
                </div>
                {/* <AllLawyersection name={searchLawyer} location={lawyeradd} type={selectedValue} checkbox={getcheckbox} /> */}

                {/* all lawyer section cards end */}

              </div>
            </div>
          </div>
        </div>
      </div>
<<<<<<< HEAD
      <div className="lawyrscard6">
=======
      <div class="col-lg-5 col-md-6 col-sm-12 col-12 col-xl-5">
        <div class="input-group mb-3">
          <input type="text" class="form-control" onChange={(e)=> setLawyeradd(e.target.value)} placeholder="Location, country, city, state..."/>
          <span class="input-group-text btns-primary"><i class="bi bi-geo-alt" onClick={ByLocationSearch}></i></span>
        </div>
      </div>
      <div class="col-lg-2 col-md-12 col-sm-12 col-12 col-xl-2">
        <button class="btn btns-primary btn-block" onClick={SubmitLawyer}>Search</button>
        <button class="btn btns-primary btn-block ms-2" onClick={handleReset}>Reset</button>
      </div>
      </div>
      <p className='fs-6 text-white pop'>Popular searches :  Defense Lawyers, Real Estate </p>
    </div> 

    <div className="text-center filter_btn" onClick={filterData}>
    <button className='btns-primary rounded-pill p-1 border-prime' style={{width:"45%"}}>Filters</button>
    </div>

    <div className="col-12 mx-auto mt-5">
    <div className="row mx-auto">

    <div className="col-md-4" id='filters'>
    {alllawyercategory.map((service) => (
      <>
         <h4 className='mt-3 font-color'>{service.title}</h4>
         {service.children &&
            service.children.map((child) => (
         <div class="form-check mt-2">
          {/* checked={child.title===params.cat} */}
          <input class="form-check-input" type="checkbox" name='check'  value={child.title} id="flexCheckDefault" onClick={handleCheckbox}/>
           <label class="form-check-label text-white" for="flexCheckDefault">
           {child.title}
           </label>
        </div>
         ))}
        </>
      ))}
    </div>
  
  <div className="col-md-8">
     <div className="row">
        <div className="col-md-6">
         <h4 className='font-color'>All Lawyers</h4>
         <p className='fs-6 text-white'>Showing {totalLawyers} results</p> 
        </div>


        <div class="col-lg-6 col-md-6 col-sm-12 col-12 ">
        <div class="input-group mb-3">
        <span class="input-group-text btns-primary" >Sort by : </span>
          <select id="inputState"  class="form-select" onChange={handleSelectValue}>
            <option selected> Most relevant</option>
            <option value="Full Day">Full Day</option>
            <option value="Half Day">Half Day</option>
        </select> 
        </div>
       </div>

      {/* all lawyer section cards start */}
{ 
      lawyers.length === 0 ? <h3 className='text-white'>No data found</h3>: (
        currentUsers.map((data,i)=>(
        <div className='view_buttons mt-4 alllawyersection border border-dark'>
    <div className="row mx-auto"> 
    <div className="col-md-6">
        <div className="row">
           <div className="col-md-3 mt-3">
               <img src={data.image} className='rounded-full lawpicd' alt="lawyer_profile" />
          </div>
          <div className="col-md-9">
          <h4 className='mt-2 font-color'>{data.specialization}</h4>
          <div className='d-flex mt-3'><h5 className='nam fs-6 text-white text-capitalize'>{data.username}</h5>
          <div className='mx-auto nameloc'><h5 className='fs-6 ms-2 text-capitalize' style={{marginTop:"-7px"}}> <i class="bi bi-geo-alt"></i> {data.address}</h5></div></div>
          <div className='d-flex'>
          <p className='fs-6 text-white'>{data.work}</p>
          <p className='fs-6 mx-4 text-white lawexp'>{data.experience}  in practice</p>
          </div>
          </div>
        </div>
    </div>

    <div className="col-md-6">
        <div className="row">
           <div className="col-md-10 d-flex justify-content-end">
           <button className="btn btns-primary cont profi w-75" onClick={(e)=> navigate(`/job/${data.id}`)}>
             View Profile
           </button>
          </div>
          {userRole === "user" && (
      <div className="col-md-1 mx-3 res4" onClick={()=>addToLawyer(data.uid)}>
        <i class="bi bi-bookmark fw-bold fs-3"></i>
        <p className="fs-6 savelist">save</p>
      </div>
    )}

          
          
        </div>
    </div>
    </div>
 </div>
 ))
 )
    }
<div id="react-paginate" className='mt-5'>
          <ReactPaginate
            previousLabel={<i className="bi bi-arrow-left-circle-fill m-2 "></i>}
            nextLabel={<i className="bi bi-arrow-right-circle-fill m-2"></i>}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={Math.ceil(lawyers.length / usersPerPage)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={(data) => setCurrentPage(data.selected)}
            containerClassName={'pagination'}
            activeClassName={'active'}
            previousClassName={'paginate-prev'}
            nextClassName={'paginate-next'}
          />
          </div>




       {/* <AllLawyersection name={searchLawyer} location={lawyeradd} type={selectedValue} checkbox={getcheckbox} /> */}

      {/* all lawyer section cards end */}

     </div>
   </div>

    </div>
    </div>


  </div>
  <div className="lawyrscard6">
>>>>>>> d45adb89b059359ab08315d0dfb41bbd760b55be
        <div className="container  pb-5">
          <div className="row">
            <div className="col-lg-6 featured">
              <h1 className="mt-4 text-white">
                Recommended
                <span id="cat" className="ms-2">
                  Lawyers
                </span>
              </h1>
            </div>
            <div className="col-lg-6 featured" >
              <div className="d-flex mt-4 float-xl-end">
                <p className="fs-6 fw-bold mt-2"><a href='#dis' className='text-decoration-none fs-5 text-white'>Show all lawyers</a></p>
                <i class="bi bi-arrow-right ms-2 fs-2 font-color"></i>
              </div>
            </div>
          </div>

          {/* lawyers featured end */}
          <Lawyerscards />
        </div>
        {/* lawyers featued end */}

      </div>
      <div className='container'>
        <Contect_sugg />
      </div>
      <div className='mt-5'>
        <Testimonial />
      </div>
    </>
  )
}

export default All_Lawyers
