import React from 'react'

const CategoryCards = ({logo, type,  avalilabe}) => {
  return (
    <>
      <div className='col-lg-3 p-4'>
          
          <div className='category rounded-3 mt-4 p-4 ecard'>
              <img src={logo} style={{marginLeft:"30%"}} />
          <p className='mt-2 mx-2' >{type}</p>
          <div className='d-flex'>
          <h6 className='mt-2'>{ avalilabe}</h6>
          <div><i class="bi bi-arrow-right ms-2 fs-4"></i></div>
          </div>
          
          </div>
        
      </div>
   
    </>
  )
}

export default CategoryCards
