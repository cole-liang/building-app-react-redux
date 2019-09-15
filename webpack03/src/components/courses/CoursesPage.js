import React, { Component } from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";
import { Link } from "react-router-dom";
import Spinner from "./../common/Spinner";
import { toast } from "react-toastify";

class CoursesPage extends Component {
  componentDidMount() {
    const { courses, authors, actions } = this.props;

    if (courses.length === 0) {
      actions.loadCourses().catch(err => {
        console.log("CoursesPage loadCourses ERROR: ", err);
      });
    }

    if (authors.length === 0) {
      actions.loadAuthors().catch(err => {
        console.log("CoursesPage loadAuthors ERROR: ", err);
      });
    }
  }

  handleDelete = course => {
    toast.success("Course deleted.");

    const { actions } = this.props;
    actions.deleteCourse(course).catch(err => {
      toast.error("Delete failed. " + err.message, { autoClose: false });
    });
  };

  render() {
    const { courses, loading } = this.props;

    return (
      <>
        {loading ? (
          <Spinner></Spinner>
        ) : (
          <>
            <h1>Courses</h1>
            <Link to="/course">
              <button style={{ marginBottom: 20 }} className="btn btn-primary">
                Add Course
              </button>
            </Link>
            <CourseList
              courses={courses}
              onDelete={this.handleDelete}
            ></CourseList>
          </>
        )}
      </>
    );
  }
}

CoursesPage.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return {
    loading: state.apiCallsInProgress > 0,
    authors: state.authors,
    courses:
      state.authors.length !== 0
        ? state.courses.map(course => ({
            ...course,
            authorName: state.authors.find(
              author => author.id === course.authorId
            ).name
          }))
        : []
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
      deleteCourse: bindActionCreators(courseActions.deleteCourse, dispatch)
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoursesPage);
