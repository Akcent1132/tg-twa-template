const apiConfig: Record<string,string | Function> = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: "3fac70260a5a4a0cc9324207af7f9c8c",
  originalImage: (imgPath:string) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath:string) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
  w185Image: (imgPath:string) => `https://image.tmdb.org/t/p/w185/${imgPath}`,
};
export default apiConfig;
