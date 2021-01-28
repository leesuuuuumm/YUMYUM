import {GET_ALL_PLACE} from "../_actions/types";

const mapReducer =  function(state = {}, action) {
  const { type, payload } = action;
    switch (type) {
      case GET_ALL_PLACE:
        return { ...state, getPlaceSuccess: payload};
      default:
        return state;
    }
}

export default mapReducer;