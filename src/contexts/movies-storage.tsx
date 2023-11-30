import { getMoviesList, search } from '@src/api/apiType';
import React, {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import toast from 'react-hot-toast';
import data from '../screens/data.json';
export const MovieStorageContext = createContext(undefined);

export const MovieStorageProvider: FC<PropsWithChildren> = ({ children }) => {
  const { results } = data;
  const [movies, setMovie] = useState<any>([]);
  const [searchMovie, setSearchMovie] = useState<any>([]);
  const [filter, setFilter] = useState<number>(0);
  const [isLoading, setLoading] = useState(true);
  const [isLoadingMore, setLoadingMre] = useState(false);
  const getMovies = (type = 0, page = 1) => {
    getMoviesList(type, page)
      .then((data: any) => {
        if (data.results) {
          setMovie(data.results);
          setLoading(false);
        }
      })
      .catch((error) => {
        setMovie(results);
        setLoading(false);
        toast.error('Network issue');
      });
  };
  const addToWatchListFromSearch = (item: any) => {
    let data = movies;
    data.push(item);
    setMovie(data);
  };
  const getLoadMoreMovies = (type = 0, page = 2) => {
    setLoadingMre(true);
    console.log('loadmore');
    getMoviesList(type, page).then((data: any) => {
      if (data.results) {
        setMovie(() => [...data.results, ...movies]);
        setLoadingMre(false);
      }
    });
  };
  const getSearch = (text: string) => {
    setLoading(true);
    search(text, 1)
      .then((data: any) => {
        if (data.results) {
          setSearchMovie(() => [...data.results]);
          setLoading(false);
        }
      })
      .catch((error) => {
        setSearchMovie(() => [...results]);
        setLoading(false);
        toast.error('Network issue');
      });
  };
  const getMovieById = (id: number) => {};

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <MovieStorageContext.Provider
      value={{
        searchMovie,
        movies,
        getMovies,
        getSearch,
        getMovieById,
        getLoadMoreMovies,
        addToWatchListFromSearch,
        isLoading,
        isLoadingMore,
      }}
    >
      {children}
    </MovieStorageContext.Provider>
  );
};
export const useMovieStorage = () => {
  const ctx = useContext(MovieStorageContext);

  if (!ctx) {
    throw new Error(
      'useMovieStorage should be used inside MovieStorageContext',
    );
  }

  return ctx;
};
