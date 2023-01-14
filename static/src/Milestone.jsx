import React, { useState, useEffect, useRef, Fragment } from "react";
import { AiOutlinePlus, AiFillDelete } from "react-icons/ai";
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
    <div className="milestone card border-0 border-bottom border-top my-4 px-4">
      <div className="icon-container card-subtitle justify-content-end">
        <span className="delete-icon icon card-link">
          <IoRemoveOutline
            className="icon"
            onClick={() => deleteMilestone(milestone.id)}
          />
        </span>
        <span className="edit-icon icon card-link" onClick={editMilestone}>
          <IoPencil className="icon" />
        </span>
      </div>
      <h6 className="milestone_text card-title py-2" ref={milestoneText}>{milestone.title}</h6>
      <button
        value="Done"
        id="ms-done-btn"
        className="done_btn hide btn form-btn"
        ref={done}
        onClick={() => saveEdit(milestone.id)}
      >
        Done
      </button>
    </div>
  );
};

export default Milestone;
