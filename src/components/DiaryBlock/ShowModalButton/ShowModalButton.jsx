import React from 'react';
import { useDispatch } from 'react-redux';
import styles from './ShowModalButton.module.css';
import { Add } from '../../../assets/icons';
import { showModalProductsAction } from '../../../redux/actions/productActions';

const ShowModalButton = () => {
  const dispatch = useDispatch();
  const toogleModal = () => dispatch(showModalProductsAction());

  return (
    <button type="button" onClick={toogleModal} className={styles.modal_button}>
      <Add className={styles.add_icon} />
    </button>
  );
};

export default ShowModalButton;
