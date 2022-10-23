import {combineReducers} from 'redux';

// import notificationReducer from '../features/notification/NotificationSlice';

import authReducer from '../features/auth/authSlices';
import NotificationSlice from '../features/notification/NotificationSlice';

export default combineReducers({
  auth: authReducer,
  noti:NotificationSlice
});
