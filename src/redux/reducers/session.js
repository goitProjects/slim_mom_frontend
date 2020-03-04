import { actionTypes } from '../actions/constants';

const INITIAL_STATE = {
  nickname: '',
  token: '',
  userData: {
    groupBlood: 3,
    height: 50,
    desiredWeight: 50,
    currentWeight: 50,
    age: 50
  }
};

const sessionReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case actionTypes.ADD_FETCH_SUCCESS:
      return {
        ...state,
        userData: { ...state.userData, ...payload }
      };
    case actionTypes.ADD_ALL_DATA:
      return { ...state, userData: { ...payload } };
    case actionTypes.USER_REGISTER:
    case actionTypes.USER_DATA:
    case actionTypes.USER_LOGIN:
      return { ...state, ...payload };
    case actionTypes.CLEAR_SESSION:
      return {};
    default:
      return state;
  }
};

export default sessionReducer;
