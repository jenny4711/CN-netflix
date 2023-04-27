import React,{useState} from'react'
import './App.css';
import { Route ,Routes} from 'react-router-dom';
import Movies from './page/Movies';
import Home from './page/Home';
import MovieDetail from './page/MovieDetail';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navb from './component/Navb';
import { useSelector,useDispatch } from 'react-redux';
// home page,movie page, detail page
// home page banner
// home page 3section movies (popular,top rated,upcomming)
// home page 각 영화에 마우스를 올려두면 제목, 장르, 점수, 인기도, 청불여부
// home page   영화를 슬라이드로 넘기면서 볼수 있다.

// detail page 영화의 대한 디테일한 정보 볼수있다 (poster, title, story, score, popular, )
// detail page trailer 를 누르면 trailer 볼수있다.
// detail page review
// detail page relate movie
// detail page search movie
// sorting, filter

function App() {
  
 
 
  return (
    <div className="App">
      <Navb/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/movies' element={<Movies/>}/>
        <Route path='/movieDetail/:id' element={<MovieDetail/>}/>
      </Routes>
    </div>
  );
}

export default App;
