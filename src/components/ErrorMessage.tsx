import * as React from "react";

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

export default ErrorMessage;