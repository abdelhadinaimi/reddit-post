import { shallow } from "enzyme";
import * as React from "react";

import ErrorMessage from "../../src/components/ErrorMessage";

describe("<ErrorMessage/>", () => {
  it("should render correctly", () => {
    const wrapper = shallow(<ErrorMessage message="hello" clearError={jest.fn()}/>);
    expect(wrapper).toMatchSnapshot();
  });

  it("should call mock function once when the button is clicked", () => {
    const mockFn = jest.fn();
    const wrapper = shallow(<ErrorMessage message="hello" clearError={mockFn} />);
    wrapper.find("button").simulate("click");
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
