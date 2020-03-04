import { combineReducers } from 'redux';
import sessionReducer from './reducers/session';
import productReducer from './reducers/productReducer';
import datePickerReducer from './reducers/datePickerReducer';

const rootReducer = combineReducers({
  session: sessionReducer,
  dailyBlock: productReducer,
  datePicker: datePickerReducer
});

export default rootReducer;
