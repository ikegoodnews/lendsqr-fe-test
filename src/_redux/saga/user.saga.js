import {userConstants} from '@/_constants';
import {call, put, takeLatest, all} from 'redux-saga/effects';
import {checkStatus, createRequest, getObjectFromStorage, parseResponse} from '@/_helpers';

function* retrieveUserSaga() {
   yield put({type: userConstants.RETRIEVING_USER_FROM_STORAGE});

   try {
      const retrievedUser = yield call(getObjectFromStorage, userConstants.USER_KEY);
      console.log('retrievedUser', retrievedUser);

      if (retrievedUser) {
         yield put({
            type: userConstants.RETRIEVE_USERS_FROM_STORAGE_SUCCESS,
            users: retrievedUser,
         });
         // AppEmitter.emit(userConstants.GET_USER_SUCCESS, retrievedUser);
         return;
      }
      // yield call(clearObjectFromStorage, userConstants.USER_KEY);

      yield put({type: userConstants.RETRIEVE_USERS_FROM_STORAGE_ERROR});
   } catch (error) {
      if (error?.response) {
         const res = yield call(parseResponse, error.response);
         console.log('RETRIEVE_USERS_FROM_STORAGE_ERROR message', res);

         yield put({
            type: userConstants.RETRIEVE_USERS_FROM_STORAGE_ERROR,
            error: res?.message,
         });

         return;
      }
      console.log('RETRIEVE_USERS_FROM_STORAGE_ERROR message', error?.message);
      yield put({
         type: userConstants.RETRIEVE_USERS_FROM_STORAGE_ERROR,
         error: error?.message,
      });
   }
}

function* getAllUsers({data}) {
   yield put({type: userConstants.REQUESTING_ALL_USERS});

   try {
      // const user = yield call(getObjectFromStorage, userConstants.USER_KEY);
      // console.log('user all time', user);
      let usersUri = `${userConstants.USER_URI}`;
      if (data?.page) {
         usersUri = `${usersUri}&page=${data.page + 1}`;
      }

      const usersReq = createRequest(usersUri, {
         method: 'GET',
      });
      const response = yield call(fetch, usersReq);
      yield call(checkStatus, response);

      if (response.status === 401) {
         yield put({type: userConstants.TOKEN_HAS_EXPIRED});
         // yield call(clearObjectFromStorage, userConstants.USER_KEY);
         return;
      }

      if (response.status === 204) {
         yield put({
            type: userConstants.GET_ALL_USERS_SUCCESS_WITHOUT_DATA,
         });
         return;
      }

      const jsonResponse = yield call(parseResponse, response);
      console.log('GET_ALL_USERS_SUCCESS message', jsonResponse);

      yield put({
         type: userConstants.GET_ALL_USERS_SUCCESS,
         users: jsonResponse,
      });
   } catch (error) {
      if (error?.response) {
         const res = yield call(parseResponse, error.response);
         console.log('GET_ALL_USERS_ERROR message', res);

         yield put({
            type: userConstants.GET_ALL_USERS_ERROR,
            error: res?.message,
         });

         // yield put(
         //    appActions.setSnackBar({
         //       message: res?.message ?? 'Something went wrong',
         //       variant: 'error',
         //    }),
         // );
         return;
      }
      console.log('GET_ALL_USERS_ERROR message', error?.message);
      yield put({
         type: userConstants.GET_ALL_USERS_ERROR,
         error: error?.message,
      });
      // yield put(
      //    appActions.setSnackBar({
      //       message: error?.message ?? 'Something went wrong',
      //       variant: 'error',
      //    }),
      // );
   }
}

function* getUserSagaWatcher() {
   yield takeLatest(userConstants.RETRIEVE_USERS_FROM_STORAGE, retrieveUserSaga);
}

function* getAllUserSagaWatcher() {
   yield takeLatest(userConstants.GET_ALL_USERS, getAllUsers);
}

export default function* rootSaga() {
   yield all([getUserSagaWatcher(), getAllUserSagaWatcher()]);
}
