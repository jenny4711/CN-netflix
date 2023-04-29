import React, { useState, useEffect } from "react";
import { movieAction } from "../redux/actions/movieAction";
import { useDispatch, useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import { Container, Row, Col } from "react-bootstrap";
import MovieCard from "../component/MovieCard";
import MovieListCard from "../component/MovieListCard";
import Dropdown from "react-bootstrap/Dropdown";
import "../CSS/Movies.css";
import Pagination from "react-js-pagination";



function Movies() {
  const dispatch = useDispatch();
  const { popularMovies, loading } = useSelector((state) => state.movies);
  const [result, setResult] = useState(popularMovies?.results);
  const [page, setPage] = useState(1);
  const [value,setValue]=useState({min:2,max:10})
  console.log(result,'ppp')

  const handlePageChange = async (page) => {
    setPage(page);
    dispatch(movieAction.getMovies(page))
    setResult(popularMovies?.results)
  };



  // const bySort = (e) => {
  //   setSortBy(e);
  // };

  const getTitle = () => {
    const sortedResult = [...result].sort(function (a, b) {
      let nameA = a.title.toUpperCase();
      let nameB = b.title.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });

    setResult(sortedResult);
  };

  const getPopularity = () => {
    const sortedResult = [...result].sort(
      (a, b) => b.popularity - a.popularity
    );
    setResult(sortedResult);
  };

  const getDate = () => {
    const sortedDateResult = [...result].sort(function (a, b) {
      if (a.release_date < b.release_date) {
        return 1;
      }
      if (a.release_date > b.release_date) {
        return -1;
      }
      return 0;
    });
    console.log(sortedDateResult);
    setResult(sortedDateResult);
  };

  if (loading) {
    return (
      <ClipLoader
        color="#ffff"
        loading={loading}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    );
  }

  return (
    <>
    <div className="Movies">
      <div>
        <Dropdown className="Movies-drop1" >
          <Dropdown.Toggle variant="dark" id="dropdown-basic drop1">
            Sort
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item eventKey="popularity" onClick={getPopularity}>
              popularity
            </Dropdown.Item>
            <Dropdown.Item eventKey="title" onClick={getTitle}>
              title
            </Dropdown.Item>
            <Dropdown.Item eventKey="release_data" onClick={getDate}>
              release_date
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown className="Movies-drop2">
          <Dropdown.Toggle variant="dark" id="dropdown-basic drop2">
            Filter
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">
            

            </Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

       
      </div>
      <Container>
        <Row>
          {result.map((item) => (
            <Col lg={4}>
              <MovieListCard item={item} />
            </Col>
          ))}
        </Row>
      </Container>
      
    </div>
    <div className='pagination'>
      <Pagination
      activePage={page} 
      itemsCountPerPage={10} 
      totalItemsCount={450} 
      pageRangeDisplayed={5} 
      prevPageText={"‹"} 
      nextPageText={"›"} 
      onChange={handlePageChange} 
    />
   </div>
    </>
  );
}

export default Movies;
