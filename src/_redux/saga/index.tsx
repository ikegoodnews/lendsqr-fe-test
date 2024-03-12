import {all} from 'redux-saga/effects';
import userRootSaga from './user.saga';

export default function* rootSaga() {
   yield all([userRootSaga()]);
}
