import { actionTypes } from './constants';

export const setDateAction = date => ({
  type: actionTypes.SET_DATE,
  payload: date
});

export const test = date => ({
  type: actionTypes.SET_DATE,
  payload: date
});
