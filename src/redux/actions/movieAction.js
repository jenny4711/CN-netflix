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

      let bannerList=popularMovies.data.results
      const makeBanner=Math.floor(Math.random()*bannerList.length)
      console.log(makeBanner)
     
    
      let pop=popularMovies.data
      let top=topRatedMovies.data
      let up=upcomingMovies.data
      let genre=genreList.data.genres
      let banner=bannerList[makeBanner]
    
    
  
    
    
  dispatch(movieActions.getAllmovies({pop,top,up,genre,banner}))

    }catch(error){
     dispatch(movieActions.getError({error}))

    }
   

}
}

// error note - got error 404 . api address shows 20%20%20%... found out it is for space by chat gpt. fixed to  make api one line..

function searchMovie(searchId){

  return async (dispatch,getState)=>{
    try{
      dispatch(movieActions.loadingHandler(true))
      const searchAPI = api.get(`/movie/${searchId}?api_key=${API_KEY}&language=en-US`);

      const genreAPI = api.get(`/genre/movie/list?api_key=${API_KEY}&language=en-US`);    
            
      const reviewAPI= api.get(`/movie/${searchId}/reviews?api_key=${API_KEY}&language=en-US&page=1`);
      
      const getMovieVideoAPI=api.get(`/movie/${searchId}/videos?api_key=${API_KEY}&language=en-US`);

      const getRecommendationsAPI=api.get(`/movie/${searchId}/recommendations?api_key=${API_KEY}&language=en-US&page=1`)

      const [searchMovie,genreList,reviewList,movieVideoList,recommendationList]=await Promise.all([
        searchAPI,
        genreAPI,
        reviewAPI,
        getMovieVideoAPI,
        getRecommendationsAPI,

      ]);
      let search=searchMovie.data
      let genre = genreList.data.genres
      let review=reviewList.data
      let movieVideo=movieVideoList.data.results[0]
      let recommend=recommendationList.data
     


      dispatch(movieActions.getSearchMovies({search,genre,review,movieVideo,recommend}))


    }catch(error){
      dispatch(movieActions.getError({error}))
    }
  }
}
export const movieAction = { getMovies,searchMovie };
