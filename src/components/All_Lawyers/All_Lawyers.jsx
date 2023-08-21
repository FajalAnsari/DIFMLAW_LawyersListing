import React, { useState, useEffect } from 'react';
import "./AllLawyer.css";
import Testimonial from '../Testimonial/Testimonial';
import { alllawyercategory } from '../constant/data';
import Lawyerscards from '../Hero/Lawyerscards';
import { db } from '../../firebase';
import { collection, getCountFromServer, and, getDocs, or, query, where, setDoc, doc ,addDoc} from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import Contect_Sugg from '../About_page/Contect_sugg';
import { useParams } from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '../../firebase';
import "./all_lawyersketeton.css";
import Skeleton from 'react-loading-skeleton';



const All_Lawyers = () => {

  const params = useParams();
  const [loading, setLoading] = useState(true);
  // alllawyer section code start
  const [isBookmarked, setBookmarked] = useState(false);
  const navigate = useNavigate();
  const [user] = useAuthState(auth); 
  const [lawyers, setLawyers] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const fetchPost = async () => {
    try {
      setLoading(true); // Set loading to true before fetching
      const querySnapshot = await getDocs(collection(db, "lawyers"));
      const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setLawyers(newData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false); // Set loading to false when fetching is complete (or if an error occurs)
    }
  };
  // check login as a user or lawyer
  const loginUserORLawyer = async () => {
    if(user){
      const q = query(collection(db, "lawyers"), where("uid", "==", user.uid));
      const q1 = query(collection(db, "users"), where("uid", "==", user.uid));
  
  
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
       
        });
      }
  
    }
  }


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
    return uid;
  }

  const uids = GetLawyerUid();

  loginUserORLawyer();
  useEffect(() => {
    fetchPost();

    console.log(params.cat);
  }, [])

  const [currentPage, setCurrentPage] = useState(0);
  const usersPerPage = 6;
  const offset = currentPage * usersPerPage;
  const currentUsers = lawyers.slice(offset, offset + usersPerPage);


  // alllawyer section code end
  const [totalLawyers, setTotalLawyers] = useState(0);

  const [getcheckbox, setCheckbox] = useState("");

  const [searchLawyer, setLawyerSearch] = useState("");
  const [lawyeradd, setLawyeradd] = useState("");

  const SubmitLawyer = async (e) => {
    e.preventDefault();
// only check


if (!searchLawyer && !lawyeradd) {
  alert("Please choose at least one value to search!");
} else {
  const citiesRef = collection(db, "lawyers");

  let q1;
  if (searchLawyer && lawyeradd) {
    // If both searchLawyer and lawyeradd are provided, query with both conditions
    var input2 = document.getElementById("ad_location");
    var value2 = input2.value.toLowerCase();
    var capitalizedValue2 = value2.charAt(0).toUpperCase() + value2.slice(1);
    q1 = query(
      citiesRef,
      where("specialization", "==", searchLawyer),
      where("address", "==", capitalizedValue2)
    );
  } else if (searchLawyer) {
    // If only searchLawyer is provided, query with specialization condition
    q1 = query(
      citiesRef,
      where("specialization", "==", searchLawyer)
    );
  } else if(lawyeradd) {
    var input2 = document.getElementById("ad_location");
    var value2 = input2.value.toLowerCase();
    var capitalizedValue2 = value2.charAt(0).toUpperCase() + value2.slice(1);
    // If only lawyeradd is provided, query with address condition
    q1 = query(citiesRef, where("address", "==", capitalizedValue2));
  }
  else{
    alert("not choose any value");
  }

  try {
    const querySnapshot = await getDocs(q1);
    const newData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setLawyers(newData);
    console.log(newData);
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
}

// only check


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
    var input = document.getElementById("ad_location");
    var value = input.value.toLowerCase();
    var capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
    input.value = capitalizedValue;

    console.log(input.value);
    // console.log(lawyeradd);
    const q = query(collection(db, "lawyers"), where("address", "==", capitalizedValue))
    await getDocs(q).then((qq) => {
      const newData = qq.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }));
      setLawyers(newData);
      console.log(lawyers);
    });
  }
  //  laywer select option filled

  const handleSelectValue = async (e) => {
    
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
          ...doc.data(),
        });
      });
      
  
      try {
        const cartCollectionRef = collection(db, 'User_Wishlist');
  
        for (const item of res) {
          const cartDocRef = doc(cartCollectionRef, uids, 'users', item.id);
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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // is bookmarked click
  const toggleBookmark = (uid) => {
    setBookmarked(prevState => ({
      ...prevState,
      [uid]: !prevState[uid] // Toggle the bookmark state for the specific item
    }));
  };

  return (
    <>

      <div className="container" style={{marginTop:"100px"}}>
        <h1 className='text-center text-white' id='dis'>Discover more than <span className='font-color'>5000+ Lawyers</span></h1>
        <div className="col-10 mx-auto">
          <div className="row mt-5 ">
            <div className="col-lg-5 col-md-6 col-sm-12 col-12 col-xl-5">
              <div className="input-group mb-3 ser">
                <input type="text" className="form-control" id="lawyername" list="categoryOptions" style={{ textTransform: 'capitalize' }} onChange={(e) => setLawyerSearch(e.target.value)} placeholder="Enter keyword, Defense Lawyer..." />
                <datalist id="categoryOptions">
                    <option value="Injury Lawyers" />
                    <option value="Family Law Lawyers" />
                    <option value="Defense Lawyers" />
                    <option value="Corporate Lawyers" />
                    <option value="Immigration Lawyers" />
                    <option value="Property Lawyers" />
                  </datalist>
                <span className="input-group-text btns-primary border-prime"><i className="bi bi-search" onClick={BynameSearch}></i></span>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 col-12 col-xl-4">
              <div className="input-group mb-3 ser">
                <input type="text" className="form-control" id='ad_location' style={{ textTransform: 'capitalize' }} onChange={(e) => setLawyeradd(e.target.value)} placeholder="Location, country, city, state..." />
                <span className="input-group-text btns-primary border-prime"><i className="bi bi-geo-alt" onClick={ByLocationSearch}></i></span>
              </div>
            </div>
            <div className="col-lg-3 col-md-12 col-sm-12 col-12 col-xl-3">
              <button className="btn btns-primary border-prime btn-block" onClick={SubmitLawyer}>Search</button>
              <button className="btn btns-primary border-prime btn-block ms-2" onClick={handleReset}>Reset</button>
            </div>
          </div>
          <p className='fs-6 text-white pop'>Popular Searches :  Defense Lawyers, Real Estate </p>
        </div>

        <div className="text-center filter_btn" onClick={filterData}>
          <button className='btns-primary rounded-pill p-1 border-prime' style={{ width: "45%" }}>Filters</button>
        </div>

        <div className="col-12 mx-auto mt-5">
          <div className="row mx-auto">

            <div className="col-md-4" id='filters' style={{marginBottom:"45px"}}>
              {alllawyercategory.map((service) => (
                <>
                  <h4 className='mt-3 font-color'>{service.title}</h4>
                  {service.children &&
                    service.children.map((child) => (
                      <div className="form-check mt-2">
                        {/* checked={child.title===params.cat} */}
                        <input className="form-check-input" type="checkbox" name='check' value={child.title} id="flexCheckDefault" onClick={handleCheckbox} />
                        <label className="form-check-label text-white" for="flexCheckDefault">
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

                <div className="col-lg-6 col-md-6 col-sm-12 col-12 ">
                  <div className="input-group mb-3">
                    <span className="input-group-text border-prime btns-primary" >Sort by : </span>
                    <select id="inputState" className="form-select" onChange={handleSelectValue}>
                      <option selected> Most relevant</option>
                      <option value="Full Day">Full Day</option>
                      <option value="Half Day">Half Day</option>
                    </select>
                  </div>
                </div>

                {/* all lawyer section cards start */}
                 

             
                {loading ? (
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
                              <h4 className='font-color skeleton2 rounded-pill loading-animation'> </h4>
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
                            <i className="bi bi-bookmark-fill fw-bold fs-3"></i>
                            </div>

                         
                          </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>


                ) :
                
                
                
                currentUsers.length === 0 ?  <h1 className='text-white'>Data not found</h1>
                
                : (
                currentUsers.map((data, i) => (
                  <div className='view_buttons mt-4 alllawyersection border border-dark'>
                    <div className="row mx-auto">
                      <div className="col-md-6">
                        <div className="row">
                          <div className="col-md-3 mt-3 col-3 ">
                            <img src={data.image} className='rounded-full lawpicd' alt="lawyer_profile" />
                          </div>
                          <div className="col-md-9 col-9">
                            <p className='mt-2 fs-4 tb1 font-color'>{data.specialization || "N/A"}</p>
                            <div className='d-flex mt-3 tb11'><h5 className='nam fs-6 text-white text-capitalize'>{data.username}</h5>
                              <div className='mx-auto nameloc'><h5 className='fs-6 ms-2 text-white text-capitalize' style={{ marginTop: "-7px" }}> <i className="bi bi-geo-alt"></i> {data.address || "N/A"}</h5></div></div>
                            <div className='d-flex tb12'>
                              <p className='fs-6 text-white'>{data.work || "N/A"}</p>
                              <p className='fs-6 mx-4 text-white lawexp'>{data.experience || "N/A"} in practice</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="row">
                          <div className="col-md-10 d-flex justify-content-end">
                            <button className="btn btns-primary cont profi w-75" onClick={(e) => { navigate(`/job/${data.id}`); scrollToTop();}}>
                              View Profile
                            </button>
                          </div>
                          {userRole === "user" && (
    <div key ={data.uid} className="col-md-1 mx-3 res4" >
      <i class={`bi ${isBookmarked[data.uid] ? 'bi-bookmark-star-fill' : 'bi-bookmark'} fw-bold fs-3`}  onClick={() => { addToLawyer(data.uid); toggleBookmark(data.uid); }}></i>
      <p className="fs-6 savelist">save</p>
    </div>
   )}
                        </div>
                      </div>
                    </div>
                  </div>

                ))
                )
                
                
            //     (
          
            //     )
                
                }

                    {/* All lawyer Section Cards End */}

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
      <div className="lawyrscard6 all_lawyer_ad_section">
        <div className="container  pb-5">
          <div className="row">
            <div className="col-lg-6 featured">
              <h1 className="text-white" style={{marginTop:"-20px"}}>
                Popular
                <span id="cat" className="ms-2">
                  Lawyers
                </span>
              </h1>
            </div>
            <div className="col-lg-6 featured" >
              <div className="d-flex float-xl-end" style={{marginTop:"-15px"}}>
                <p className="fs-6 fw-bold mt-2"><a href='#dis' className='text-decoration-none fs-5 text-white'>Show all lawyers</a></p>
                <div className='arrow-icons'><i className="bi bi-arrow-right ms-2 fs-2 font-color"></i></div>
              </div>
            </div>
          </div>

          {/* lawyers featured end */}
          <Lawyerscards />
        </div>
        {/* lawyers featued end */}

      </div>
      <div className='container'>
          <Contect_Sugg />
      </div>
      <div className='mt-5'>
        <Testimonial />
      </div>
    </>
  )
}

export default All_Lawyers;