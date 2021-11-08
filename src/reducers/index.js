import { combineReducers } from 'redux';

import filtersReducer from '../reducers/filtersReducer';
import dataReducer from '../reducers/dataReducer';

//Combone reducers to combine all the reducers
export default combineReducers({
  data: dataReducer,
  filters: filtersReducer
});
