import React, { Component } from "react";

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
    console.log("submit:  ", this.state.course);
  };

  render() {
    const { course } = this.state;

    return (
      <div>
        <h1>Courses</h1>
        <h2>Add Course</h2>
        <form onSubmit={this.handleSubmit}>
          <input value={course} type="text" onChange={this.handleChange} />
          <button type="submit">Add</button>
        </form>
      </div>
    );
  }
}

export default CoursesPage;
