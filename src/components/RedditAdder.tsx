import React, { FormEvent } from "react";

interface IErrorProps {
  message: string;
  clearError: () => void;
}
const ErrorMessage: React.SFC<IErrorProps> = props => (
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
        onClick={props.clearError}
      >
        <span className="glyphicon glyphicon-remove" />
      </button>
    </span>
    {props.message}
  </div>
);

interface IProps {
  handleOpenSettingsModal: () => void;
  handleSubmit: (e: FormEvent) => void;
  handleChange: (e: any) => void;
  clearError: () => void;
  error: string;
  value: string;
}

const RedditAdder: React.SFC<IProps> = props => {
  const {
    handleOpenSettingsModal,
    handleSubmit,
    handleChange,
    clearError,
    error,
    value
  } = props;

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Type the subreddit you want to add ex: 'worldnews'"
          onChange={handleChange}
          value={value}
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
            onClick={handleOpenSettingsModal}
          >
            <span className="glyphicon glyphicon-cog" />
          </button>
        </span>
      </div>
      {error !== "" ? (
        <ErrorMessage message={error} clearError={clearError} />
      ) : null}
    </form>
  );
};

export default RedditAdder;
