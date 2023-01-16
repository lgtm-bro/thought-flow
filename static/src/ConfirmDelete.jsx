import React, { useState, useEffect, useRef, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";

const DeletePost = (props) => {
  const msg = useRef();

  const navigate = useNavigate();

  const getConfirm = (e) => {
    let answer = e.target.value;
    if (answer === "yes") {
        props.delete(props.entryId)
        // navigate(props.page);
    }
    // props.setCurrPost(null);
    e.target.checked = false;
    msg.current.classList.add("hide");
    navigate(props.page);
  };

  return (
    <div
      id={`${props.type}-delete-container-${props.entryId}`}
      className="delete-container hide container fs-6 p-2 text-center shadow rounded"
      ref={msg}
    >
      <h6 className="">Do you want to delete this entry?</h6>
      <form action="#" className="form-check-inline">
        <input
          type="radio"
          name="confirm"
          value="yes"
          className="form-check-input me-2"
          onChange={getConfirm}
        />
        <label htmlFor="confirm" className="form-check-label">
          Yes
        </label>
        <input
          type="radio"
          name="confirm"
          value="no"
          className="form-check-input ms-3 me-2"
          onChange={getConfirm}
        />
        <label htmlFor="confirm" className="form-check-label">
          No
        </label>
      </form>
    </div>
  );
};

export default DeletePost;