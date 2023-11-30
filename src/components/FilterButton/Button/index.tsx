import React, { ReactNode } from 'react';

import styles from './styles.module.css';

type Props = {
  children: ReactNode;
  onClick: () => void;
  isActive?: boolean;
  tip?: boolean;
};

const FilterButton: React.FC<Props> = (props) => {
  const classNames = [styles.button];

  if (props.isActive) {
    classNames.push(styles.active);
  }

  if (props.tip) {
    classNames.push(styles.tip);
  }

  return (
    <div className={classNames.join(' ')} onClick={props.onClick}>
      {props.children}
    </div>
  );
};

export default FilterButton;
