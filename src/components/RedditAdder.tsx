import * as React from "react";
import ErrorMessage from "./ErrorMessage";

export interface IProps {
  handleOpenSettingsModal: () => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleChange: (e: any) => void;
  clearError: () => void;
  error: string;
  value: string;
}

const RedditAdder: React.SFC<IProps> = props => {
  const {
    clearError,
    error,
    handleChange,
    handleOpenSettingsModal,
    handleSubmit,
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
