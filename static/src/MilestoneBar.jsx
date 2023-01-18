import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { FaPlus } from "react-icons/fa";
import Milestone from "./Milestone.jsx";

const MilestoneBar = ({
  milestones,
  feeling,
  updateMilestone,
  deleteMilestone,
  changeMsg,
}) => {
  const updateFeelingMsg = () => {
    changeMsg("", false);
  };

  return (
    <div id="milestone-bar-container rounded border">
      {!!sessionStorage.getItem("userId") && (
        <div className="add-entry mt-4 border-bottom border-1">
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
      )}
      <div id="milestone-bar-wrapper" className="px-2 rounded-bottom">
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
        {!sessionStorage.getItem("userId") && (
          <h5 className="text-center py-2">please login to view milestones</h5>
        )}
      </div>
    </div>
  );
};

export default MilestoneBar;
