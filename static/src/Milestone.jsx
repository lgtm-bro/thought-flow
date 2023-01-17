import React, { useState, useEffect, useRef, Fragment } from "react";
import { AiOutlinePlus, AiFillDelete } from "react-icons/ai";
import { IoRemoveOutline, IoPencil } from "react-icons/io5";
import { AiOutlineEdit, AiOutlineClose } from "react-icons/ai";

import ConfirmDelete from "./ConfirmDelete.jsx";

const Milestone = ({ milestone, updateMilestone, deleteMilestone }) => {
  const milestoneText = useRef();
  const done = useRef();

  const editMilestone = (e) => {
    if (milestoneText.current.isContentEditable) {
      milestoneText.current.contentEditable = false;
      done.current.classList.add("hide");
    } else {
      milestoneText.current.contentEditable = true;
      done.current.classList.remove("hide");
    }
  };

  const saveEdit = (id) => {
    console.log(milestoneText.current.innerText);
    updateMilestone(id, milestoneText.current.innerText);
    milestoneText.current.contentEditable = false;
    done.current.classList.add("hide");
  };

  const showConfirmDelete = () => {
    document.getElementById(`ms-delete-container-${milestone.id}`).classList.remove('hide');
  };

  return (
    <div className="milestone card border-0 rounded-0 border-bottom my-1 px-4">
      <div className="card-body">
        <ConfirmDelete
          delete={deleteMilestone}
          entryId={milestone.id}
          type="ms"
          page="/hub-milestones"
        />
        <div className="row justify-content-around">
          <h6
            className="milestone_text card-title col-10 py-3"
            ref={milestoneText}
          >
            {milestone.title}
          </h6>
          <span className="icon-container card-subtitle col-1 py-2 pe-3 pe-md-4">
            <span className="edit-icon icon card-link" onClick={editMilestone}>
              <AiOutlineEdit className="icon" />
            </span>
            <span
              className="delete-icon icon card-link"
              onClick={showConfirmDelete}
            >
              <AiOutlineClose className="icon" />
            </span>
          </span>
        </div>
      <button
        value="Done"
        id="ms-done-btn"
        className="hide btn form-btn"
        ref={done}
        onClick={() => saveEdit(milestone.id)}
      >
        done
      </button>
      </div>
    </div>
  );
};

export default Milestone;
