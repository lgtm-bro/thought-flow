import React, { useState, useEffect, useRef, Fragment } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { IoRemoveOutline, IoPencil } from "react-icons/io5";

const Milestone = ({ milestone, updateMilestone, deleteMilestone }) => {
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
    <div className="milestone">
      <span className="icon-container">
        <span className="delete-icon icon">
          <IoRemoveOutline
            className="icon"
            onClick={() => deleteMilestone(milestone.id)}
          />
        </span>
        <span className="edit-icon icon" onClick={editMilestone}>
          <IoPencil className="icon" />
        </span>
      </span>
      <div className="milestone_text" ref={milestoneText}>{milestone.title}</div>
      <button
        value="Done"
        ref={done}
        className="done_btn hide"
        onClick={() => saveEdit(milestone.id)}
      >
        Done
      </button>
    </div>
  );
};

export default Milestone;
