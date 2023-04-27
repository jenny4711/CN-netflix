import {createSlice} from "@reduxjs/toolkit"
let initialState={
  popularMovies:{},
  topRateMovies:{},
  upcomingMovies:{},
  genreList:{},
  loading:true,
  searchMovie:{},
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
    state.loading=false
    state.searchMovie=action.payload.data
  
   },
   loadingHandler(state,action){
    state.loading=true
   },
   getError(state,action){
    state.loading=false
   }
  

  }
 
});

export const movieActions = movieSlice.actions
export default movieSlice.reducer