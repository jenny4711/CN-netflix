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

  return (
    <div className="App">
      <Navb navSearch={navSearch} />
      <Routes>
        <Route path="/" element={<Home setNavSearch={setNavSearch} />} />
        <Route
          path="/movies"
          element={<Movies setNavSearch={setNavSearch} />}
        />
        <Route
          path="/movieDetail/:id"
          element={<MovieDetail setNavSearch={setNavSearch} />}
        />
      </Routes>
    </div>
  );
}

export default App;
