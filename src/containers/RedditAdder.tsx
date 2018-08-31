import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";


import { addSubreddit } from "../actions/listActions";
import { fetchPostsIfNeeded } from "../actions/redditActions";
import { openSettingsModal } from "../actions/utilActions";

import RedditAdderComponent from "../components/RedditAdder";

const regex = new RegExp("^[A-Za-z0-9][A-Za-z0-9_]{1,20}$"); // subreddit naming convention

export const ERROR_MESSAGES = {
  SUBREDDIT_MATCH : "Subreddit must contain only characters, numbers and _",
  SUBREDDIT_NAME_LENGTH : "Subreddit must be 21 or less characters",
}

interface IDispatchProps {
  handleOpenSettingsModal: () => void;
  handleSubmit: (subreddit: string) => void;
}

interface IState {
  error: string;
  value: string;
}

export type IProps = IDispatchProps; // Props = IStateProps & IDispatchProps & IOwnProps

export class RedditAdder extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.clearError = this.clearError.bind(this);

    this.state = {
      error: "",
      value: ""
    };
  }

  public handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (this.state.value.length > 21) {
      this.setState({ error: ERROR_MESSAGES.SUBREDDIT_NAME_LENGTH });
    } else if (!regex.test(this.state.value)) {
      this.setState({ error: ERROR_MESSAGES.SUBREDDIT_MATCH });
    } else {
      this.props.handleSubmit(this.state.value);
      this.clearError();
    }
    this.setState({ value: "" });
  }

  public handleChange = (e: any)  => {
    this.setState({ value: e.target.value });
  }

  public clearError() {
    this.setState({ error: "" });
  }

  public render() {
    const { handleOpenSettingsModal } = this.props;
    return (
      <RedditAdderComponent
        {...this.state}
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        clearError={this.clearError}
        handleOpenSettingsModal={handleOpenSettingsModal}
      />
    );
  }
}
const mapDispatchToProps = (dispatch: Dispatch<any>): IDispatchProps => ({
  handleOpenSettingsModal: () => {
    dispatch(openSettingsModal());
  },
  handleSubmit: subreddit => {
    dispatch(addSubreddit(subreddit));
    dispatch(fetchPostsIfNeeded(subreddit));
  }
});
export default connect<null, IDispatchProps>(
  null,
  mapDispatchToProps
)(RedditAdder);
