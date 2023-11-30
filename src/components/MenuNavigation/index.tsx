import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './style.module.css';

type MenuItemProps = {
  text: string;
  to: string;
  onItemClick: () => void;
};
type MenuTag = {
  name: string;
  code: string;
};
const MenuItem: React.FC<MenuItemProps> = (props) => {
  const { text, to, onItemClick } = props;
  return (
    <li className={styles.item}>
      <NavLink onClick={onItemClick} className={styles.link} to={to}>
        {text}
      </NavLink>
    </li>
  );
};

export type MenuListProps = {
  tags?: MenuTag[];
  onItemClick: () => void;
};
const MenuList: React.FC<MenuListProps> = (props) => {
  return (
    <ul className={styles.list}>
      <NavLink
        onClick={props.onItemClick}
        className={styles['active-item']}
        to='/'
      >
        Movie Feed
      </NavLink>
      <MenuItem
        key='2'
        to={'/watch'}
        text={'Watch List'}
        onItemClick={props.onItemClick}
      />
      <MenuItem
        key='3'
        to={'/search'}
        text={'Search Page'}
        onItemClick={props.onItemClick}
      />
    </ul>
  );
};

export default MenuList;
