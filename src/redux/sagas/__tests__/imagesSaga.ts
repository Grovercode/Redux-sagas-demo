import { getPage, handleImagesLoad } from '../imagesSaga';
import { runSaga } from 'redux-saga';
import * as api from '../../../api';
import { setImages } from '../../actions';

test('selector gives back the page', () => {
  const nextPage = 1;
  const state = { nextPage };
  const res = getPage(state);
  expect(res).toBe(nextPage);
});

test('should load images and handle them in case of success', async () => {
  // dispatched actions
  const dispatchedActions = [];
  const mockedImages = ['abc', 'div'];

  //below is a mock function call that would always return mockedImages that we defined
  api.fetchImages = jest.fn(() => {
    Promise.resolve(mockedImages);
  });

  const fakeStore = {
    getState: () => ({ nextPage: 1 }),
    dispatch: (action) => dispatchedActions.push(action),
  };

  await runSaga(fakeStore, handleImagesLoad).done;

  console.log('dispatched actions = ', dispatchedActions);
  expect(api.fetchImages.mock.calls.length).toBe(1);
  expect(dispatchedActions).toContain(setImages(mockedImages));
});
