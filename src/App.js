import React, { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Movies from "./page/Movies";
import Home from "./page/Home";
import MovieDetail from "./page/MovieDetail";
import "bootstrap/dist/css/bootstrap.min.css";
import Navb from "./component/Navb";

function App() {
 
  const [navSearch, setNavSearch] = useState(true);
  const[lang,setLang]=useState(`ko-KR`)
  console.log(lang)

  return (
    <div className="App">
      <Navb navSearch={navSearch} setLang={setLang} lang={lang} />
      <Routes>
        <Route path="/" element={<Home setNavSearch={setNavSearch} lang={lang}  />} />
        <Route
          path="/movies"
          element={<Movies setNavSearch={setNavSearch} lang={lang} />}
        />
        <Route
          path="/movieDetail/:id"
          element={<MovieDetail setNavSearch={setNavSearch} lang={lang} />}
        />
      </Routes>
    </div>
  );
}

export default App;
