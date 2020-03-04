import { actionTypes } from '../actions/constants';

const INITIAL_STATE = {
  date: new Date()
};

const datePickerReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case actionTypes.SET_DATE:
      return { ...state, date: payload };
    default:
      return state;
  }
};

export default datePickerReducer;
