import React from 'react';

// import { Rect } from '../../Skeletons';

import styles from './styles.module.css';

const FilterButtonSkeleton: React.FC = () => (
  <div className={styles.block}>
    {Array(2)
      .fill(0)
      .map((_, index) => (
        <></>
        // <Rect key={index} className={styles.filter} />
      ))}
  </div>
);

export default FilterButtonSkeleton;
