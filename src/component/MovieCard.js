import React from "react";
import "../CSS/MovieCard.css";
import Badge from "react-bootstrap/Badge";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const MovieCard = ({ item }) => {
  const { genreList } = useSelector((state) => state.movies);

  const navigate = useNavigate();

  const clickCard = (e) => {
    e.preventDefault();

    navigate(`/movieDetail/:${item.id}`);
  };

  return (
    <div
      onClick={clickCard}
      className="MovieCard"
      style={{
        backgroundImage:
          "url(" +
          `https://www.themoviedb.org/t/p/w355_and_h200_multi_faces${item?.backdrop_path}` +
          ")",
      }}
    >
      <div className="overlay">
        <h5>{item?.title}</h5>
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
  );
};
export default MovieCard;
