import React from 'react'
import '../CSS/Review.css'
const Review = ({item}) => {

  return (
    <div className='Review' >
      <h3>Review</h3>
      <p>{item.author}</p>
      <p>{item.content}</p>
   
    </div>
  )
}

export default Review