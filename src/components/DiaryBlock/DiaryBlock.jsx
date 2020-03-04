import React from 'react';
import { useSelector } from 'react-redux';
import { useWindowSize } from '../../utils/hooks';
import AddNewProduct from './AddNewProduct/AddNewProduct';
import DatePicker from './DatePicker/DatePicker';
import EatedProductsList from './EatedProductsList/EatedProductsList';
import AddNewProductModal from './AddNewProductModal/AddNewProductModal';
import ShowModalButton from './ShowModalButton/ShowModalButton';

import styles from './DiaryBlock.module.css';

const DiaryBlock = () => {
  const isModalShowed = useSelector(
    state => state.dailyBlock.isModalProductShowed
  );
  const { width, height } = useWindowSize();
  const isLandscape = width > height;

  return (
    <div className={styles.diaryBlock_wrapper}>
      {(!isModalShowed || width > 767 || isLandscape) && <DatePicker />}

      {(width > 767 || isLandscape) && <AddNewProduct />}

      {(!isModalShowed || width > 767 || isLandscape) && <EatedProductsList />}

      {isModalShowed && width < 767 && !isLandscape && (
        <AddNewProductModal>
          <AddNewProduct />
        </AddNewProductModal>
      )}

      {!isModalShowed && width < 767 && !isLandscape && <ShowModalButton />}
    </div>
  );
};

export default DiaryBlock;
