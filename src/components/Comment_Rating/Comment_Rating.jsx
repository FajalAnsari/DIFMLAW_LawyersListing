// import React from 'react'
// import { useRef } from 'react';
// import { useEffect } from 'react';


// const Comment_Rating = () => {
//     const checkboxRef = useRef(null);

//   useEffect(() => {
//     if (checkboxRef.current) {
//         checkboxRef.current.click();
//       }
//   }, []);


//   const onCheckbox = () => {
//     // Perform your desired logic here
//     console.log('Checkbox clicked!');
//     alert("hello")
//   };
//   return (
//     <div>
//     <input
//       type="checkbox"
//       ref={checkboxRef}
//       onClick={onCheckbox}
//     />
//   </div>
//   )
// }

// export default Comment_Rating


import React, { useEffect, useState } from 'react';

const Comment_Rating = () => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (isChecked) {
      handleClick();
    }
  }, [isChecked]);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleClick = () => {
    // Perform your desired logic here
    console.log('Checkbox clicked!');
  };

  return (
    <div>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
    </div>
  );
};

export default Comment_Rating;
