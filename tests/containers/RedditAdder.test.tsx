import { CommonWrapper, shallow } from "enzyme";
import * as React from "react";

import {
  ERROR_MESSAGES,
  IProps,
  RedditAdder
} from "../../src/containers/RedditAdder";

import RedditAdderComponent from "../../src/components/RedditAdder";

const makeProps = (): IProps => ({
  handleOpenSettingsModal: jest.fn(),
  handleSubmit: jest.fn()
});

const setup = (props?: IProps) => {
  return shallow(<RedditAdder {...(props || makeProps())} />);
};

const matchWrapperState = (wrapper: CommonWrapper) => (state: any) => {
  return expect(wrapper.state()).toEqual(state);
};

describe("<Subreddit/>", () => {
  it("should render correctly", () => {
    const wrapper = setup();
    expect(wrapper.find(RedditAdderComponent).exists()).toBe(true);
  });

  describe("handleChange()", () => {
    it("should set the state with the value from the input event", () => {
      const wrapper = setup();
      const instance = wrapper.instance() as RedditAdder;

      expect(wrapper.state("value")).toBe("");
      instance.handleChange({ target: { value: "hello" } });
      expect(wrapper.state("value")).toBe("hello");
    });
  });

  describe("handleSubmit()", () => {
    it("should set state.error as SUBREDDIT_NAME_LENGTH if condition matches", () => {
      const wrapper = setup();
      const instance = wrapper.instance() as RedditAdder;

      wrapper.setState({ value: "hellohellohellohellohellohello" });
      instance.handleSubmit(new Event("submit") as any);
      matchWrapperState(wrapper)({
        error: ERROR_MESSAGES.SUBREDDIT_NAME_LENGTH,
        value: ""
      });
    });

    it("should set state.error as SUBREDDIT_MATCH if condition matches", () => {
      const wrapper = setup();
      const instance = wrapper.instance() as RedditAdder;
      const matchWrapper = matchWrapperState(wrapper);

      wrapper.setState({ value: "" });
      instance.handleSubmit(new Event("submit") as any);
      matchWrapper({
        error: ERROR_MESSAGES.SUBREDDIT_MATCH,
        value: ""
      });

      wrapper.setState({ value: "_hello" });
      instance.handleSubmit(new Event("submit") as any);
      matchWrapper({
        error: ERROR_MESSAGES.SUBREDDIT_MATCH,
        value: ""
      });

      wrapper.setState({ value: ")&dd" });
      instance.handleSubmit(new Event("submit") as any);
      matchWrapper({
        error: ERROR_MESSAGES.SUBREDDIT_MATCH,
        value: ""
      });
    });

    it("should call props.handleSubmit and clearError", () => {
      const props = makeProps();
      const wrapper = setup(props);
      const instance = wrapper.instance() as RedditAdder;

      wrapper.setState({ value: "hello", error: "Some error" });
      instance.handleSubmit(new Event("submit") as any);
      matchWrapperState(wrapper)({
        error: "",
        value: ""
      });

      expect(props.handleSubmit).toHaveBeenCalledTimes(1);
      expect(props.handleSubmit).toHaveBeenCalledWith("hello");
    });
  });
});
