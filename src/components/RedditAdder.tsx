import React, { FormEvent } from "react";
import { connect } from "react-redux";

import { fetchPostsIfNeeded } from "../actions/redditActions";
import { openSettingsModal } from "../actions/utilActions";

import { DispatchFunc } from "../interfaces";
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

interface IProps {
  dispatch: DispatchFunc;
}

class RedditAdder extends React.Component<IProps> {
  public state = {
    error: "",
    value: ""
  };
  
  constructor(props: IProps) {
    super(props);
    this.handleOpenSettingsModal = this.handleOpenSettingsModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.clearError = this.clearError.bind(this);
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
              onClick={this.handleOpenSettingsModal}
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

  public handleOpenSettingsModal() {
    const { dispatch } = this.props;
    dispatch(openSettingsModal());
  }

  public handleSubmit(e: FormEvent) {
    e.preventDefault();
    const { dispatch } = this.props;
    if (this.state.value.length > 21) {
      this.setState({ error: "Subreddit must be 21 or less characters" });
    } else if (!regex.test(this.state.value)) {
      this.setState({
        error: "Subreddit must contain only characters, numbers and _"
      });
    } else {
      dispatch(fetchPostsIfNeeded(this.state.value));
      this.clearError();
    }
    this.setState({ value: "" });
  }

  public handleChange(e: any){
    this.setState({ value: e.target.value });
  }

  public clearError() {
    this.setState({ error: "" });
  }
}

export default connect(null)(RedditAdder);
