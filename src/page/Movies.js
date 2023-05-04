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
import { useSearchParams } from "react-router-dom";
// import Slider from "rc-slider";
import ReactSlider from 'react-slider';
import { Form, Button } from "react-bootstrap";
import "rc-slider/assets/index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function Movies({ setNavSearch,lang}) {
  const dispatch = useDispatch();
  const { popularMovies, loading, genreList, searchTitleList } = useSelector(
    (state) => state.movies
  );

  const [query, setQuery] = useSearchParams();
  const [result, setResult] = useState(popularMovies?.results);
  const [page, setPage] = useState(1);
  const [value, setValue] = useState([]);
  
  const [show, setShow] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [genre, setGenre] = useState(false);
  setNavSearch(false);

  // search by title in nav
  const getListByTitle = () => {
    let titleQuery = query.get("query") || "";
 

    dispatch(movieAction.searchByTitle(titleQuery,lang));
    setResult(searchTitleList?.results);
  };
  // search by title in movies

  const keywordHandler = (e) => {
    e.preventDefault();

    let title = e.target.value;
    console.log(title);
    setKeyword(title);
  };

  const search = (e) => {
    console.log(e);
    dispatch(movieAction.searchByTitle(keyword,lang));
  };

  useEffect(() => {
    getListByTitle();
    search()
  }, [lang]);

  const getResult = () => {
    let searchList = searchTitleList && searchTitleList?.results;
    console.log(searchList === 0, "working");
    if (!searchList || !searchList.length) {
      return setResult(popularMovies?.results);
    } else {
      return setResult(searchTitleList?.results);
    }
  };

  useEffect(() => {
    getResult();
  }, [searchTitleList]);

  // pagination

  const handlePageChange = async (page) => {
    console.log(page);
    setPage(page);

    dispatch(movieAction.getMovies(page,lang));
    setResult(popularMovies?.results);
  };

  useEffect(()=>{
    handlePageChange(page)
  },[page])

  // filter

  const handleRange = (e) => {
    setShow(true);
  };

  const handleGenre = (e) => {
    setGenre(true);
  };
  // filter by years
  const handleSliderChange = async (newValue) => {
    console.log(newValue,'newValue')
    setValue(newValue);
  

    let filterObj = [...result].filter((item) => {
      if (item.release_date) {
        return new Date(item.release_date).getFullYear() > newValue;
      } else {
        return false;
      }
    });

    setResult(filterObj);
  };
  //filter by genre
  const genreBtn = async (e, newGenre) => {
    let filterObj = popularMovies?.results.filter((item) => {
      return item.genre_ids.includes(e);
    });
    setResult(filterObj);
  };

  // sort

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

  // spinning

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
        <div className="Movies-form">
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
              <Dropdown.Item href="#/action-2" onClick={handleGenre}>
                Filter By Genre
              </Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <div className={show ? "show" : "hide"}>
            <div className='Movies-slider'>
           <ReactSlider
           className='horizontal-slider'
           thumbClassName='example-thumb'
           trackClassName='example-track'
           defaultValue={[1958,2023]}
           max={2023}
           min={1958}
           onChange={(value,index)=>setValue(value)}
           renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
           
           />
           <hr/>
           <h6>From:{value[0]}</h6>
           <h6>To:{value[1]}</h6>
            </div>
          
          </div>
          <div className={genre ? "Movies-btn" : "hide"}>
            <Container>
              <Row>
                {genreList?.map((item) => (
                  <Col lg={5} key={item.id}>
                    <button
                      className="genreBtn"
                      onClick={(e) => genreBtn(item.id)}
                    >
                      {item.name}
                    </button>
                  </Col>
                ))}
              </Row>
            </Container>
          </div>
        </div>
        <Container>
          <h3>Movie's List</h3>
          <Form className="d-flex movies-form1">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2 mv-search"
              aria-label="Search"
              onChange={keywordHandler}
            />
            <Button variant="outline-danger" onClick={(e) => search(e)}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </Button>
          </Form>
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
