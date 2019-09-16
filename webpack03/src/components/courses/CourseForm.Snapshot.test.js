import React from "react";
import CourseForm from "./CourseForm";
import renderer from "react-test-renderer";
import { courses, authors } from "../../../tools/mockData";

it("set submit button label 'saving...' when saving is true", () => {
  const tree = renderer.create(
    <CourseForm
      authors={authors}
      course={courses[0]}
      onChange={jest.fn()}
      onSave={jest.fn()}
      saving
    ></CourseForm>
  );

  expect(tree).toMatchSnapshot();
});

it("set submit button label 'save' when saving is false", () => {
  const tree = renderer.create(
    <CourseForm
      authors={authors}
      course={courses[0]}
      onChange={jest.fn()}
      onSave={jest.fn()}
      saving={false}
    ></CourseForm>
  );

  expect(tree).toMatchSnapshot();
});
