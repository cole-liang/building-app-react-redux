import * as types from "./actionTypes";
import * as courseAPI from "../../api/courseApi";

export function createCourse(course) {
  return {
    type: types.CREATE_COURSE,
    course
  };
}

function loadCoursesSuccess(courses) {
  return {
    type: types.LOAD_COURSES_SUCCESS,
    courses
  };
}

export function loadCourses() {
  return dispatch => {
    return courseAPI
      .getCourses()
      .then(courses => {
        dispatch(loadCoursesSuccess(courses));
      })
      .catch(err => {
        console.log("loadCoursesAction Error: " + err);
      });
  };
}
