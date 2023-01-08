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
}) => {
  const milestoneText = useRef();
  const done = useRef();

  const editMilestone = (e) => {
    milestoneText.current.contentEditable = true;
    done.current.classList.remove("hide");
  };

  const saveEdit = (id) => {
    console.log(milestoneText.current.innerText);
    updateMilestone(id, milestoneText.current.innerText);
    milestoneText.current.contentEditable = false;
    done.current.classList.add("hide");
  };

  return (
    <div id="milestone-bar-wrapper">
      <h4>
        So Far you have...
      </h4>
        {!!sessionStorage.getItem('user') && <h5>
          <span>
            <Link to="/milestone">
              <AiOutlinePlus />
              add a milestone
            </Link>
          </span>
        </h5>}
      {milestones.map((m) => (
        <Milestone key={m.id} milestone={m} updateMilestone={updateMilestone}
        deleteMilestone={deleteMilestone}/>

      ))}
    </div>
  );
};

export default MilestoneBar;