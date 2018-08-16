import React, { FormEvent } from "react";
import { connect } from "react-redux";

import { Dispatch } from "redux";
import { fetchPostsIfNeeded } from "../actions/redditActions";
import { openSettingsModal } from "../actions/utilActions";

const regex = new RegExp("^[A-Za-z0-9][A-Za-z0-9_]{1,20}$"); // subreddit naming convention

const ErrorMessage = (message: any, closeError: any) => (
  <div
    className="alert alert-danger"
    role="alert"
    style={{ marginBottom: "0px", padding: "8px 15px" }}
  >
    <span
      className="glyphicon glyphicon-exclamation-sign"
      aria-hidden="true"
      style={{ paddingRight: "5px" }}
    />
    <span className="sr-only">Error:</span>
    <span className="pull-right clickable">
      <button
        className="error-close btn btn-default"
        type="button"
        onClick={closeError}
      >
        <span className="glyphicon glyphicon-remove" />
      </button>
    </span>
    {message}
  </div>
);

interface IDispatchProps {
  handleOpenSettingsModal: () => void;
  handleSubmit: (subreddit: string) => void;
}
interface IState {
  error : string;
  value : string;
}
type Props = IDispatchProps;
class RedditAdder extends React.Component<Props,IState> {

  constructor(props: Props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.clearError = this.clearError.bind(this);

    this.state = {
      error: "",
      value: ""
    };
  }

  public render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Type the subreddit you want to add ex: 'worldnews'"
            onChange={this.handleChange}
            value={this.state.value}
          />
          <span className="input-group-btn">
            <button
              className="btn btn-default"
              type="submit"
              style={{ border: "1px solid #cccccc" }}
            >
              <span className="glyphicon glyphicon-plus" />
            </button>
            <button
              className="btn btn-default"
              type="button"
              style={{ border: "1px solid #cccccc", borderLeft: "0px" }}
              onClick={this.props.handleOpenSettingsModal}
            >
              <span className="glyphicon glyphicon-cog" />
            </button>
          </span>
        </div>
        {this.state.error !== "" ? (
          <ErrorMessage
            message={this.state.error}
            closeError={this.clearError}
          />
        ) : null}
      </form>
    );
  }

  public handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (this.state.value.length > 21) {
      this.setState({ error: "Subreddit must be 21 or less characters" });
    } else if (!regex.test(this.state.value)) {
      this.setState({
        error: "Subreddit must contain only characters, numbers and _"
      });
    } else {
      this.props.handleSubmit(this.state.value);
      this.clearError();
    }
    this.setState({ value: "" });
  }

  public handleChange(e: any) {
    this.setState({ value: e.target.value });
  }

  public clearError() {
    this.setState({ error: "" });
  }
}
const mapDispatchToProps = (dispatch: Dispatch<any>): IDispatchProps => ({
  handleOpenSettingsModal: () => {
    dispatch(openSettingsModal());
  },
  handleSubmit: subreddit => {
    dispatch(fetchPostsIfNeeded(subreddit));
  }
});
export default connect<null,IDispatchProps>(null,mapDispatchToProps)(RedditAdder);
