import React,{useEffect,useState} from 'react'
import { movieAction } from '../redux/actions/movieAction'
import { useDispatch,useSelector } from 'react-redux'
import Banner from '../component/Banner'
import MovieSlide from '../component/MovieSlide'
import ClipLoader from "react-spinners/ClipLoader";

function Home({setNavSearch,lang}) {
  const dispatch = useDispatch()
 const {popularMovies,topRateMovies,upcomingMovies,loading,banner}=useSelector(state=>state.movies)

 setNavSearch(true)
  useEffect(()=>{

dispatch(movieAction.getMovies(null,lang))

  },[])

  if(loading){
    return <ClipLoader
    color="#ffff"
    loading={loading}
  
    size={150}
    aria-label="Loading Spinner"
    data-testid="loader"
  />
  }
  return (
    <div>
      
    <Banner movie={banner}/> 
    <h1>Popular Movie</h1>
    <MovieSlide movies={popularMovies} loading={loading}/>
    <h1>Top Rate Movie</h1>
    <MovieSlide movies={topRateMovies} loading={loading}/>
    <h1>Upcoming Movie</h1>
    <MovieSlide movies={upcomingMovies} loading={loading}/>
    </div>
  )
}

export default Home
