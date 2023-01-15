import React, { useState, useEffect, useRef, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AiOutlinePlus } from "react-icons/ai";
import { IoRemoveOutline, IoPencil } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";

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
    <div id="milestone-bar-container rounded border">
      <div className="add-entry mt-4">
        <Link to="/milestone">
          <button
            type="button"
            className="custom-link hub-btn py-1 px-5"
            onClick={updateFeelingMsg}
          >
            <span className=" hub-icon">
              <FaPlus />
            </span>
            <span className="add-btn">milestone</span>
          </button>
        </Link>
      </div>
      {/* <h5 className="py-2 ps-3 fs-5 d-block">So Far you have...</h5> */}
        <div id="milestone-bar-wrapper" className="px-2 rounded-bottom border-top border-1">
          {!!sessionStorage.getItem("user") && (
            <div id="milestone-list">
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
        </div>
      {!sessionStorage.getItem("userId") && (
        <h5 className="text-center">please login to view milestones</h5>
      )}
    </div>
  );
};

export default MilestoneBar;
