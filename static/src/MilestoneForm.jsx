import React, { useState, useEffect, useRef, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoRemoveOutline, IoPencil } from "react-icons/io5";

import Quote from "./Quote.jsx";

const MilestoneForm = ({ submitMilestone, checkMsgStatus }) => {
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
  };

  return (
    <div
      id="milestone-form-container"
      className="container justify-content-center mt-5 p-4 border shadow"
    >
      <form action="#" className="form-group" onSubmit={saveMilestone}>
        <div id="milestone-text">
          <label htmlFor="milestone-title" className="guided-label form-label">
            Please enter your milestone:
          </label>
          <textarea
            type="text"
            name="milestone-title"
            id="milestone-title"
            maxLength="100"
            className="form-input form-control mt-4"
            required
            onChange={(e) => getInput(e, setTitle)}
            // ref={title}
          />
          <div className="form-btn-div mt-5">
            <button type="button" className="btn form-btn" onClick={cancelForm}>
              cancel
            </button>
            <input type="submit" value="save" className="btn form-btn px-4"/>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MilestoneForm;
