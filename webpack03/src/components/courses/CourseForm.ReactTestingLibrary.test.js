import React from "react";
import CourseForm from "./CourseForm";
import { render } from "react-testing-library";

function renderCourseForm(args) {
  const defaultProps = {
    authors: [],
    course: {},
    onSave: () => {},
    onChange: () => {},
    saving: false,
    errors: {}
  };

  const props = { ...defaultProps, ...args };
  return render(<CourseForm {...props}></CourseForm>);
}

it("render CourseForm save button label 'Saving...' when saving is true", () => {
  const { getByText, debug } = renderCourseForm({ saving: true });
  debug();
  getByText("Saving...");
});
