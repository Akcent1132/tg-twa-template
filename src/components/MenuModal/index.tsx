import React, { MouseEvent, useCallback } from 'react';

import MenuList from '../MenuNavigation';

import styles from './style.module.css';

const MenuModal: React.FC<{
  setModalVisibleCallback: (visible: boolean) => void;
  visible: boolean;
}> = ({ setModalVisibleCallback, visible }) => {
  const onClose = useCallback(() => {
    setModalVisibleCallback(false);
  }, [setModalVisibleCallback]);

  const onModalContentClick = useCallback((e: MouseEvent<HTMLImageElement>) => {
    visible = false;
    e.stopPropagation();
  }, []);

  const onLogoutClick = useCallback(() => {}, []);

  const className = [
    styles.modal,
    visible ? styles.visible : styles.hidden,
  ].join(' ');

  return (
    <div className={className} onClick={onClose}>
      <div className={styles.content} onClick={onModalContentClick}>
        <div className={styles.body}>
          <MenuList onItemClick={onClose} />
        </div>
      </div>
    </div>
  );
};

export default MenuModal;
