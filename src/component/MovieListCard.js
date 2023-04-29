import React from 'react'
import Badge from 'react-bootstrap/Badge';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../CSS/MovieListCard.css'
const MovieListCard = ({item}) => {
 
  const { genreList } = useSelector((state) => state.movies);
  const navigate = useNavigate();

  const clickCard = (e) => {
    e.preventDefault();

    navigate(`/movieDetail/:${item.id}`);
  };

  return (
    <div
    key={item.id}
      onClick={clickCard}
      className="MovieListCard"
      style={{
        backgroundImage:
          "url(" +
          `https://www.themoviedb.org/t/p/w300_and_h450_bestv2${item?.backdrop_path}` +
          ")",
      }}
    >
      <div className="MovieListCard-overlay">
        <h2>{item?.title}</h2>
        <div>
          {item?.genre_ids.map((id) => (
            <Badge bg="danger">
              {genreList.find((item) => item.id == id).name}
            </Badge>
          ))}
        </div>
        <div>
          <span>{item?.vote_average}</span>
          <span>{item?.adult ? "청불" : "under 18"}</span>
        </div>
      </div>
    </div>
  )
}

export default MovieListCard