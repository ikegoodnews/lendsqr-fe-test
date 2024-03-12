import {userConstants} from '@/_constants';
import {updateObject} from '@/_helpers';
import {combineReducers} from 'redux';

const IsRequestingAllUsers = (state = false, action) => {
   switch (action.type) {
      case userConstants.REQUESTING_ALL_USERS:
         return true;
      case userConstants.GET_ALL_USERS_SUCCESS:
         return false;
      case userConstants.GET_ALL_USERS_ERROR:
      default:
         return state;
   }
};

const emptyState = {
   id: '',
   title: '',
};

const allUsers = (state = [], action) => {
   switch (action.type) {
      case userConstants.GET_ALL_USERS_SUCCESS:
         return action.users;
      case userConstants.RETRIEVE_USERS_FROM_STORAGE_SUCCESS:
         return action.users;
      case userConstants.GET_ALL_USERS_SUCCESS_WITHOUT_DATA:
         return updateObject(state, emptyState);
      default:
         return state;
   }
};

const rootReducer = combineReducers({
   IsRequestingAllUsers,
   allUsers,
});

export default rootReducer;
