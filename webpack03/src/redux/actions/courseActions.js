import * as types from "./actionTypes";
import * as courseAPI from "../../api/courseApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

function createCourseSucess(course) {
  return {
    type: types.CREATE_COURSE_SUCCESS,
    course
  };
}

function updateCourseSucess(course) {
  return {
    type: types.UPDATE_COURSE_SUCCESS,
    course
  };
}

function loadCoursesSuccess(courses) {
  return {
    type: types.LOAD_COURSES_SUCCESS,
    courses
  };
}

function deleteCourseOptimistic(course) {
  return {
    type: types.DELETE_COURSE_OPTIMISTIC,
    course
  };
}

export function loadCourses() {
  return dispatch => {
    dispatch(beginApiCall());
    return courseAPI
      .getCourses()
      .then(courses => {
        dispatch(loadCoursesSuccess(courses));
      })
      .catch(err => {
        dispatch(apiCallError());
        console.log("loadCoursesAction Error: " + err);
        throw err;
      });
  };
}

export function saveCourse(course) {
  return dispatch => {
    dispatch(beginApiCall());
    return courseAPI
      .saveCourse(course)
      .then(savedCourse => {
        course.id
          ? dispatch(updateCourseSucess(savedCourse))
          : dispatch(createCourseSucess(savedCourse));
      })
      .catch(err => {
        dispatch(apiCallError());
        console.log("saveCourseAction Error: " + err);
        throw err;
      });
  };
}

export function deleteCourse(course) {
  return dispatch => {
    dispatch(deleteCourseOptimistic(course));
    return courseAPI.deleteCourse(course.id);
  };
}
