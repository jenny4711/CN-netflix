import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux';
import { movieAction } from '../redux/actions/movieAction';

import Badge from 'react-bootstrap/Badge';
import '../CSS/MovieDetail.css'
function MovieDetail() {
  let {id}=useParams()
  const dispatch=useDispatch()
  const {searchMovie}=useSelector(state=>state.movies)

  const under18='https://st2.depositphotos.com/1431107/11748/v/450/depositphotos_117484062-stock-illustration-under-18-year-rubber-stamp.jpg'
  const pg='https://www.canr.msu.edu/contentAsset/image/6d081af8-8fa6-4927-bc64-c1ee0dca1b12/fileAsset/filter/Resize,Jpeg/resize_w/750/jpeg_q/80'
 let sp=id.replace(':','')
 console.log(searchMovie.genres)
 
useEffect(()=>{
function getList(){
  dispatch(movieAction.searchMovie(sp))
}
getList()
},[id])


  return (
    <div className="MovieDetail-App">
    <div className='MovieDetail'>
     
     <span className='MovieDetail-img'><img src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${searchMovie?.backdrop_path}`}/></span>
      <div className='MovieDetail-info'>
       
        <h1>{searchMovie?.title}</h1>

        <div className='MovieDetail-smInfo'>
        <p> <i class="bi bi-people"></i> {searchMovie?.popularity} </p>
        <p> <i class="bi bi-clock-fill"></i> {searchMovie?.runtime}min</p>
        <p>{searchMovie?.adult?<img  className='under18' src={under18}/>:<img  className='under18' src={pg}/>}</p>
      
      
        </div>

        <div className='MovieDetail-overview'>
          <h4>Overview</h4>
          <p>{searchMovie?.overview}</p>
        </div>

       <div className='MovieDetail-extraInfo'>
       <p><Badge bg="danger">Rating</Badge> {searchMovie?.vote_average}</p>
        <p><Badge bg="danger">Release_date</Badge> {searchMovie?.release_date}</p>
        <p><Badge bg="danger">Budget</Badge> ${searchMovie?.budget}</p>
        <p><Badge bg="danger">Revenue</Badge> ${searchMovie?.revenue}</p>
        </div>

      </div>

    </div>
    </div>
  )
}

export default MovieDetail
