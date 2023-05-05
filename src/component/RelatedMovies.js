import React from 'react'
import { Container,Row ,Col} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../CSS/RelatedMovies.css'
import { animateScroll as scroll } from 'react-scroll';

const RelatedMovies = ({item}) => {
  const navigate=useNavigate()
const clickCard=(e)=>{
  e.preventDefault()
  navigate(`/movieDetail/:${item.id}`)
  scroll.scrollToTop()

}

  return (
    <>
        {item.backdrop_path === null?<div className='RelatedMovies-empty'><img width={100} src='https://www.edigitalagency.com.au/wp-content/uploads/Netflix-logo-red-black-png.png'/></div>:
    <div
    onClick={clickCard}
    className='RelatedMovies'
     style={{backgroundImage:'url('+`https://www.themoviedb.org/t/p/w355_and_h200_multi_faces${item?.backdrop_path}`+')'}}>
      <h5>{item.title}</h5>
     
    </div>}
    </>
  )
}

export default RelatedMovies