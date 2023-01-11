import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Message = ({ msg, hasQuestion, linkText, path, changeMsg }) => (
  <Fragment>
    <span>{msg}</span>
    {hasQuestion && (
      <span
        id="message-link"
        onClick={() => {
          changeMsg();
        }}
      >
        <Link to={path}>{linkText}</Link>
      </span>
    )}
  </Fragment>
);

Message.defaultProps = {
  hasQuestion: false,
  linkText: "Yes!",
  path: "/",
};

export default Message;
