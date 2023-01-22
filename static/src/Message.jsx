import React, { Fragment, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Message = ({ msg, hasQuestion, linkText, path }) => {
  const msgSpan = useRef();

  useEffect(() => {
    if (msg && msgSpan.current) {
      msgSpan.current.classList.add("highlight");
    }
    setTimeout(() => {
      if (msgSpan.current) {
        msgSpan.current.classList.remove("highlight");
      }
    }, 3000);
  }, [msg]);

  return (
    <Fragment>
      <span id="message-msg" ref={msgSpan}>
        {msg}
      </span>
      {hasQuestion && (
        <span id="message-link">
          <Link to={path}>{linkText}</Link>
        </span>
      )}
    </Fragment>
  );
};

Message.defaultProps = {
  hasQuestion: false,
  linkText: "yes",
  path: "/",
};

export default Message;
