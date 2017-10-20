import { SET_ADS_AS_LOADED, SET_FILTER_RESULTS } from '../actions/actionTypes';
import { FilterResultsAction } from '../actions/filterResultsActions';
import { FilterResults, InitialState } from '../models/filterResultsModel';

export default function filterResultsReducer(state: InitialState = {}, action: any): InitialState {
  switch (action.type) {
    case SET_FILTER_RESULTS:
      return {
        ...state,
        filterResults: action.payload
      };
    case SET_ADS_AS_LOADED:
      return {
        ...state,
        allAdsLoaded: action.payload
      };
    default:
      return state;
  }
}
