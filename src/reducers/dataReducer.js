import {
  FETCH_MOVIES_START,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_FAILURE
} from '../actions/actionTypes';

const initialState = {
  loading: false,
  error: '',
  movies: [],
  languages: []
};

//Actions would set the data into movies and languages and would get loading to be true or false.
export default function dataReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_MOVIES_START:
      return {
        ...state,
        loading: true
      };
    case FETCH_MOVIES_SUCCESS:
      return {
        loading: false,
        movies: action.movies,
        languages: action.languages
      };
    case FETCH_MOVIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}
