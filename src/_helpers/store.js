import {createWrapper} from 'next-redux-wrapper';
import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import {userConstants} from '@/_constants';
import {persistStore} from 'redux-persist';
import rootReducer from '@/_redux/reducer';
import rootSaga from '@/_redux/saga';

const sagaMiddleware = createSagaMiddleware();

let store;

const isClient = typeof window !== 'undefined';

if (isClient) {
   const {persistReducer} = require('redux-persist');
   const storage = require('redux-persist/lib/storage').default;

   const persistedReducer = persistReducer(
      {
         key: `${userConstants.USER_STORE_KEY}`,
         storage,
      },
      rootReducer,
   );

   store = configureStore({
      reducer: persistedReducer,
      middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat([sagaMiddleware]),
   });

   store.__PERSISTOR = persistStore(store);
} else {
   store = configureStore({
      reducer: rootReducer,
      middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat([sagaMiddleware]),
   });
}

store.sagaTask = sagaMiddleware.run(rootSaga);

store.dispatch({type: userConstants.GET_ALL_USERS});

export const wrapper = createWrapper(() => store);
