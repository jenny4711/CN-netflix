import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { movieAction } from "../redux/actions/movieAction";
import Review from "../component/Review";
import RelatedMovies from "../component/RelatedMovies";
import Badge from "react-bootstrap/Badge";
import { Container, Row, Col } from "react-bootstrap";
import "../CSS/MovieDetail.css";
import Trailer from "./Trailer";
import { animateScroll as scroll } from 'react-scroll';


function MovieDetail({ setNavSearch,lang}) {
  let { id } = useParams();
  const dispatch = useDispatch();
  const [on, setOn] = useState(false);
  const [open, setOpen] = useState(false);
  const { searchMovie, reviewList, recommendationList, movieVideoList } =
    useSelector((state) => state.movies);
    setNavSearch(false);

    // adults img
  const under18 =
    "https://st2.depositphotos.com/1431107/11748/v/450/depositphotos_117484062-stock-illustration-under-18-year-rubber-stamp.jpg";
  const pg =
    "https://www.canr.msu.edu/contentAsset/image/6d081af8-8fa6-4927-bc64-c1ee0dca1b12/fileAsset/filter/Resize,Jpeg/resize_w/750/jpeg_q/80";
  let sp = id.replace(":", "");

  let result = reviewList.results;
  let nameOfGenres = searchMovie.genres;
  let recomResult = recommendationList.results;
  let videoKey=movieVideoList?.key

function releaseVideo(e){
  e.preventDefault()
setOpen((open) => (open === true ? false : true))
scroll.scrollToBottom()

}

function reviewSection(e){
  e.preventDefault()
  
    setOn((on) => (on === true ? false : true))
    scroll.scrollTo(900)
  
  
}

  useEffect(() => {
    function getList() {
      dispatch(movieAction.searchMovie(sp,lang));
    }

    getList();
  }, [id,lang]);


  return (
    <div  className="MovieDetail-App">
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
              <Badge bg="danger">Budget</Badge> ${searchMovie.budget !== undefined? searchMovie.budget.toLocaleString():'...'}
            </p>
            <p>
              <Badge bg="danger">Revenue</Badge> ${searchMovie?.revenue !== undefined? searchMovie.revenue.toLocaleString():'...'}
            </p>
          </div>
          <div className="MovieDetail-trailer">
            {videoKey === undefined?<h5 style={{color:'gray'}}>No Trailer</h5>:<Trailer videoId={videoKey} />}
           
            
          </div>
        </div>
      </div>

      <div className="MovieDetail-extra">
        <div className="MovieDetail-btns">
          <button
            className={on ? "reviewBtn-bk" : "reviewBtn"}
            onClick={reviewSection}
          >
            REVIEW({result?.length})
          </button>
          <button
            className={open ? "relatedBtn-bk" : "relatedBtn"}
            onClick={releaseVideo}
           
          >
            RELATED MOVIES({recomResult?.length})
          </button>
        </div>

        <div className={on ? "review-all" : "hide"}>
          {result?.map((item) => (
          
            <div>
              <Review item={item} />
              {console.log(item)}
            </div>
          ))}
        </div>

        <div className={open ? "recom-all" : "hide"}>
          <Container>
            <Row>
              {recomResult?.map((item) => (
                <Col lg={4}>
                  <RelatedMovies item={item} />{" "}
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
