import { all } from 'redux-saga/effects';
import { watchImagesLoad } from './imagesSaga';
import { watchStatsRequest } from './statsSaga';
import { watchUsers } from './usersSaga';

function* rootSaga() {
  yield all([watchUsers(), watchImagesLoad(), watchStatsRequest()]);
}

export default rootSaga;
