import api from "../api";
import { movieActions } from "../reducer/movieReducer";

const API_KEY = process.env.REACT_APP_API_KEY;
function getMovies() {
  return async (dispatch, getState) => {
    try{
      dispatch(movieActions.loadingHandler(true))
      const popularMovieAPI = api.get(
        `/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
      );
  
      const topRatedAPI = api.get(
        `/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
      );
  
      const upcomingAPI = api.get(
        `/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
      );

      const genreAPI = api.get(
        `/genre/movie/list?api_key=${API_KEY}&language=en-US`
      );
      // const searchAPI =api.get(
      //   `/movie/${searchId}?api_key=${API_KEY}&language=en-US`
      // )
      const  [popularMovies, topRatedMovies, upcomingMovies,genreList ] = await Promise.all([
        popularMovieAPI,
        topRatedAPI,
        upcomingAPI,
        genreAPI,
       
      
      ]);
     
    
      let pop=popularMovies.data
      let top=topRatedMovies.data
      let up=upcomingMovies.data
      let genre=genreList.data.genres
    
    
    
    
  dispatch(movieActions.getAllmovies({pop,top,up,genre}))

    }catch(error){
     dispatch(movieActions.getError({error}))

    }
   

}
}

function searchMovie(searchId){
  return async (dispatch,getState)=>{
    try{
      dispatch(movieActions.loadingHandler(true))
        const searchAPI =await api.get(
         `/movie/${searchId}?api_key=${API_KEY}&language=en-US`
       )
       if(searchAPI.status !==200){
        throw new Error('Invalid response from API');
       }
       const data = searchAPI.data;
       dispatch(movieActions.getAllmovies({data}))
    }catch(error){
      dispatch(movieActions.getError({error}))
    }
  }

}
export const movieAction = { getMovies,searchMovie };
