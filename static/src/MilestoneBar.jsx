import React, { useState, useEffect, useRef, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AiOutlinePlus } from "react-icons/ai";
import { IoRemoveOutline, IoPencil } from "react-icons/io5";

import Milestone from "./Milestone.jsx";

const MilestoneBar = ({
  milestones,
  feeling,
  updateMilestone,
  deleteMilestone,
  changeMsg,
}) => {
  const milestoneText = useRef();
  const done = useRef();

  const editMilestone = (e) => {
    milestoneText.current.contentEditable = true;
    done.current.classList.remove("hide");
  };

  const saveEdit = (id) => {
    updateMilestone(id, milestoneText.current.innerText);
    milestoneText.current.contentEditable = false;
    done.current.classList.add("hide");
  };

  const updateFeelingMsg = () => {
    changeMsg("", false);
  };

  return (
    <div id="milestone-bar-wrapper" className="padding-2">
      {!!sessionStorage.getItem("user") && (
        <div>
          <div id="add-entry" className="custom-link">
          <Link to="/milestone">
            <button
              type="button"
              id="add-entry"
              className="custom-link btn hub-btn flex-end"
              onClick={updateFeelingMsg}
            >
              <span className="badge hub-icon ">
                  <AiOutlinePlus />

              </span>
              <span id="add-entry-btn">milestone</span>
            </button>
            </Link>
          </div>

          {/* <h5>
            <span
              id="add-milestone"
              className="custom-link"
              onClick={updateFeelingMsg}
            >
              <Link to="/milestone">
                <AiOutlinePlus />
                add a milestone
              </Link>
            </span>
          </h5> */}
          <h5 className="pt-3 ps-3 fs-5 mt-3">So Far you have...</h5>
          {milestones.map((m) => (
            <Milestone
              key={m.id}
              milestone={m}
              updateMilestone={updateMilestone}
              deleteMilestone={deleteMilestone}
            />
          ))}
        </div>
      )}
      {!sessionStorage.getItem("userId") && (
        <h5 className="text-center">please login to view milestones</h5>
      )}
    </div>
  );
};

export default MilestoneBar;
