import {
  combineReducers
} from 'redux';

import modalReducer from './modalReducer';
import secondModalReducer from './secondModalReducer';
import snackBarReducer from './snackBarReducer';
import loginReducer from './loginReducer';

// import notificationReducer from './notificationReducer';


const rootReducer = combineReducers({
  modalReducer,
  secondModalReducer,
  snackBarReducer,
  loginReducer,
});

export default rootReducer;