import React, { useState, useEffect } from "react";
import { movieAction } from "../redux/actions/movieAction";
import { useDispatch, useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import { Container, Row, Col } from "react-bootstrap";
import MovieListCard from "../component/MovieListCard";
import Dropdown from "react-bootstrap/Dropdown";
import "@lucchev/react-slider/styles.css";
import "../CSS/Movies.css";
import Pagination from "react-js-pagination";
import { useSearchParams } from 'react-router-dom';
import Slider from "rc-slider";

import "rc-slider/assets/index.css";

function Movies() {
  const dispatch = useDispatch();
  const { popularMovies, loading, genreList,allListMovies ,searchTitleList} = useSelector(
    (state) => state.movies
  );
  console.log(searchTitleList.results)
const [ query,setQuery]=useSearchParams()
  const [result, setResult] = useState(popularMovies?.results);
  const [page, setPage] = useState(1);
  const [value, setValue] = useState([1990, 2023]);
  const [show, setShow] = useState(false);
  // const [filterG, setfilterG] = useState(false);
  // const [resultBtn,setResultBtn]=useState(null)

  const getListByTitle=()=>{
    let titleQuery=query.get('query')||"";
    console.log('query',titleQuery)

  dispatch(movieAction.searchByTitle(titleQuery))
  setResult(searchTitleList?.results)

  }


  const getResult =()=>{
    if(searchTitleList){
      return searchTitleList.results;
    }else{
      return popularMovies?.results;
    }
  }

  useEffect(() => {
    getListByTitle();
  }, [ query]);

  
  useEffect(() => {
  setResult(getResult())
   
  }, [searchTitleList,popularMovies]);
  


  const handlePageChange = async (page) => {
    setPage(page);
    dispatch(movieAction.getMovies(page));
    setResult(getResult());
  };

  const handleRange = (e) => {
    setShow(true);
  };

  const handleSliderChange = async (newValue) => {
    setValue(newValue);
  
    let filterObj = result.filter((item) => {
      if (item.release_date) {
        return new Date(item.release_date).getFullYear() > newValue;
      } else {
        return false;
      }
    });

    setResult(filterObj);
  };

  const genreBtn=async(e,newGenre)=>{


    let filterObj =popularMovies?.results.filter((item)=>{
    return item.genre_ids.includes(e)
    })
    setResult(filterObj)

  }

  const getTitle = () => {
    const sortedResult = [...popularMovies?.results].sort(function (a, b) {
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
    const sortedResult = [...popularMovies?.results].sort(
      (a, b) => b.popularity - a.popularity
    );
    setResult(sortedResult);
  };

  const getDate = () => {
    const sortedDateResult = [...popularMovies?.results].sort(function (a, b) {
      if (a.release_date < b.release_date) {
        return 1;
      }
      if (a.release_date > b.release_date) {
        return -1;
      }
      return 0;
    });
   
    setResult(sortedDateResult);
  };

  if (loading) {
    return (
      <ClipLoader
        color="red"
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
          <Dropdown className="Movies-drop1">
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

          <Dropdown className="Movies-dropF">
            <Dropdown.Toggle variant="dark" id="dropdown-basic dropF">
              Filter
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1" onClick={handleRange}>
                Filter By Years
              </Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <div className={show ? "show" : "hide"}>
            {value}
            <Slider
              min={1990}
              max={2023}
              value={value}
              pushable={false}
              allowCross={true}
              ariaLabelGroupForHandles={["Range Handle"]}
              ariaLabelledByGroupForHandles={["GroupForHandle"]}
              tabIndex={[0, 0]}
              onChange={handleSliderChange}
            />
          </div>
          <div className='Movies-btn'>
          <Container>
          <Row>
            {genreList?.map((item) => (
              <Col lg={5} key={item.id}>
                <button className='genreBtn' onClick={(e)=>genreBtn(item.id)}>{item.name}</button>
              </Col>
            ))}
          </Row>
        </Container>
          </div>
        </div>
        <Container>
          <Row>
            {result?.map((item) => (
              <Col lg={4} key={item.id}>
                <MovieListCard item={item} />
              </Col>
            ))}
          </Row>
        </Container>

        
      </div>
      <div className="pagination">
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