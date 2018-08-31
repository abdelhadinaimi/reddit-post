import { shallow } from "enzyme";
import * as React from "react";

import SettingsModal, { IProps } from "../../src/components/SettingsModal";

const makeProps = (): IProps => ({
  handleChangeDelay: jest.fn(),
  handleCloseSettingsModal: jest.fn(),
  handleToggleNotification: jest.fn(),
  handleToggleSound: jest.fn(),
  permission: "allowed",
  settings: {
    delay: 5,
    notification: true,
    sound: true
  },
  showModal: true
});

(window as any).Notification = {}

describe("<SettingsModal/>", () => {
 
  it("should render correctly", () => {
    const props = makeProps();
    const wrapper = shallow(<SettingsModal {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it("should make the notification checkbox disabled if props.permission === denied", () => {
    const props = Object.assign(makeProps(), { permission : "denied"});
    const wrapper = shallow(<SettingsModal {...props} />);

    expect(wrapper.find("Checkbox").at(1).props()).toHaveProperty('disabled',true);
  });

  it("should call handleChangeDelay when the delay input is changed", () => {
    const props = makeProps();
    const wrapper = shallow(<SettingsModal {...props} />);

    wrapper.find("input").simulate("change");
    expect(props.handleChangeDelay).toHaveBeenCalledTimes(1);
  });

  it("should not render the secound check box if browser doens't support Notification API", () => {
    (window as any).Notification = undefined;
    const props = makeProps();
    const wrapper = shallow(<SettingsModal {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});
