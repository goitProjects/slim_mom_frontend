import React from 'react';
import PropTypes from 'prop-types';
import styles from './AddNewProductModal.module.css';

const AddNewProductModal = ({ children }) => {
  return <div className={styles.modal_wrapper}>{children}</div>;
};

AddNewProductModal.propTypes = {
  children: PropTypes.shape({}).isRequired
};

export default AddNewProductModal;
