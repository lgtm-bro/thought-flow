import React, { useRef, Fragment } from "react";
import { Link } from "react-router-dom";

import ConfirmFeeling from "./ConfirmFeeling.jsx";

const Greet = ({ user, feeling, sendFeeling, checkMsgStatus }) => {
  const info = useRef();

  const showConfirm = () => {
    document.getElementById("confirm-wrapper").classList.remove("hide");
    info.current.classList.add("hide");
  };

  return (
    <div id="greeting-msg-row" className="container-fluid">
      <div id="greeting-msg">
        {user && (
          <div id="greet-span" className="text-lowercase">
            Hi {user}.{" "}
          </div>
        )}
        {feeling && (
          <span id="greeting-feeling" className="greet-span flex-nowrap">
            <span>today's vibe is </span>
            <span
              id="greet-link"
              className={`greet-span py-3 pe-3 ${sessionStorage.getItem(
                "baseEmotion"
              )}`}
              onClick={showConfirm}
            >
              <a
                href="#"
                id="emotion-link"
                className={`emotion ${sessionStorage.getItem("baseEmotion")}`}
              >
                {feeling}
              </a>
              <span
                id="greet-info"
                className="border border-secondary form-text text-center pb-2"
                ref={info}
              >
                click to change
              </span>
            </span>
          </span>
        )}
      </div>
      <ConfirmFeeling
        sendFeeling={sendFeeling}
        checkMsgStatus={checkMsgStatus}
      />
    </div>
  );
};

export default Greet;
