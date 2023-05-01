import React from 'react'
import Badge from 'react-bootstrap/Badge';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../CSS/MovieListCard.css'
const MovieListCard = ({item}) => {
 
  const { genreList } = useSelector((state) => state.movies);
  const navigate = useNavigate();
  const under18 =
  "https://st2.depositphotos.com/1431107/11748/v/450/depositphotos_117484062-stock-illustration-under-18-year-rubber-stamp.jpg";
const pg =
  "https://www.canr.msu.edu/contentAsset/image/6d081af8-8fa6-4927-bc64-c1ee0dca1b12/fileAsset/filter/Resize,Jpeg/resize_w/750/jpeg_q/80";

  const clickCard = (e) => {
    e.preventDefault();

    navigate(`/movieDetail/:${item.id}`);
  };

  return (
    <div
    key={item.title}
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
        <div className='MovieListCard-info'>
          <span> Rating:{item?.vote_average}</span>
          <span>  {item?.adult ? (
                <img className="under18" src={under18} />
              ) : (
                <img className="under18" src={pg} />
              )}</span>

          <span>Release Date: {item?.release_date}</span>
        </div>
      </div>
    </div>
  )
}

export default MovieListCard