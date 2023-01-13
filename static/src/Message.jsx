import React, { Fragment, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Message = ({ msg, hasQuestion, linkText, path, changeMsg }) => {
  const msgSpan = useRef();

  useEffect(() => {
    if (msg && msgSpan.current) {
      msgSpan.current.classList.add("test");
    }
    setTimeout(() => {
      if (msgSpan.current) {
        msgSpan.current.classList.remove("test");
      }
    }, 3000);
  }, [msg]);

  return (
    <Fragment>
      <span id="message-msg" className="" ref={msgSpan}>
        {msg}
      </span>
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
};

Message.defaultProps = {
  hasQuestion: false,
  linkText: "Yes!",
  path: "/",
};

export default Message;
