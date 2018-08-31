import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import {
  changeDelay,
  toggleNotification,
  toggleSound
} from "../actions/settingsActions";
import { closeSettingsModal } from "../actions/utilActions";

import { ISettings, IState } from "../types/interfaces";

import SettingsModalComponent from "../components/SettingsModal";

interface IStateProps {
  showModal: boolean;
  settings: ISettings;
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

type Props = IStateProps & IDispatchProps;

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

  // handleToggleNotification wrapper to use this.setState
  public handleToggleNotification() {
    this.props
      .handleToggleNotification()
      .then(() => this.setState({ permission: "granted" }));
  }
  public render() {
    return (
      <SettingsModalComponent
        {...this.state}
        {...this.props}
        handleToggleNotification={this.handleToggleNotification}
      />
    );
  }
}

const mapStateToProps = (state: IState): IStateProps => ({
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

export default connect<IStateProps, IDispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(SettingsModal);
