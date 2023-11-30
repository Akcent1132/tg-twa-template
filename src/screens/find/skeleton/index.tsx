import React, { PropsWithChildren } from 'react';

import styles from './styles.module.css';
import { Rect } from '@src/components/Skeletons';
export const SearchSkeleton: React.FC<PropsWithChildren> = ({ children }) => (
  <>
    <div className={styles.panel}>
      {/* {children} */}
      <div className={styles['panel-item']}>
        <div>
          <Rect className={styles['image-wrapper']} />
        </div>
        <div>
          <Rect className={styles['text']} />
          <Rect className={styles['text']} />
          <Rect className={styles['text']} />
        </div>
      </div>
      <div className={styles['panel-item']}>
        <div>
          <Rect className={styles['image-wrapper']} />
        </div>
        <div>
          <Rect className={styles['text']} />
          <Rect className={styles['text']} />
          <Rect className={styles['text']} />
        </div>
      </div>
      <div className={styles['panel-item']}>
        <div>
          <Rect className={styles['image-wrapper']} />
        </div>
        <div>
          <Rect className={styles['text']} />
          <Rect className={styles['text']} />
          <Rect className={styles['text']} />
        </div>
      </div>
    </div>
  </>
);
