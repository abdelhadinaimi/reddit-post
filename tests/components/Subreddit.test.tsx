import { shallow } from "enzyme";
import * as React from "react";

import Subreddit, { IProps } from "../../src/components/Subreddit";

const props: IProps = {
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
};
describe("<Subreddit/>", () => {
  it("should render correctly", () => {
    const wrapper = shallow(<Subreddit {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
