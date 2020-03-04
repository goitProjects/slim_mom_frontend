/* eslint-disable no-underscore-dangle */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Tbody } from 'react-super-responsive-table';
import Spinner from 'react-spinkit';
import { deleteProductFromProductListFunc } from '../../../redux/actions/productActions';
import EatedProductItem from './EatedProductItem/EatedProductItem';
import styles from './EatedProductsList.module.css';

const EatedProductsList = () => {
  const dispatch = useDispatch();
  const deleteProduct = (token, id) =>
    dispatch(deleteProductFromProductListFunc(token, id));
  const productsByDay = useSelector(state => state.dailyBlock.productsByDay);
  const isProductsByDayLoader = useSelector(
    state => state.dailyBlock.isProductsByDayLoader
  );

  return (
    <>
      {productsByDay.length === 0 && (
        <p className={styles.noProducts_p}>
          Здесь будет отображаться Ваш рацион
        </p>
      )}
      {isProductsByDayLoader && (
        <div className={styles.fetch_loader}>
          <Spinner
            name="pacman"
            style={{
              color: '#f47929',
              display: 'block',
              margin: '0 auto',
              transform: 'translate(50%, 50%)'
            }}
          />
        </div>
      )}

      {productsByDay.length > 0 && (
        <div className={styles.tBodyTable}>
          <Table className={styles.firstBlock}>
            <Tbody>
              {productsByDay.map(el => {
                return (
                  <EatedProductItem
                    productItem={el}
                    key={el._id}
                    deleteProduct={deleteProduct}
                  />
                );
              })}
            </Tbody>
          </Table>
        </div>
      )}
    </>
  );
};

export default EatedProductsList;
