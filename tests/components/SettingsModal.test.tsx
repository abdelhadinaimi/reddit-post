import { shallow } from "enzyme";
import * as React from "react";

import SettingsModal, { IProps } from "../../src/components/SettingsModal";

const props : IProps = {
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
};
describe("<SettingsModal/>", () => {
  it("should render correctly", () => {
    const wrapper = shallow(<SettingsModal {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
