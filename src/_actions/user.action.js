import {userConstants} from '../_constants';

export const getAllUsers = (text) => {
   return {
      type: userConstants.GET_ALL_USERS,
      // payload: {
      //    id: new Date().getTime(),
      //    text: text,
      // },
   };
};

// export const deleteUser = (id) => {
//    return {
//       type: 'DELETE_USER',
//       payload: id,
//    };
// };
