import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchUsers } from '../../api';
import { GET_USERS_FETCH, GET_USERS_SUCCESS } from '../actionTypes';

function* getUsersFetch() {
  const users = yield call(fetchUsers);
  yield put({ type: GET_USERS_SUCCESS, users });
}

export function* watchUsers() {
  yield takeEvery(GET_USERS_FETCH, getUsersFetch);
}
