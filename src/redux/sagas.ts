import { call, put, takeEvery, all, select } from 'redux-saga/effects';
import { fetchImages } from '../api';
import { setError, setImages } from './actions';
import { GET_USERS_FETCH, GET_USERS_SUCCESS, IMAGES } from './actionTypes';

function usersFetch() {
  return fetch(`https://jsonplaceholder.typicode.com/users`).then((res) =>
    res.json()
  );
}

function* workGetUsersFetch() {
  const users = yield call(usersFetch);
  yield put({ type: GET_USERS_SUCCESS, users });
}

function* watchUsers() {
  yield takeEvery(GET_USERS_FETCH, workGetUsersFetch);
}

export const getPage = (state) => state.nextPage;

export function* handleImagesLoad() {
  try {
    const page = yield select(getPage);
    const images = yield call(fetchImages, page);
    yield put(setImages(images));
  } catch (error) {
    yield put(setError(error.toString()));
  }
}

function* watchImagesLoad() {
  yield takeEvery(IMAGES.LOAD, handleImagesLoad);
}

function* rootSaga() {
  yield all([watchUsers(), watchImagesLoad()]);
}

export default rootSaga;
