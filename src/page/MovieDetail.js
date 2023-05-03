import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { movieAction } from "../redux/actions/movieAction";

import Review from "../component/Review";
import RelatedMovies from '../component/RelatedMovies';
import MovieSlide from '../component/MovieSlide'
import Badge from "react-bootstrap/Badge";
import { Container,Row ,Col} from 'react-bootstrap';
import "../CSS/MovieDetail.css";
import Trailer from './Trailer';



function MovieDetail({setNavSearch}) {
  let { id } = useParams();
  const dispatch = useDispatch();
  const [on,setOn]=useState(false);
  const [open,setOpen]=useState(false);
  // const [color,setColor]=useState('red')
  // const toggleColor=()=>setColor(color=>color === 'red'?'black':'red')
  
 
  const {
    searchMovie,
    genreList,
    reviewList,
    recommendationList,
    movieVideoList,
  } = useSelector((state) => state.movies);
 
  setNavSearch(false)
 

  const under18 =
    "https://st2.depositphotos.com/1431107/11748/v/450/depositphotos_117484062-stock-illustration-under-18-year-rubber-stamp.jpg";
  const pg =
    "https://www.canr.msu.edu/contentAsset/image/6d081af8-8fa6-4927-bc64-c1ee0dca1b12/fileAsset/filter/Resize,Jpeg/resize_w/750/jpeg_q/80";
  let sp = id.replace(":", "");

  let result=reviewList.results
  let nameOfGenres = searchMovie.genres;
  let recomResult=recommendationList.results

  useEffect(() => {
    function getList() {
      dispatch(movieAction.searchMovie(sp));
    }
  
    getList();
  }, [id]);


  


  return (
    <div key={searchMovie.id} className="MovieDetail-App">
      <div className="MovieDetail">
        <span className="MovieDetail-img">
          <img
            src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${searchMovie?.backdrop_path}`}
          />
        </span>
        <div className="MovieDetail-info">
          <div className="MovieDetail-genres">
            {nameOfGenres?.map((name) => (
              <Badge bg="danger">{name.name}</Badge>
            ))}
          </div>
          <h1>{searchMovie?.title}</h1>

          <div className="MovieDetail-smInfo">
            <p>
              {" "}
              <i className="bi bi-people"></i> {searchMovie?.popularity}{" "}
            </p>
            <p>
              {" "}
              <i className="bi bi-clock-fill"></i> {searchMovie?.runtime}min
            </p>
            <p>
              {searchMovie?.adult ? (
                <img className="under18" src={under18} />
              ) : (
                <img className="under18" src={pg} />
              )}
            </p>
          </div>

          <div className="MovieDetail-overview">
            <h4>Overview</h4>
            <p>{searchMovie?.overview}</p>
          </div>

          <div className="MovieDetail-extraInfo">
            <p>
              <Badge bg="danger">Rating</Badge> {searchMovie?.vote_average}
            </p>
            <p>
              <Badge bg="danger">Release_date</Badge>{" "}
              {searchMovie?.release_date}
            </p>
            <p>
              <Badge bg="danger">Budget</Badge> ${searchMovie?.budget}
            </p>
            <p>
              <Badge bg="danger">Revenue</Badge> ${searchMovie?.revenue}
            </p>

          

        
          </div>
          <div className='MovieDetail-trailer'>
          <Trailer videoId={movieVideoList.key}/>
          </div>
        </div>
      </div>

      <div className='MovieDetail-extra'>
        <div className='MovieDetail-btns'>
        <button className={on?'reviewBtn-bk':'reviewBtn'} onClick={()=>setOn(on=>on === true?false:true)}>REVIEW({result?.length})</button>
        <button  className={open?'relatedBtn-bk':'relatedBtn'} onClick={()=>setOpen(open=>open ===true?false:true)}>RELATED MOVIES({ recomResult?.length})</button>
        </div>
       
        <div className={on?'review-all':'hide'}>
        {result?.map((item)=> <div><Review item={item} /></div>)}
       
        </div>

        <div className={open?'recom-all':'hide'}>
        <Container>
        <Row>
         
          {recomResult?.map((item)=>  <Col lg={4}><RelatedMovies item={item} /> </Col>)}
         
        </Row>

      </Container>
         
      
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
