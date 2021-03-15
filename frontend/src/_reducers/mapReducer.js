import {GET_ALL_PLACE, GET_PLACE_FEED} from "../_actions/types";

const initialState = {
  placeFeedsInfo: {
      data: null,
  },
}

const mapReducer =  function(state = initialState, action) {
  const { type, payload } = action;
    switch (type) {
      case GET_ALL_PLACE:
        return { ...state, getPlaceSuccess: payload};
      case GET_PLACE_FEED:
        return { ...state, placeFeedsInfo: {
          status: payload.status,
          message: payload.message,
          data: payload.data,
          object: payload.object,
          }
        };     
      default:
        return state;
    }
}

export default mapReducer;