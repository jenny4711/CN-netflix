import api from "../api";
import { movieActions } from "../reducer/movieReducer";

// Eng=en-US
// KOR-ko-KR

const API_KEY = process.env.REACT_APP_API_KEY;
function getMovies(page,lang) {

  return async (dispatch, getState) => {
    try{
     
    
    
  
 
      dispatch(movieActions.loadingHandler(true))
     
   
     
     console.log(lang,'test')
      const popularMovieAPI = api.get(
        `/movie/popular?api_key=${API_KEY}&language=${lang}&page=${page}`
      );
     
      const allListAPI=api.get(`/movie/popular?api_key=${API_KEY}&language=${lang}`);
  
      const topRatedAPI = api.get(
        `/movie/top_rated?api_key=${API_KEY}&language=${lang}&page=1`
      );
  
      const upcomingAPI = api.get(
        `/movie/upcoming?api_key=${API_KEY}&language=${lang}&page=1`
      );

      const genreAPI = api.get(
        `/genre/movie/list?api_key=${API_KEY}&language=${lang}`
      );
       

      const  [popularMovies, allListMovies ,topRatedMovies, upcomingMovies,genreList] = await Promise.all([
        popularMovieAPI,
        allListAPI,
        topRatedAPI,
        upcomingAPI,
        genreAPI,
       
    
       
      
      ]);
     
      let bannerList=popularMovies.data.results
      const makeBanner=Math.floor(Math.random()*bannerList.length)
  console.log(origin)
     
     
      let pop=popularMovies.data
      let all=allListMovies.data
      let top=topRatedMovies.data
      let up=upcomingMovies.data
      let genre=genreList.data.genres
      let banner=bannerList[makeBanner]
      let bun= lang

   
    
    
  dispatch(movieActions.getAllmovies({pop,all,top,up,genre,banner,bun}))

    }catch(error){
     dispatch(movieActions.getError({error}))

    }
   

}
}

// error note - got error 404 . api address shows 20%20%20%... found out it is for space by chat gpt. fixed to  make api one line..

function searchMovie(searchId,lang){

  return async (dispatch,getState)=>{
    try{
      dispatch(movieActions.loadingHandler(true))
      const searchAPI = api.get(`/movie/${searchId}?api_key=${API_KEY}&language=${lang}`);

      const genreAPI = api.get(`/genre/movie/list?api_key=${API_KEY}&language=${lang}`);    
            
      const reviewAPI= api.get(`/movie/${searchId}/reviews?api_key=${API_KEY}&language=${lang}&page=1`);
      
      const getMovieVideoAPI=api.get(`/movie/${searchId}/videos?api_key=${API_KEY}&language=${lang}`);

      const getRecommendationsAPI=api.get(`/movie/${searchId}/recommendations?api_key=${API_KEY}&language=${lang}&page=1`)
      
      //const searchTitleAPI= api.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=${searchId}`)

  
      const [searchMovie,genreList,reviewList,movieVideoList,recommendationList]=await Promise.all([
        searchAPI,
        genreAPI,
        reviewAPI,
        getMovieVideoAPI,
        getRecommendationsAPI,
       
        //searchTitleAPI,
       

      ]);
      let search=searchMovie.data
      let genre = genreList.data.genres
      let review=reviewList.data
      let movieVideo=movieVideoList.data.results[0]
      let recommend=recommendationList.data
      //let searchTitle=searchByTitle.data
     
    console.log(review,'oooooooooooooo')

      dispatch(movieActions.getSearchMovies({search,genre,review,movieVideo,recommend}))


    }catch(error){
      dispatch(movieActions.getError({error}))
    }
  }

}


function searchByTitle(title,lang){
  console.log(title,'title')
  return async (dispatch,getState)=>{
    try{
      const titleAPI=await api.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=${lang}&page=1&include_adult=false&query=${title}`)
      let searchTitle=titleAPI.data
      console.log(searchTitle,'title')
      dispatch(movieActions.searchByTitle({searchTitle}))
    }catch(error){
      dispatch(movieActions.getError({error}))
    }
  }
 }

 



export const movieAction = { getMovies,searchMovie,searchByTitle};
