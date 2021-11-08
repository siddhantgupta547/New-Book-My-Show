import {
  ADD_FILTER,
  REMOVE_FILTER,
  CLEAR_FILTER
} from '../actions/actionTypes';

//intial state has keys according to the filters available.
const initialState = {
  EventLanguage: [],
  EventGenre: []
};

export default function filtersReducer(state = initialState, action) {
  switch (action.type) {
    //Add filter would check if properties recieved in action are present in the state and if it is then value is added in the state.
    case ADD_FILTER:
      let addFiltersNewState = { ...state };
      if (addFiltersNewState.hasOwnProperty(action.key)) {
        addFiltersNewState[action.key] = [
          ...addFiltersNewState[action.key],
          action.value
        ];
      }
      return addFiltersNewState;
    case REMOVE_FILTER:
      //Filter function is used to remove the provided value in action.
      let removeFiltersNewState = { ...state };
      if (removeFiltersNewState.hasOwnProperty(action.key)) {
        const filteredArray = removeFiltersNewState[action.key].filter(
          (item) => {
            if (item !== action.value) return item;
          }
        );
        removeFiltersNewState[action.key] = filteredArray;
      }
      return removeFiltersNewState;
    case CLEAR_FILTER:
      //To remove all the filters
      return {
        EventLanguage: [],
        EventGenre: []
      };
    default:
      return state;
  }
}
