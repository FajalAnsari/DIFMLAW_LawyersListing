import React from 'react'

const Bookmark = () => {

    //  // state of cart products
    //  const [cartProducts, setCartProducts]=useState([]);

    //  // getting cart products from firestore collection and updating the state
    //  useEffect(()=>{
    //      auth.onAuthStateChanged(user=>{
    //          if(user){
    //              fs.collection('Cart ' + user.uid).onSnapshot(snapshot=>{
    //                  const newCartProduct = snapshot.docs.map((doc)=>({
    //                      ID: doc.id,
    //                      ...doc.data(),
    //                  }));
    //                  setCartProducts(newCartProduct);                    
    //              })
    //          }
    //          else{
    //              console.log('user is not signed in to retrieve cart');
    //          }
    //      })
    //  },[])

  return (
    <div>
      book mark
    </div>
  )
}

export default Bookmark
