import { combineReducers } from 'redux';
import todos from './todos';
import visibilityFilter from './visibilityFilter';
import users from './users';
import { reducer as formReducer } from 'redux-form';
import loadingReducer from './imageReducers/loading';
import errorReducer from './imageReducers/error';
import imagesReducer from './imageReducers/image';
import pageReducer from './imageReducers/pages';

export default combineReducers({
  todos,
  visibilityFilter,
  users,
  isLoading: loadingReducer,
  images: imagesReducer,
  error: errorReducer,
  nextPage: pageReducer,
  form: formReducer,
});
