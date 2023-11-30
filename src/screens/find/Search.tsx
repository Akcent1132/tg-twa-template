import React, { useMemo, useState } from 'react';

import styles from './style.module.css';
import Image from '../../components/Image';
import { useTgStorage } from '@src/contexts/tg-storage';
import { useNavigate } from 'react-router-dom';
import { useMovieStorage } from '@src/contexts/movies-storage';
import { BackButton } from '@vkruglikov/react-telegram-web-app';
import { throttle } from 'throttle-debounce';
import SuggestInput from './Input';
import { SearchSkeleton } from './skeleton';

export const Search: React.FC = () => {
  const navigate = useNavigate();
  const { watchList, addToWatchList } = useTgStorage();
  const { isLoading, searchMovie, addToWatchListFromSearch, getSearch } =
    useMovieStorage();
  const onInputChange = useMemo(() => {
    return throttle(800, (text: string) => {
      text = text.trim();
      if (!text) {
        return;
      }
      getSearch(text);
    });
  }, []);

  return (
    <>
      <div className={styles.panel}>
        <h3 className={styles.mainTitle}>Search Page</h3>
        <div className={styles.container}>
          <SuggestInput onChange={onInputChange} />
        </div>
        {searchMovie.length === 0 && (
          <h2 className={styles.emptyTitle}>While empty...</h2>
        )}
        {isLoading && <SearchSkeleton />}
        {searchMovie.map((item: any, i: number) => {
          const isInsideList = watchList.includes(item.id);
          return (
            <div key={i} className={styles['panel-item']}>
              <div
                onClick={() => {
                  navigate('/feed/' + item.id);
                }}
                className={styles['image-wrapper']}
              >
                <Image
                  className={styles.image}
                  alt={item.title}
                  src={'https://image.tmdb.org/t/p/w300' + item.poster_path}
                />
              </div>
              <div className={styles.annotation}>
                <div className={styles.description}>
                  <div className={styles.title}>{item.title}</div>
                  <div className={styles.annotation}>{item.overview}</div>
                  <button
                    className={styles.button}
                    onClick={() => {
                      if (isInsideList) {
                        navigate('/watch');
                      } else {
                        addToWatchListFromSearch(item);
                        addToWatchList(item.id);
                      }
                    }}
                  >
                    {isInsideList ? (
                      <span>View Watch List</span>
                    ) : (
                      <span>+ Watch List</span>
                    )}
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='16'
                      height='16'
                      viewBox='0 0 16 16'
                      fill='none'
                    >
                      <path
                        d='M6.6668 7.25C7.08101 7.25 7.4168 7.58579 7.4168 8V10.6667C7.4168 11.0809 7.08101 11.4167 6.6668 11.4167C6.25259 11.4167 5.9168 11.0809 5.9168 10.6667V8C5.9168 7.58579 6.25258 7.25 6.6668 7.25Z'
                        fill='white'
                      />
                      <path
                        d='M9.33345 7.25C9.74767 7.25 10.0835 7.58579 10.0835 8V10.6667C10.0835 11.0809 9.74767 11.4167 9.33345 11.4167C8.91924 11.4167 8.58345 11.0809 8.58345 10.6667V8C8.58345 7.58579 8.91924 7.25 9.33345 7.25Z'
                        fill='white'
                      />
                      <path
                        d='M11.0001 3.49658C10.9999 3.19875 10.9728 2.91096 10.9332 2.64928C10.856 2.13872 10.8174 1.88344 10.5152 1.57547C10.2129 1.26749 9.9376 1.22057 9.38693 1.12674C8.97118 1.05589 8.48843 1 8.00008 1C7.51173 1 7.02898 1.05589 6.61323 1.12674C6.06256 1.22057 5.78722 1.26749 5.48497 1.57547C5.18272 1.88344 5.14413 2.13872 5.06695 2.64928C5.0274 2.91096 5.00029 3.19875 5.00008 3.49658H2.21162C1.79741 3.49658 1.50001 3.83237 1.50001 4.24658C1.50001 4.63733 1.76044 4.95829 2.14203 4.9934C2.05816 5.83611 2.00005 6.83896 2.00005 8.00009C2.00005 9.26544 2.06906 10.3428 2.16521 11.2297C2.3019 12.4906 2.37025 13.1211 3.14761 13.8983C3.92497 14.6755 4.55737 14.744 5.82216 14.8809C6.47855 14.9519 7.21352 15.0001 8.00005 15.0001C8.78659 15.0001 9.52158 14.9519 10.178 14.8809C11.4427 14.744 12.0751 14.6755 12.8525 13.8983C13.6298 13.1211 13.6982 12.4907 13.8349 11.2298C13.931 10.3429 14 9.26548 14 8.00008C14 6.83896 13.9419 5.83611 13.8581 4.9934C14.2396 4.95829 14.5001 4.63733 14.5001 4.24658C14.5001 3.83237 14.2027 3.49658 13.7885 3.49658H11.0001ZM8.00008 2.5C7.62024 2.5 7.22537 2.54405 6.8652 2.60542C6.74001 2.62676 6.65438 2.64149 6.58416 2.65532C6.57486 2.71045 6.56445 2.77857 6.5501 2.87347C6.51948 3.07605 6.50029 3.28764 6.50008 3.49658H9.50008C9.49987 3.28764 9.48068 3.07605 9.45006 2.87347C9.43571 2.77857 9.4253 2.71045 9.416 2.65532C9.34578 2.64149 9.26015 2.62676 9.13496 2.60542C8.77479 2.54405 8.37992 2.5 8.00008 2.5ZM3.50005 8.00009C3.50005 6.82046 3.56273 5.81863 3.64956 4.99658H12.3505C12.4374 5.81863 12.5 6.82046 12.5 8.00008C12.5 9.21082 12.434 10.2342 12.3436 11.0681C12.2701 11.7461 12.2306 12.0518 12.1547 12.2902C12.1039 12.4497 12.0302 12.5993 11.7919 12.8376C11.5541 13.0753 11.4043 13.1491 11.2436 13.2002C11.0039 13.2764 10.6964 13.316 10.0166 13.3896C9.40662 13.4556 8.72593 13.5001 8.00005 13.5001C7.27419 13.5001 6.5935 13.4556 5.98358 13.3896C5.30368 13.316 4.99616 13.2764 4.75644 13.2002C4.59573 13.1491 4.44594 13.0753 4.20818 12.8376C3.96987 12.5993 3.89622 12.4497 3.84542 12.2902C3.76949 12.0518 3.72997 11.746 3.65647 11.0681C3.56607 10.2341 3.50005 9.21078 3.50005 8.00009Z'
                        fill='white'
                      />
                      <path
                        d='M7.4168 8C7.4168 7.58579 7.08101 7.25 6.6668 7.25C6.25258 7.25 5.9168 7.58579 5.9168 8V10.6667C5.9168 11.0809 6.25259 11.4167 6.6668 11.4167C7.08101 11.4167 7.4168 11.0809 7.4168 10.6667V8ZM10.0835 8C10.0835 7.58579 9.74767 7.25 9.33345 7.25C8.91924 7.25 8.58345 7.58579 8.58345 8V10.6667C8.58345 11.0809 8.91924 11.4167 9.33345 11.4167C9.74767 11.4167 10.0835 11.0809 10.0835 10.6667V8Z'
                        fill='white'
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        <BackButton
          onClick={() => {
            navigate('/feed');
          }}
        />
      </div>
    </>
  );
};
