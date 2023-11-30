import React, { useState, useRef, useCallback } from 'react';

import styles from './style.module.css';
import Image from '../../components/Image';
import { useNavigate } from 'react-router-dom';
import { useTgStorage } from '@src/contexts/tg-storage';
import FilterButton from '@src/components/FilterButton/Button';
import { usePaginatedList } from '@src/api/usePaginatedList';
import { useEndlessScroll } from '@src/api/useEndlessScroll';
import { useMovieStorage } from '@src/contexts/movies-storage';
import MenuModal from '@src/components/MenuModal';
import { FeedSkeleton } from './skeleton';

export const Feed = () => {
  const filterData = ['Now playing', 'Upcoming', 'Popular', 'Top rated'];
  const [selected, setSelect] = useState<number>(0);
  const { addToWatchList, watchList, getLoadMoreMovies, isLoadingMore } =
    useTgStorage();
  const { movies, getMovies, isLoading } = useMovieStorage();
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const [modalVisible, setModalVisible] = useState<boolean>(false);

  // const [events, hasMore, loadMore] = usePaginatedList({
  //   items: results,
  //   hasMore: true,
  //   loadMore: () => getLoadMoreMovies,
  //   pageSize: 20,
  // });

  // useEndlessScroll({
  //   ref: loadMoreRef,
  //   isLoading: isLoadingMore,
  //   hasMore,
  //   loadMore,
  //   threshold: 20,
  // });

  if (isLoading) {
    return <FeedSkeleton />;
  }

  return (
    <>
      <MenuModal
        setModalVisibleCallback={() => setModalVisible(false)}
        visible={modalVisible}
      />
      <div className={styles.pageHead}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='32'
          height='32'
          viewBox='0 0 32 32'
          className={styles['menu-icon']}
          onClick={() => setModalVisible(!modalVisible)}
        >
          <g clip-path='url(#clip0_1595_116697)'>
            <path d='M5.01118 8.25684C5.01118 7.56648 5.57083 7.00684 6.26118 7.00684H25.7501C26.4404 7.00684 27.0001 7.56648 27.0001 8.25684C27.0001 8.94719 26.4404 9.50684 25.7501 9.50684H6.26118C5.57083 9.50684 5.01118 8.94719 5.01118 8.25684Z' />
            <path d='M25.7501 25.0039L6.25789 25.0039C5.56754 25.0039 5.00789 24.4443 5.00789 23.754C5.00789 23.0636 5.56753 22.5039 6.25789 22.5039L25.7501 22.5039C26.4404 22.5039 27.0001 23.0635 27.0001 23.7539C27.0001 24.4443 26.4404 25.0039 25.7501 25.0039Z' />
            <path d='M5.25452 14.75C4.56416 14.75 4.00452 15.3096 4.00452 16C4.00452 16.6904 4.56416 17.25 5.25452 17.25H26.75C27.4404 17.25 28 16.6904 28 16C28 15.3096 27.4404 14.75 26.75 14.75H5.25452Z' />
          </g>
          <defs>
            <clipPath id='clip0_1595_116697'>
              <rect width='32' height='32' fill='white' />
            </clipPath>
          </defs>
        </svg>
        <span className={styles.text}>Movie Feed</span>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 18 18'
          className={styles['suggest-icon']}
          onClick={() => navigate('/search')}
        >
          <path d='M1.7015 3.304C1.15545 4.31394 1.11683 4.94568 1.0396 6.20915C1.01362 6.63411 0.998535 7.06747 0.998535 7.50084C0.998535 7.9342       1.01362 8.36757 1.0396 8.79253C1.11683 10.056 1.15545 10.6877 1.7015 11.6977C2.05931 12.3595 3.14076 13.4409 3.80253 13.7987C4.81247       14.3448 5.44421 14.3834 6.70769 14.4606C7.13264 14.4866 7.56601 14.5017 7.99937 14.5017C8.43274 14.5017 8.8661 14.4866 9.29106       14.4606C10.5545 14.3834 11.1863 14.3448 12.1962 13.7987C12.3218 13.7308 12.4624 13.6369 12.6104 13.5247L16.2929 17.2073C16.6834       17.5978 17.3166 17.5978 17.7071 17.2073C18.0976 16.8167 18.0976 16.1836 17.7071 15.793L14.0244 12.1103C14.1361 11.9629 14.2296       11.8228 14.2972 11.6977C14.8433 10.6877 14.8819 10.056 14.9591 8.79253C14.9851 8.36757 15.0002 7.9342 15.0002 7.50084C15.0002       7.06747 14.9851 6.63411 14.9591 6.20915C14.8819 4.94568 14.8433 4.31394 14.2972 3.304C13.9394 2.64222 12.858 1.56078 12.1962       1.20297C11.1863 0.656912 10.5545 0.618297 9.29106 0.541066C8.8661 0.51509 8.43274 0.5 7.99937 0.5C7.56601 0.5 7.13265 0.51509       6.70769 0.541066C5.44421 0.618297 4.81248 0.656912 3.80253 1.20297C3.14076 1.56078 2.05931 2.64222 1.7015 3.304ZM6.82971       2.53734C7.21959 2.51351 7.61191 2.5 7.99937 2.5C8.38683 2.5 8.77916 2.51351 9.16904 2.53734C10.41 2.61319 10.6524 2.64186       11.245 2.96226C11.245 2.96226 11.2514 2.9658 11.2646 2.97405C11.2782 2.98255 11.2966 2.99459 11.3198 3.01072C11.3669 3.04345       11.4256 3.08744 11.4945 3.14323C11.6334 3.25576 11.7901 3.39735 11.9465 3.55371C12.1029 3.71007 12.2445 3.86682 12.357       4.00574C12.4128 4.0746 12.4568 4.13335 12.4895 4.18042C12.5056 4.20361 12.5177 4.22201 12.5262 4.2356C12.5348 4.24939 12.5379       4.25522 12.5379 4.25522C12.8584 4.84784 12.887 5.09022 12.9629 6.33118C12.9867 6.72105 13.0002 7.11338 13.0002 7.50084C13.0002       7.8883 12.9867 8.28063 12.9629 8.6705C12.887 9.91146 12.8584 10.1538 12.5379 10.7465C12.5379 10.7465 12.5348 10.7523 12.5262       10.7661C12.5177 10.7797 12.5056 10.7981 12.4895 10.8213C12.4568 10.8683 12.4128 10.9271 12.357 10.9959C12.2445 11.1349 12.1029       11.2916 11.9465 11.448C11.7901 11.6043 11.6334 11.7459 11.4945 11.8585C11.4256 11.9142 11.3669 11.9582 11.3198 11.991C11.2966       12.0071 11.2782 12.0191 11.2646 12.0276C11.2508 12.0363 11.245 12.0394 11.245 12.0394C10.6524 12.3598 10.41 12.3885 9.16904       12.4643C8.77916 12.4882 8.38683 12.5017 7.99937 12.5017C7.61191 12.5017 7.21959 12.4882 6.82971 12.4643C5.58875 12.3885 5.34638       12.3598 4.75375 12.0394C4.75375 12.0394 4.74793 12.0363 4.73414 12.0276C4.72054 12.0191 4.70214 12.0071 4.67895 11.991C4.63188       11.9582 4.57314 11.9142 4.50427 11.8585C4.36536 11.7459 4.2086 11.6043 4.05224 11.448C3.89588 11.2916 3.75429 11.1349 3.64176       10.9959C3.58598 10.9271 3.54199 10.8683 3.50925 10.8213C3.49312 10.7981 3.48108 10.7797 3.47258 10.7661C3.46434 10.7529 3.46079       10.7464 3.46079 10.7464C3.14039 10.1538 3.11173 9.91143 3.03587 8.6705C3.01204 8.28062 2.99854 7.8883 2.99854 7.50084C2.99854       7.11338 3.01204 6.72105 3.03587 6.33118C3.11173 5.09022 3.14037 4.84789 3.46079 4.25526C3.46079 4.25526 3.46434 4.24879 3.47258       4.2356C3.48108 4.22201 3.49312 4.20361 3.50925 4.18042C3.54199 4.13335 3.58598 4.0746 3.64176 4.00574C3.75429 3.86682 3.89588       3.71007 4.05224 3.55371C4.2086 3.39735 4.36536 3.25576 4.50427 3.14323C4.57314 3.08744 4.63188 3.04345 4.67895 3.01072C4.70214       2.99459 4.72054 2.98255 4.73414 2.97405C4.74793 2.96543 4.75375 2.96228 4.75375 2.96228C5.34638 2.64186 5.58875 2.61319 6.82971       2.53734Z' />
        </svg>
      </div>
      <div className={styles.container}>
        {filterData.map((item, i) => (
          <FilterButton
            onClick={() => {
              setSelect(i);
              getMovies(i, 1);
            }}
            isActive={i === selected}
          >
            {item}
          </FilterButton>
        ))}
      </div>
      <div className={styles.panel}>
        {!isLoading &&
          movies.map((item: any, i: number) => {
            const isInsideList = watchList.includes(item.id);
            return (
              <div key={i} className={styles['panel-item']}>
                <div
                  onClick={() => navigate('/feed/' + item.id)}
                  className={styles['image-wrapper']}
                >
                  <Image
                    className={styles.image}
                    alt={item.title}
                    src={'https://image.tmdb.org/t/p/w185' + item.poster_path}
                  />
                </div>
                <button
                  onClick={() => {
                    isInsideList ? navigate('/watch') : addToWatchList(item.id);
                  }}
                  className={styles.button}
                >
                  {isInsideList ? (
                    <span>View Watch List</span>
                  ) : (
                    <span>+ Watch List</span>
                  )}
                  <svg
                    width='16'
                    height='16'
                    viewBox='0 0 16 16'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    role='presentation'
                    focusable='false'
                  >
                    <path
                      d='M3.333 5.2c0-1.12 0-1.68.218-2.108a2 2 0 01.874-.874C4.853 2 5.413 2 6.533 2h2.934c1.12 0 1.68 0 2.108.218a2 2 0 01.874.874c.218.428.218.988.218 2.108V14L8 11.333 3.333 14V5.2z'
                      stroke='currentColor'
                      className={styles['svg-watchlist']}
                      fill={isInsideList ? 'white' : 'none'}
                    ></path>
                  </svg>
                </button>
              </div>
            );
          })}
        <div ref={loadMoreRef} />
      </div>
    </>
  );
};
