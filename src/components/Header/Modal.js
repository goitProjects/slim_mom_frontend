import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styles from './Modal.module.css';
import Icon from '../../assets/icons/Icon/Icon';

const Modal = ({ toogleModal }) => {
  return (
    <div className={styles.container}>
      <Icon onClick={toogleModal} className={styles.cross} icon="Close" />
      <div className={styles.linkBox}>
        <NavLink onClick={toogleModal} exact to="/dashboard/diary">
          Дневник
        </NavLink>
        <NavLink onClick={toogleModal} exact to="/dashboard">
          Калькулятор
        </NavLink>
        <NavLink onClick={toogleModal} exact to="/dashboard/achievement">
          Достижения
        </NavLink>
      </div>
    </div>
  );
};

Modal.propTypes = {
  toogleModal: PropTypes.func.isRequired
};

export default Modal;
