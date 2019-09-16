import React from "react";
import Header from "./Header";
import { shallow, mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";

describe("render Header", () => {
  it("should have 3 NavLink via shallow", () => {
    const wrapper = shallow(<Header></Header>);

    expect(wrapper.find("NavLink").length).toBe(3);
  });

  it("should have 3 anchors via mount", () => {
    const mountHeader = mount(
      <MemoryRouter>
        <Header></Header>
      </MemoryRouter>
    );

    // console.log(mountHeader.debug());
    expect(mountHeader.find("a").length).toBe(3);
  });
});
