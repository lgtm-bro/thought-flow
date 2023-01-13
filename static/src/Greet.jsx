import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";

import ConfirmModal from "./ConfirmModal.jsx";

const Greet = ({ user, feeling, sendFeeling, checkMsgStatus }) => {
  const navigate = useNavigate();



  const showConfirm = () => {
    document.getElementById("confirm-wrapper").classList.remove("hide");
  };

  return (
    <Fragment>
      <div id="greeting-msg-row" className="container-fluid">
        <div id="greeting-msg">
          {user && (
            <div id="greet-span">
              Hi {user}.{" "}
            </div>
          )}
          {feeling && (
            <span id="greeting-feeling" className="greet-span flex-nowrap">
              <span>Today's vibe is </span>
              <span
                id="greeting-link"
                className="greet-span py-3 pe-3"
                onClick={showConfirm}
              >
                <a href="#" className="text-capitalize">
                  {feeling}
                  {/* {feeling[0].toUpperCase() + feeling.substring(1)} */}
                </a>
                <span
                id="greet-info"
                className="border border-secondary form-text text-center pb-2"
              >
                click to change
              </span>
              </span>
            </span>
          )}
        </div>
      </div>
      <ConfirmModal sendFeeling={sendFeeling} checkMsgStatus={checkMsgStatus} />
    </Fragment>
  );
};

export default Greet;
