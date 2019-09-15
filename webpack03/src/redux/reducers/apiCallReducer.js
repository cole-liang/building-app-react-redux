import * as types from "../actions/actionTypes";
import initialState from "./initialState";

function apiCallEndWithSuccess(apiCall) {
  return apiCall.slice(-8) === "_SUCCESS";
}

export default function apiCallsReducer(
  state = initialState.apiCallsInProgress,
  action
) {
  if (action.type === types.BEGIN_API_CALL) {
    return state + 1;
  } else if (
    action.type === types.API_CALL_ERROR ||
    apiCallEndWithSuccess(action.type)
  ) {
    return state - 1;
  }

  return state;
}
