/* eslint-disable no-underscore-dangle */
import { actionTypes } from '../actions/constants';

const INITIAL_STATE = {
  isModalProductShowed: false,
  allProducts: [],
  isProductsByDayLoader: false,
  selectedProduct: {},
  productsByDay: []
};

const productReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case actionTypes.TOOGLE_FETCH_PROD_BY_DAY_LOADER:
      return { ...state, isProductsByDayLoader: !state.isProductsByDayLoader };
    case actionTypes.ADD_PRODUCT_BY_DAY:
      return { ...state, productsByDay: [payload, ...state.productsByDay] };
    case actionTypes.SHOW_MODAL_PRODUCTS:
      return { ...state, isModalProductShowed: true };
    case actionTypes.CLOSE_MODAL_PRODUCTS:
      return { ...state, isModalProductShowed: false };
    case actionTypes.GET_ALL_PRODUCTS:
      return { ...state, allProducts: [...state.allProducts, ...payload] };
    case actionTypes.GET_PRODUCTS_PER_DAY:
      return { ...state, productsByDay: [...payload] };
    case actionTypes.DELETE_PRODUCT_FROM_PRODUCTLIST: {
      const newProduct = state.productsByDay.filter(
        prod => prod._id !== payload
      );
      return { ...state, productsByDay: newProduct };
    }
    case actionTypes.FETCH_ERROR:
      return { ...state };
    default:
      return state;
  }
};

export default productReducer;
