import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './UserBar.module.css';

const UserBar = () => {
  return (
    <div className={styles.container}>
      <NavLink exact to="/login" className={styles.link}>
        <p>Вход | Регистрация</p>
      </NavLink>
    </div>
  );
};

export default UserBar;
