import React from 'react'
import { Container,Row ,Col} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../CSS/RelatedMovies.css'

const RelatedMovies = ({item}) => {
  const navigate=useNavigate()
const clickCard=(e)=>{
  e.preventDefault()
  navigate(`/movieDetail/:${item.id}`)

}

  return (
    <div
    onClick={clickCard}
    className='RelatedMovies'
     style={{backgroundImage:'url('+`https://www.themoviedb.org/t/p/w355_and_h200_multi_faces${item?.backdrop_path}`+')'}}>
      <h3>{item.title}</h3>
     
    </div>
  )
}

export default RelatedMovies