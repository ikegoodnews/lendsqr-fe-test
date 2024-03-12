import {userConstants} from '../_constants';

const getAllUsers = (model) => ({
   type: userConstants.GET_ALL_USERS,
   // data: model,
});

const retrieveAllUsers = (model) => ({
   type: userConstants.RETRIEVE_USERS_FROM_STORAGE,
   // data: model,
});

export const userActions = {
   getAllUsers,
   retrieveAllUsers,
};
