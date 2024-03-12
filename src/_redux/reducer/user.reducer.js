import {userConstants} from '@/_constants';
import {combineReducers} from 'redux';

const initialState = {
   users: [],
};

const userReducer = (state = initialState, action) => {
   switch (action.type) {
      case userConstants.GET_ALL_USERS:
         return {
            ...state,
            users: [...state.users, action.payload],
         };
      // case 'DELETE_USER':
      //    return {
      //       ...state,
      //       tasks: state.tasks.filter((task) => task.id !== action.payload),
      //    };
      default:
         return state;
   }
};

const rootReducer = combineReducers({
   userReducer,
});

export default rootReducer;
