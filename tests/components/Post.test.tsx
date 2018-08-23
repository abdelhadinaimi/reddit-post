import { shallow } from "enzyme";
import * as React from "react";

import Post from "../../src/components/Post";

describe("<Post/>", () => {
  const props = { id: 0, permalink: "hello.com", title: "hello" };
  it("should render an <a> <li>", () => {
    const wrapper = shallow(<Post {...props} />);

    expect(wrapper.name()).toBe("li");

    expect(
      wrapper.contains(
        <a href={"https://www.reddit.com" + props.permalink}>{props.title}</a>
      )
    ).toBe(true);
  });
});
