import { mount, shallow } from "enzyme";
import * as React from "react";

import RedditAdder, { IProps } from "../../src/components/RedditAdder";

const makeProps = (): IProps => ({
  clearError: jest.fn(),
  error: "",
  handleChange: jest.fn(),
  handleOpenSettingsModal: jest.fn(),
  handleSubmit: jest.fn(),
  value: ""
});

describe("<RedditAdder/>", () => {
  it("should render correctly", () => {
    const props = makeProps();
    const wrapper = shallow(<RedditAdder {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should have <ErrorMessage> if error is not empty string", () => {
    const props = Object.assign(makeProps(), { error: "error" });
    const wrapper = shallow(<RedditAdder {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should call handleOpenSettingsModal only once when the button is clicked", () => {
    const props = makeProps();
    const wrapper = shallow(<RedditAdder {...props} />);
    wrapper
      .find("button")
      .at(1)
      .simulate("click");

    expect(props.handleOpenSettingsModal).toHaveBeenCalledTimes(1);
  });

  it("should call handleChange when the input is changed", () => {
    const props = makeProps();
    const wrapper = shallow(<RedditAdder {...props} />);
    wrapper
      .find("input")
      .simulate("change", { target: { name: "", value: "hello" } });

    expect(props.handleChange).toBeCalledWith({
      target: { name: "", value: "hello" }
    });
  });

  it("should call handleSubmit when the button is clicked or the form submitted", () => {
    let props = makeProps();
    let wrapper = mount(<RedditAdder {...props} />);
    wrapper
      .find("button")
      .at(0)
      .simulate("submit");
    expect(props.handleSubmit).toHaveBeenCalledTimes(1);

    props = makeProps();
    wrapper = mount(<RedditAdder {...props} />);
    wrapper.find("form").simulate("submit");
    expect(props.handleSubmit).toHaveBeenCalledTimes(1);
  });
});
