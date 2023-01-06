import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";

const Greet = ({ user, feeling }) => {
	const navigate = useNavigate();

	const getNewFeeling = () => {
		document.getElementById("confirm-wrapper").classList.remove("hide")
	}

	return (
    <Fragment>
      {user && <span className="greet-span">Hi {user}. </span>}
      {feeling && (
        <span className="greet-span">
          <span>Today's vibe is </span>
          <span onClick={getNewFeeling}>
            <a href="#">
              {feeling[0].toUpperCase() + feeling.substring(1)}
            </a>
          </span>
        </span>
      )}
    </Fragment>
  );
};

export default Greet;
