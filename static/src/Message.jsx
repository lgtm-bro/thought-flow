import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Message = ({ msg, hasQuestion, linkText, path, changeMsg }) => {
  // const [hasQuestion, setHasQuestion] = useState(false);
  // useEffect(() => {
  // 	if (hasQuestion) {
  // 		changeMsg('');
  // 	}
  // })

  return (
    <div id="user-msg-container">
      <span>{msg}</span>
      {hasQuestion && (
        <span
          onClick={() => {
            console.log("Msg onClick");
            changeMsg();
          }}
        >
          <Link to={path}>{linkText}</Link>
        </span>
      )}
    </div>
  );
};

Message.defaultProps = {
  hasQuestion: false,
  linkText: "Yes!",
  path: "/",
};

export default Message;
