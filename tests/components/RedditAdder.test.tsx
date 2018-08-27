import { shallow } from "enzyme";
import * as React from 'react'

import RedditAdder,{ IProps } from "../../src/components/RedditAdder";


const props : IProps = {
  clearError: jest.fn(),
  error: "error",
  handleChange: jest.fn(),
  handleOpenSettingsModal: jest.fn(),
  handleSubmit: jest.fn(),
  value: "hello"
};

describe("<RedditAdder/>", () => {
  it("should render correctly", () => {
    
    const wrapper = shallow(<RedditAdder {...props } />);


    expect(wrapper).toMatchSnapshot();
  });
});
