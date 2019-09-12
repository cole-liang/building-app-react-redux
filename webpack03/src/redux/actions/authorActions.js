import * as types from "./actionTypes";
import * as authorAPI from "../../api/authorApi";

function loadAuthorsSuccess(author) {
  return { type: types.LOAD_AUTHORS_SUCCESS, author };
}

export function loadAuthors() {
  return dispatch => {
    authorAPI
      .getAuthors()
      .then(author => {
        dispatch(loadAuthorsSuccess(author));
      })
      .catch(err => {
        console.log("loadAuthorsAction ERROR: ", err);
      });
  };
}
