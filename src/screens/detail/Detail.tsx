import Image from '@src/components/Image';
import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import data from '../data.json';
import { useNavigate, useParams } from 'react-router-dom';
import { BackButton } from '@vkruglikov/react-telegram-web-app';
import { detail } from '@src/api/apiType';
import { DetailSkeleton } from './Skeleton';
import toast from 'react-hot-toast';

type Props = {
  id?: string;
};

export const Detail: React.FC<Props> = (props) => {
  const { results } = data;
  const { id } = useParams();
  const nav = useNavigate();
  const [isLoading, setLoading] = useState(true);
  const [movie, setMovie] = useState<any>();

  useEffect(() => {
    detail(id)
      .then((data: any) => {
        if (data) {
          setMovie(data);
          setLoading(false);
        }
      })
      .catch((error) => {
        setMovie(results[0]);
        setLoading(false);
        toast.error('Network issue');
      });
  }, []);
  if (isLoading) {
    return (
      <>
        <DetailSkeleton />
        <BackButton
          onClick={() => {
            nav('/feed');
          }}
        />
      </>
    );
  }

  return (
    <>
      <div className={styles.cover}>
        <Image
          src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
          className={styles.image}
        />

        <div className={styles.overview}>
          <h1 className={styles['title-img']}>{movie?.title}</h1>
          <div className={styles.argument}>{`${movie?.tagline}`}</div>
        </div>
      </div>
      <div>
        <h2 className={styles.title}>Description</h2>
        <div className={styles['description']}>{movie?.overview}</div>
      </div>
      <BackButton
        onClick={() => {
          nav('/feed');
        }}
      />
    </>
  );
};
