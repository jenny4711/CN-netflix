import React from 'react'
import { movieAction } from '../redux/actions/movieAction'
import { useDispatch,useSelector } from 'react-redux'
import ClipLoader from "react-spinners/ClipLoader";
import { Container,Row ,Col} from 'react-bootstrap';
import MovieCard from '../component/MovieCard';


function Movies() {
  const dispatch=useDispatch()
  const{popularMovies,loading,genreList}=useSelector(state=>state.movies)
  console.log('hello')
  return (
    <div>
      movies
    </div>
  )
}

export default Movies
