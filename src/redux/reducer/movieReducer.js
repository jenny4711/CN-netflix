import {createSlice} from "@reduxjs/toolkit"
let initialState={
  popularMovies:{},
  topRateMovies:{},
  upcomingMovies:{},
  genreList:{},
  loading:true,
  searchMovie:{},
  reviewList:{},
  movieVideoList:{},
  recommendationList:{},
  banner:{},
  home:true,
}

const movieSlice=createSlice({
  name:'movie',
  initialState,
  reducers:{
   getAllmovies(state,action){
    state.popularMovies=action.payload.pop
    state.topRateMovies=action.payload.top
    state.upcomingMovies=action.payload.up
    state.genreList=action.payload.genre
    state.banner=action.payload.banner
    state.loading=false
  
    // state.searchMovie=action.payload.search
    // state.reviewList=action.payload.review
    // state.movieVideoList=action.payload.MovieVideo
    // state.recommendationList=action.payload.recommend
  
   },
   getSearchMovies(state,action){
    state.loading=false
    state.searchMovie=action.payload.search
    state.genreList=action.payload.genre
    state.reviewList=action.payload.review
    state.movieVideoList=action.payload.MovieVideo
    state.recommendationList=action.payload.recommend
    state.movieVideoList=action.payload.movieVideo

   },
   loadingHandler(state,action){
    state.loading=true
   },
   getError(state,action){
    state.loading=false
   },
   
  

  }
 
});

export const movieActions = movieSlice.actions
export default movieSlice.reducer