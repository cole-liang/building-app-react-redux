import React, { Component } from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";

class CoursesPage extends Component {
  state = {
    course: {
      title: ""
    }
  };

  handleChange = e => {
    const course = { ...this.state.course, title: e.target.value };
    this.setState({ course });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.actions.createCourse(this.state.course);
  };

  render() {
    const { course } = this.state;

    return (
      <div>
        <h1>Courses</h1>
        <h2>Add Course</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            value={course.title}
            type="text"
            onChange={this.handleChange}
          />
          <button type="submit">Add</button>
        </form>
        <h2>Course List</h2>
        {this.props.courses.map(course => (
          <div key={course.title}>{course.title}</div>
        ))}
      </div>
    );
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    courses: state.courses
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoursesPage);
