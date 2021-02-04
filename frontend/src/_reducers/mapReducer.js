import {GET_ALL_PLACE} from "../_actions/types";

const mapReducer =  function(state = {}, action) {
  const { type, payload } = action;
    switch (type) {
      case GET_ALL_PLACE:
        return { ...state, getPlaceSuccess: {
          status: payload.status,
          message: payload.message,
          data: payload.data,
          object: payload.object,
      }};
      default:
        return state;
    }
}

export default mapReducer;