import * as types from "./actionTypes";
import * as authorAPI from "../../api/authorApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

function loadAuthorsSuccess(authors) {
  return { type: types.LOAD_AUTHORS_SUCCESS, authors };
}

export function loadAuthors() {
  return dispatch => {
    dispatch(beginApiCall());
    return authorAPI
      .getAuthors()
      .then(author => {
        dispatch(loadAuthorsSuccess(author));
      })
      .catch(err => {
        dispatch(apiCallError());
        console.log("loadAuthorsAction ERROR: ", err);
        throw err;
      });
  };
}
