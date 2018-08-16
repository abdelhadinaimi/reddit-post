import React from "react";
import { Checkbox, FormGroup, Modal } from "react-bootstrap";
import { connect } from "react-redux";

import { Dispatch } from "redux";
import {
  changeDelay,
  toggleNotification,
  toggleSound
} from "../actions/settingsActions";
import { closeSettingsModal } from "../actions/utilActions";
import { IState } from "../types/interfaces";

interface IProps {
  showModal: any;
  settings: any;
}

interface IOwnState {
  permission: string;
}

interface IDispatchProps {
  handleChangeDelay: (e: Event & any) => void;
  handleCloseSettingsModal: () => void;
  handleToggleNotification: () => Promise<any>;
  handleToggleSound: () => void;
}

type Props = IProps & IDispatchProps;

class SettingsModal extends React.Component<Props, IOwnState> {
  constructor(props: Props) {
    super(props);

    this.state = {
      permission: (window as any).Notification
        ? (window as any).Notification.permission
        : "default"
    };
    this.handleToggleNotification = this.handleToggleNotification.bind(this);
  }
  
  public render() {
    const { delay, sound, notification } = this.props.settings;
    const {
      handleChangeDelay,
      handleCloseSettingsModal,
      handleToggleSound,
      showModal
    } = this.props;
    return (
      <div>
        <Modal show={showModal} onHide={handleCloseSettingsModal}>
          <Modal.Header closeButton={true}>
            <Modal.Title>Settings</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormGroup>
              <Checkbox checked={sound} onChange={handleToggleSound}>
                Toggle Sound
              </Checkbox>{" "}
              {(window as any).Notification ? (
                <Checkbox
                  checked={notification}
                  onChange={this.handleToggleNotification}
                  disabled={this.state.permission === "denied"}
                >
                  Toggle Notifications
                </Checkbox>
              ) : (
                ""
              )}{" "}
              {"Delay "}
              <input
                type="number"
                value={delay}
                onChange={handleChangeDelay}
                min={5}
              />
              {" s"}
            </FormGroup>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
  // handleToggleNotification wrapper to use this.setState
  public handleToggleNotification() {
    this.props
      .handleToggleNotification()
      .then(() => this.setState({ permission: "granted" }));
  }
}
const mapStateToProps = (state: IState): IProps => ({
  settings: state.settings,
  showModal: state.utils.settingsModalOpen
});

const mapDispatchToProps = (dispatch: Dispatch<any>): IDispatchProps => ({
  handleChangeDelay: e => {
    e.preventDefault();
    const n = Number.parseInt(e.target.value, 0);
    dispatch(changeDelay(n));
  },
  handleCloseSettingsModal: () => {
    dispatch(closeSettingsModal());
  },
  handleToggleNotification: () => {
    return Notification.requestPermission().then(result => {
      if (result === "granted") {
        dispatch(toggleNotification());
      }
    });
  },
  handleToggleSound: () => {
    dispatch(toggleSound());
  }
});

export default connect<IProps, IDispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(SettingsModal);
