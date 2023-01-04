import React, { useState, useEffect, useRef, Fragment } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { IoRemoveOutline, IoPencil } from "react-icons/io5";

import Milestone from "./Milestone.jsx";


const MilestoneBar = ({
  milestones,
  showMilestone,
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
    <Fragment>
      <h4>
        You have great days ahead!
        <br />
        So Far you have...
      </h4>
      {feeling && (
        <h5>
          {" "}
          Add a milestone
          <span onClick={showMilestone}>
            <AiOutlinePlus />
          </span>
        </h5>
      )}
      {milestones.map((m) => (
        <Milestone key={m.id} milestone={m} updateMilestone={updateMilestone}
        deleteMilestone={deleteMilestone}/>

      ))}
    </Fragment>
  );
};

export default MilestoneBar;