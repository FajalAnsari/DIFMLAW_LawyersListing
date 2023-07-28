import React,{useState, useEffect} from 'react';
import { auth } from '../../firebase';
import { db } from '../../firebase';
import { collection, getDocs, doc } from 'firebase/firestore';
import { deleteDoc } from 'firebase/firestore';



const Bookmark = () => {
  const [add_Lawyercarts, setAdd_Lawyercarts] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          // Reference to the parent collection (User_Wishlist)
          const cartRef = collection(db, 'User_Wishlist');

          // Reference to the specific document within the User_Wishlist collection using the user's uid
          const userCartRef = doc(cartRef, user.uid);

          // Reference to the sub-collection (items) for the user's cart
          const itemsCollectionRef = collection(userCartRef, 'users');

          // Fetch the documents from the sub-collection
          const querySnapshot = await getDocs(itemsCollectionRef);

          const newCartProduct = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            image: doc.data().image || '', // Make sure 'image' is the correct field name in your Firestore document
            ...doc.data(),
          }));

          setAdd_Lawyercarts(newCartProduct);
        } catch (error) {
          console.error('Error fetching cart:', error);
        }
      } else {
        console.log('User is not signed in to retrieve cart');
      }
    });

    return () => {
      // Unsubscribe from the auth state listener when the component unmounts
      unsubscribe();
    };
  }, []);

     console.log(add_Lawyercarts);
  
     const handleToDelete = (id) => {
      const confirmDelete = window.confirm('Are you sure you want to delete this User?');

      if (confirmDelete) {
        // User confirmed, proceed with deletion
        // Your deletion logic here...
        auth.onAuthStateChanged(user => {
          if (user) {
           
            const docRef = doc(db, 'User_Wishlist', user.uid, 'users', id);
            deleteDoc(docRef)
              .then(() => {
                alert('Successfully deleted');
              })
              .catch(error => {
                console.log('Error deleting document:', error);
              });
          }
        });
        alert(`Deleting the user ID: ${id}`);
      } else {
        // User canceled the deletion
        alert('Deletion canceled.');
      }
    
  
    };
   
  return (
    <>
      {add_Lawyercarts.length > 0 && (
        <div className='p-1 rounded bookmark_lawyer' style={{marginTop:"-40%",height:"79.39vh",marginLeft:"300px",width:"84.29%",backgroundColor:"var(--fourth-primary)"}}>
           <div className="row lawyers_profile bok">
           {add_Lawyercarts.map((add_Lawyercart, i) => (
      <div className="col-lg-3  rounded-3 lawyer ecard  card shadow p-3 mb-5 bg-body rounded lawyers-card" key={i}>
        <div className="row  mt-2" id="lawyer">
          <div className="col-lg-4 col-sm-4 col-4">
            <img src={add_Lawyercart.image} className="ms-2 lawpics" alt='lawyer_card'></img>
          </div>
          <div className="col-lg-6 col-sm-6 col-6">
            <p className="fs-6 mb-0 pb-1 h6">{add_Lawyercart.username}</p>
            <p className="city">{add_Lawyercart.address}</p>
          </div>
           <div className="col-lg-2 col-sm-2 col-2">
              <div style={{marginTop:"-12px"}} onClick={() => handleToDelete(add_Lawyercart.id)}>
                <i className="bi bi-bookmark-star-fill fw-bold fs-2"></i>
              </div>
          </div>
        </div>

        <span className="fs-5 fw-normal text-center">{add_Lawyercart.specialization}</span>

        <div className="mt-3 ms-3 me-3">
          <p className="font-weight-bold fs-6 mb-1">{add_Lawyercart.work}</p>
          <p className="fs-6 lawyers-desc font-weight-normal lh-base text-justify summ">
            {add_Lawyercart.summary}
          </p>
          <div className="row mt-4 practice">
            <div className="col-lg-6 col-sm-6 col-6">
              <span className="fs-6 exp">{add_Lawyercart.experience} in practice</span>
            </div>
            <div className="col-lg-6 col-sm-6 col-6">
              <button className="btn btns-primary sfcs viewbtn">
                View Profile
              </button>
            </div>
          </div>
        </div>
      </div>
       ))}
    </div>
        </div>
      )}
      {add_Lawyercarts.length < 1 && (
        <div className='container'>
         <p className='text-white'>No Data SHow</p>
        </div>
      )}
    </>
  )
}

export default Bookmark
