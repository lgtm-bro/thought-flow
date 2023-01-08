import React, { useState, useEffect, useRef, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoRemoveOutline, IoPencil } from "react-icons/io5";

import Quote from "./Quote.jsx";

const MilestoneForm = ({submitMilestone, checkMsgStatus}) => {
  const [title, setTitle] = useState();
  const [details, setDetails] = useState();

  const navigate = useNavigate();

  const getInput = (e, method) => {
    method(e.target.value);
  };

  const saveMilestone = (e) => {
    e.preventDefault();
    submitMilestone(title, details);
  };

  const cancelForm = () => {
    checkMsgStatus();
    navigate("/");
  }

  return (
    <Fragment>
      <div id="milestone-container" >
        <form action="#" onSubmit={saveMilestone}>
          <br />
          <br />
          <div id="milestone-text">
            <label htmlFor="milestone-title">Milestone </label>
            <input
              type="text"
              name="milestone-title"
              id="milestone-title"
              maxLength="100"
              required
              onChange={(e) => getInput(e, setTitle)}
              // ref={title}
            />
            <br />
            <br />
            <button type="button" onClick={cancelForm} >Cancel</button>
            <input type="submit" value="Save Milestone" />
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default MilestoneForm;
