import * as types from "./actionTypes";
import * as authorAPI from "../../api/authorApi";

function loadAuthorsSuccess(authors) {
  return { type: types.LOAD_AUTHORS_SUCCESS, authors };
}

export function loadAuthors() {
  return dispatch => {
    return authorAPI
      .getAuthors()
      .then(author => {
        dispatch(loadAuthorsSuccess(author));
      })
      .catch(err => {
        console.log("loadAuthorsAction ERROR: ", err);
      });
  };
}
