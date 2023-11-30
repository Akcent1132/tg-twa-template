import React from 'react';

import styles from './styles.module.css';
import { Rect } from '@src/components/Skeletons';
export const FeedSkeleton: React.FC = () => (
  <>
    <Rect className={styles.pageHead} />
    <div className={styles.panel}>
      <div className={styles['panel-item']}>
        <Rect className={styles['image-wrapper']} />
      </div>
      <div className={styles['panel-item']}>
        <Rect className={styles['image-wrapper']} />
      </div>
      <div className={styles['panel-item']}>
        <Rect className={styles['image-wrapper']} />
      </div>
      <div className={styles['panel-item']}>
        <Rect className={styles['image-wrapper']} />
      </div>
    </div>
  </>
);
