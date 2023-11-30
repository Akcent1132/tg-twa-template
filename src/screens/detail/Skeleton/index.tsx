import React from 'react';

import styles from './styles.module.css';
import { Rect, Text } from '@src/components/Skeletons';
export const DetailSkeleton: React.FC = () => (
  <>
    <div className={styles.cover}>
      <Rect className={styles.image} />
    </div>
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        marginTop: '10px',
      }}
    >
      <Text className={styles['button-desc']} />
      <Text className={styles['button-desc']} />
      <Text className={styles['button-desc']} />
    </div>
  </>
);
