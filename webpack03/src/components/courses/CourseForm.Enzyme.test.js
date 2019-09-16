import React from "react";
import { shallow } from "enzyme";
import CourseForm from "./CourseForm";
import { courses, authors } from "../../../tools/mockData";

function shallowCourseForm(args = {}) {
  const defaultProps = {
    authors: [],
    course: {},
    onSave: () => {},
    onChange: () => {},
    saving: false,
    errors: {}
  };

  const props = { ...defaultProps, ...args };
  return shallow(<CourseForm {...props}></CourseForm>);
}

it("render form and header", () => {
  const wrapper = shallowCourseForm();
  //   console.log(wrapper.debug());
  expect(wrapper.find("form").length).toBe(1);
  expect(wrapper.find("h2").text()).toBe("Add Course");
});

it("render save button label 'Saving...' when save is true", () => {
  const wrapper = shallowCourseForm({ saving: true });
  expect(wrapper.find("button").text()).toBe("Saving...");
});
