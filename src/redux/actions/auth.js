/* eslint-disable no-console */
/* eslint-disable import/no-cycle */
import {
  requestRegister,
  requestLogin,
  requestUserData
} from '../../utils/requests';
import { actionTypes } from './constants';
import { createAction } from '../../utils/utils';

const userLogin = createAction(actionTypes.USER_LOGIN);
const userRegister = createAction(actionTypes.USER_REGISTER);
const userData = createAction(actionTypes.USER_DATA);

export const sendRegisterData = data => dispatch => {
  return requestRegister(data)
    .then(response => {
      if (response.status === 200) {
        dispatch(userRegister(response.data.user));
        return response;
      }
      if (response.status >= 400) {
        return response;
      }
      return response;
    })
    .catch(err => err);
};

export const sendLoginData = data => dispatch => {
  return requestLogin(data)
    .then(response => {
      if (response.status === 200) {
        dispatch(userLogin(response.data.user));
        return response;
      }
      if (response.status >= 400) {
        return response;
      }
      return response;
    })
    .catch(err => err);
};

export const getUserData = token => dispatch =>
  requestUserData(token)
    .then(({ data }) => {
      dispatch(userData(data.user));
    })
    .catch(({ error }) => error);
