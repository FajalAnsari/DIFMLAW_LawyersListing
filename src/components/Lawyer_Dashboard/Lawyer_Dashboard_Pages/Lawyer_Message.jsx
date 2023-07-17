import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { dummy } from "../../images";
import { NavLink } from "react-router-dom";
import { collection, getDocs, doc } from "firebase/firestore";
import { db } from "../../../firebase";
import { auth } from "../../../firebase";
import { onAuthStateChanged } from "firebase/auth";
// import { doc, updateDoc } from "firebase/firestore";
const Lawyer_Message = () => {
  const [add_Lawyercarts, setAdd_Lawyercarts] = useState([]);
  // fetch all users who send the message
  const fetchUsers = async () => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          // Reference to the parent collection (User_Wishlist)
          const cartRef = collection(db, "User_Messages"); // Reference to the specific document within the User_Wishlist collection using the user's uid

          const userCartRef = doc(cartRef, user.uid); // Reference to the sub-collection (items) for the user's cart

          const itemsCollectionRef = collection(userCartRef, "AllUsers"); // Fetch the documents from the sub-collection

          const querySnapshot = await getDocs(itemsCollectionRef);

          const newCartProduct = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            image: doc.data().image || "", // Make sure 'image' is the correct field name in your Firestore document
            ...doc.data(),
          }));

          setAdd_Lawyercarts(newCartProduct);
          console.log(add_Lawyercarts);
        } catch (error) {
          console.error("Error fetching cart:", error);
        }
      } else {
        console.log("User is not signed in to retrieve cart");
      }
    });

    return () => {
      // Unsubscribe from the auth state listener when the component unmounts
      unsubscribe();
    };
  };
  useEffect(() => {
    fetchUsers();
    console.log(add_Lawyercarts);
  },[]);

  return (
    <>
      <div className="lawyer_message" id="message">
        <div className="row">
          <div className="col-md-4">
            {add_Lawyercarts.map((data) => (
              <div key={data.id} className="user_pro">
                <NavLink
                  to="/lawyer_dashboard/message/1"
                  className="text-decoration-none"
                >
                  <div className="d-flex px-4  usersl um">
                    <img
                      src={data.userProfile}
                      alt="dummy"
                      className="mt-1"
                      style={{ width: "20%", height: "20%" }}
                    />
                    <p className="ms-3 mt-2 fs-6 text-white">{data.name}</p>
                  </div>
                </NavLink>
              </div>
            ))}
          </div>
          <div className="col-md-8">
            <div className="msg_1">
              <div className="text_msg1 py-4 px-5 text-white">
                <p>
                  <b>Phone No. :</b> 7800504006
                </p>
                <p>
                  <b>Email :</b> Fajal@difm.tech
                </p>
                <p className="fs-5 pb">
                  <b>Message :</b> In publishing and graphic design, Lorem ipsum
                  is a placeholder text commonly used to demonstrate the visual
                  form of a document or a typeface without relying on meaningful
                  content. Lorem ipsum may be used as a placeholder before final
                  copy is available.
                </p>
              </div>
              <div className="text_msg2 py-4 px-5 text-white">
                <p>
                  In publishing and graphic design, Lorem ipsum is a placeholder
                  text commonly used to demonstrate the visual form of a
                  document or a typeface without relying on meaningful content.
                  Lorem ipsum may be used as a placeholder before final copy is
                  available.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Lawyer_Message;
