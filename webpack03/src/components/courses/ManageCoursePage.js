import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loadAuthors } from "./../../redux/actions/authorActions";
import { loadCourses, saveCourse } from "./../../redux/actions/courseActions";
import CourseForm from "./CourseForm";
import { newCourse } from "../../../tools/mockData";
import Spinner from "./../common/Spinner";
import { toast } from "react-toastify";

const ManageCoursePage = ({
  authors,
  courses,
  loadAuthors,
  loadCourses,
  saveCourse,
  history,
  ...props
}) => {
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (authors.length === 0) {
      loadAuthors().catch(err => {
        console.log("ManageCoursePage loadAuthors Error", err);
      });
    }

    if (courses.length === 0) {
      loadCourses().catch(err => {
        console.log("ManageCoursePage loadCourses Error", err);
      });
    } else {
      setCourse({ ...props.course });
    }
  }, [props.course]);

  const handleChange = event => {
    const { name, value } = event.target;
    setCourse(previousCourse => ({
      ...previousCourse,
      [name]: name === "authorId" ? parseInt(value, 10) : value
    }));
  };

  const formIsValid = () => {
    const { title, category, authorId } = course;
    const errors = {};

    if (!title) errors.title = "Title is required.";
    if (!category) errors.category = "Category is required";
    if (!authorId) errors.author = "Author is required";

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSave = event => {
    event.preventDefault();

    if (!formIsValid()) return;
    setSaving(true);
    saveCourse(course)
      .then(() => {
        toast.success("Successfully save!");
        history.push("/courses");
      })
      .catch(err => {
        setSaving(false);
        setErrors({ onSave: err.message });
      });
  };

  return authors.length === 0 || courses.length === 0 ? (
    <Spinner></Spinner>
  ) : (
    <CourseForm
      course={course}
      errors={errors}
      authors={authors}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    ></CourseForm>
  );
};

ManageCoursePage.propTypes = {
  loadAuthors: PropTypes.func.isRequired,
  loadCourses: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  course: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

function getCourseBySlug(courses, slug) {
  return courses.find(course => course.slug === slug) || newCourse;
}

const mapStateToProps = (state, ownProps) => {
  const slug = ownProps.match.params.slug;
  const course =
    slug && state.courses.length > 0
      ? getCourseBySlug(state.courses, slug)
      : newCourse;
  return {
    course,
    courses: state.courses,
    authors: state.authors
  };
};

const mapDispatchToProps = {
  loadAuthors,
  loadCourses,
  saveCourse
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageCoursePage);
