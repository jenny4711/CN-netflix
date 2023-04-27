import React from 'react'
import '../CSS/MovieCard.css'
import Badge from 'react-bootstrap/Badge';
import { useSelector,useDispatch } from 'react-redux';
import { movieAction } from '../redux/actions/movieAction';
import { useNavigate } from 'react-router-dom';
export const MovieCard = ({item}) => {
  const {genreList,searchMovie}=useSelector(state=>state.movies)

  
 const navigate=useNavigate()
 const dispatch=useDispatch()
  const clickCard=(e)=>{
    e.preventDefault()
    dispatch(movieAction.searchMovie(item.id))
    navigate(`/movieDetail/:${item.id}`)
  }
 
  return (
    <div
    onClick={clickCard}
    className='MovieCard'
     style={{backgroundImage:'url('+`https://www.themoviedb.org/t/p/w355_and_h200_multi_faces${item?.backdrop_path}`+')'}}>
     
      <div className='overlay'>
        <h2>{item?.title}</h2>
        <div>{item?.genre_ids.map(id=>  <Badge bg="danger">{genreList.find(item=>item.id==id).name}</Badge>)}</div>
        <div>
          <span>{item?.vote_average}</span>
          <span>{item?.adult?"청불":"under 18"}</span>
        </div>
      </div>
      </div>
  )
}
export default MovieCard