import React from 'react'
import { useParams } from 'react-router-dom';


const MovieDetail = () => {
  let {id}=useParams()
  console.log(id,'id')
 
  console.log('hello')
 
  return (
    <div>MovieDetail</div>
   
  )
}

export default MovieDetail