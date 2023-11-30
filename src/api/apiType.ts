
import apiConfig from "./apiConfig";
import axiosClient from "./axiosClient";


export const movieType:any = ["now_playing",
  "upcoming","popular",
   "top_rated" ];

//call api axios TMDB
export const  getMoviesList = (type:number,page:number) => {
    const url = `movie/${movieType[type]}?api_key=${apiConfig.API_KEY}&language=en-US&page=${page}`;
    return axiosClient.get(url);
  }
export const search = (keywords:string,page:number) => {
    const url = `search/movie?query=${keywords}&api_key=${apiConfig.API_KEY}&language=en-US&page=${page}`;
    return axiosClient.get(url);
  }

 
 export const detail= (id:string) => {
    const url = `movie/${id}?api_key=${apiConfig.API_KEY}&language=en-US`;
    return axiosClient.get(url);
  }
