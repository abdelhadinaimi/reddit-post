import { shallow } from "enzyme";
import * as React from "react";

import Subreddit, { IProps } from "../../src/components/Subreddit";

const makeProps = (): IProps => ({
  callNotification: jest.fn(),
  onReload: jest.fn(),
  onRemove: jest.fn(),
  playAudio: jest.fn(),
  reddit: {
    didInvalidate: false,
    error: false,
    hasNewPost: false,
    isFetching: false,
    items: [],
    lastUpdated: 0
  },
  settings: {
    delay: 5,
    notification: false,
    sound: false
  },
  title: ""
});

describe("<Subreddit/>", () => {
  it("should render correctly", () => {
    const props = makeProps();
    const wrapper = shallow(<Subreddit {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should change the state when the <a> containing the title is clicked", () => {
    const props = makeProps();
    const wrapper = shallow(<Subreddit {...props} />);
    const titleA = wrapper.find("#title-a");

    titleA.simulate("click");
    expect(wrapper.state()).toEqual({
      collapsed: false,
      openedNewPost: true
    });

    titleA.simulate("click");
    expect(wrapper.state()).toEqual({
      collapsed: true,
      openedNewPost: true
    });
  });
  
  it("should change the state, callNotification and playAudio when new props arrive with new posts", () => {
    const props = makeProps();
    Object.assign(props.settings, { notification: true, sound: true });
    const wrapper = shallow(<Subreddit {...props} />);
    wrapper.setState({
      openedNewPost: true
    });

    wrapper.setProps({
      reddit: {
        didInvalidate: false,
        error: false,
        hasNewPost: true, // we check if this changed
        isFetching: false,
        items: [],
        lastUpdated: 0
      }
    });

    expect(wrapper.state()).toEqual({
      collapsed: true,
      openedNewPost: false
    });
    expect(props.callNotification).toHaveBeenCalledTimes(1);
    expect(props.playAudio).toHaveBeenCalledTimes(1);
  });

  it("should call onReload when button is clicked", () => {
    const props = makeProps();
    const wrapper = shallow(<Subreddit {...props} />);
    wrapper.find("#reload-button").simulate("click");

    expect(props.onReload).toHaveBeenCalledTimes(1);
  });

  it("should call onRemove when button is clicked", () => {
    const props = makeProps();
    const wrapper = shallow(<Subreddit {...props} />);
    wrapper.find("#remove-button").simulate("click");

    expect(props.onRemove).toHaveBeenCalledTimes(1);
  });
});
