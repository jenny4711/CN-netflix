import React,{useEffect} from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import MovieCard from './MovieCard';
import ClipLoader from "react-spinners/ClipLoader";
import { movieAction } from '../redux/actions/movieAction'
import { useSelector, useDispatch } from "react-redux";
import '../CSS/MovieSlide.css'


const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

const MovieSlide = ({movies,loading}) => {

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
    <div className='MovieSlide'>
    
        <Carousel responsive={responsive} containerClass="carousel-container" >
          {movies?.results.map(item=>(<MovieCard item={item}/>))}
          <MovieCard />
          <MovieCard/>
          <MovieCard/>
          <MovieCard/>
          <MovieCard/>
          <div>Item 1</div>
          <div>Item 2</div>
          <div>Item 3</div>
          <div>Item 4</div>
        </Carousel>
    
    </div>
  )
}

export default MovieSlide;
