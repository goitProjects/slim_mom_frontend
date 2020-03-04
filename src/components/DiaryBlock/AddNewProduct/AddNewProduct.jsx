/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useWindowSize } from '../../../utils/hooks';
import Selector from './ProductSelector/ProductSelector';
import styles from './AddNewProduct.module.css';
import Icon from '../../../assets/icons/Icon/Icon';
import {
  addProductByDayAction,
  closeModalProductsAction
} from '../../../redux/actions/productActions';

const AddNewProduct = () => {
  const { width, height } = useWindowSize();
  const isLandscape = width > height;
  const [productWeight, setProductWeight] = useState('');
  const [productId, setProductId] = useState('');
  const [productLabel, setProductLabel] = useState('');
  const [isNotAllowedAddProd, setIsNotAllowedAddProd] = useState(false);

  const dispatch = useDispatch();
  const [inputWeightClasses, setInputWeightClasses] = useState([
    styles.inputWeight_label
  ]);
  const date = useSelector(state => state.datePicker.date);
  const countProductsByDay = useSelector(
    state => state.dailyBlock.productsByDay.length
  );

  const session = useSelector(state => state.session);

  const validateInputWeight = e => {
    const invalidChars = ['-', '+', 'e', 'E', ',', '.'];

    if (invalidChars.includes(e.key)) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    const inputWeight = document.getElementById('gramms');
    inputWeight.addEventListener('keydown', validateInputWeight);
    return () => {
      inputWeight.removeEventListener('keydown', validateInputWeight);
    };
  }, [productWeight]);

  const handlerInputWeight = value => {
    if (Number(value <= 1000)) {
      setProductWeight(value);
    }
    if (value === '') {
      setInputWeightClasses([styles.inputWeight_label]);
    } else {
      setInputWeightClasses([styles.inputWeight_label, styles.inputHasValue]);
    }
  };

  const handlerProductSelect = e => {
    setProductId(e.value);
  };

  const handlerAddButton = () => {
    if (countProductsByDay >= 30) {
      setIsNotAllowedAddProd(true);
      setTimeout(() => {
        setIsNotAllowedAddProd(false);
      }, 1500);
      return;
    }

    if (productWeight !== '' && productId !== '') {
      const addUserEatedProduct = (token, id, weight) =>
        dispatch(addProductByDayAction(token, id, weight));
      const closeModal = () => dispatch(closeModalProductsAction());
      const eatedProd = {
        date: date.toISOString(),
        weight: Number(productWeight),
        dailyRate: session.userData && session.userData.dailyRate
      };
      const token = localStorage.getItem('userToken');
      addUserEatedProduct(token, productId, eatedProd);
      handlerInputWeight('');
      setProductId('');
      setProductLabel('');
      closeModal();
    }
  };

  return (
    <form className={styles.addProduct_wrapper}>
      <Selector
        handlerInputWeight={handlerInputWeight}
        handlerProductSelect={handlerProductSelect}
        productLabel={productLabel}
        setProductLabel={setProductLabel}
        productWeight={productWeight}
      />

      <div className={styles.inputWeight_wrapper}>
        <label htmlFor="gramms" className={inputWeightClasses.join(' ')}>
          Граммы
        </label>
        <input
          id="gramms"
          type="number"
          step="10"
          min="10"
          className={styles.inputProduct_weight}
          value={productWeight}
          onChange={e => handlerInputWeight(e.target.value)}
        />
      </div>

      {isNotAllowedAddProd && (
        <div className={styles.notAllowed_Wrapper}>
          <p className={styles.notAllowed}>
            Нельзя добавить более 30 продуктов
          </p>
        </div>
      )}

      <button
        onClick={handlerAddButton}
        type="button"
        className={styles.add_btn}
      >
        {width < 767 && !isLandscape ? (
          'Добавить'
        ) : (
          <Icon icon="Add" className={styles.addBtn_icon} />
        )}
      </button>
    </form>
  );
};

export default AddNewProduct;
