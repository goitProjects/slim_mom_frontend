/* eslint-disable no-console */
import { createAction } from '../../utils/utils';
import { actionTypes } from './constants';
import {
  fetchAllProducts,
  fetchProductsByDay,
  fetchUserEated,
  requestProductByDate,
  putNewData,
  deleteProdByDay
} from '../../utils/requests';

const addProductByDate = createAction(actionTypes.ADD_PRODUCT_BY_DATE);
const addNewData = createAction(actionTypes.ADD_FETCH_SUCCESS);
export const addAllData = createAction(actionTypes.ADD_ALL_DATA);
export const clearSessionAction = createAction(actionTypes.CLEAR_SESSION);

export const updateData = (token, data) => dispatch => {
  putNewData(token, data)
    .then(answ => {
      dispatch(addNewData(answ.data.userData));
      return true;
    })
    .catch(err => err);
};

export const getProductByDate = (date, token) => dispatch =>
  requestProductByDate(date, token)
    .then(({ data }) => {
      dispatch(addProductByDate(data.products));
      return true;
    })
    .catch(({ error }) => error);

export const showModalProductsAction = () => {
  return {
    type: actionTypes.SHOW_MODAL_PRODUCTS
  };
};

export const closeModalProductsAction = () => {
  return {
    type: actionTypes.CLOSE_MODAL_PRODUCTS
  };
};

export const getAllProductsAction = token => dispatch => {
  fetchAllProducts(token)
    .then(products => {
      dispatch({
        type: actionTypes.GET_ALL_PRODUCTS,
        payload: products
      });
    })
    .catch(err => {
      dispatch({
        type: actionTypes.FETCH_ERROR,
        payload: err
      });
    });
};

export const getProductsByDayAction = (token, day) => dispatch => {
  dispatch({ type: actionTypes.TOOGLE_FETCH_PROD_BY_DAY_LOADER });
  fetchProductsByDay(token, day)
    .then(products => {
      dispatch({
        type: actionTypes.GET_PRODUCTS_PER_DAY,
        payload: products
      });
      dispatch({ type: actionTypes.TOOGLE_FETCH_PROD_BY_DAY_LOADER });
    })
    .catch(err => {
      dispatch({
        type: actionTypes.FETCH_ERROR,
        payload: err
      });
      dispatch({ type: actionTypes.TOOGLE_FETCH_PROD_BY_DAY_LOADER });
    });
};

export const addProductByDayAction = (token, productId, weight) => dispatch => {
  fetchUserEated(token, productId, weight)
    .then(products => {
      dispatch({
        type: actionTypes.ADD_PRODUCT_BY_DAY,
        payload: products
      });
    })
    .catch(err => {
      dispatch({
        type: actionTypes.FETCH_ERROR,
        payload: err
      });
    });
};

export const deleteProductFromProductListAC = id => ({
  type: actionTypes.DELETE_PRODUCT_FROM_PRODUCTLIST,
  payload: id
});

export const deleteProductFromProductListFunc = (token, id) => dispatch => {
  deleteProdByDay(token, id)
    .then(resp => {
      if (resp.status !== 'success') {
        throw new Error(resp.data);
      }
      dispatch(deleteProductFromProductListAC(id));
    })
    .catch(err => {
      dispatch({
        type: actionTypes.FETCH_ERROR,
        payload: err
      });
    });
};
