import { call, put, takeEvery, select } from 'redux-saga/effects';
import { fetchImages } from '../../api';
import { setError, setImages } from '../actions';
import { IMAGES } from '../actionTypes';

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

export function* watchImagesLoad() {
  yield takeEvery(IMAGES.LOAD, handleImagesLoad);
}
