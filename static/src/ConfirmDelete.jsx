import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

const DeletePost = (props) => {
  const msg = useRef();

  const navigate = useNavigate();

  const getConfirm = (e) => {
    let answer = e.target.value;
    if (answer === "yes") {
      props.delete(props.entryId);
    }
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
      <h6 className="">do you want to delete this entry?</h6>
      <form action="#" className="form-check-inline">
        <input
          type="radio"
          name="confirm"
          value="yes"
          className="form-check-input me-2"
          onChange={getConfirm}
        />
        <label htmlFor="confirm" className="form-check-label">
          yes
        </label>
        <input
          type="radio"
          name="confirm"
          value="no"
          className="form-check-input ms-3 me-2"
          onChange={getConfirm}
        />
        <label htmlFor="confirm" className="form-check-label">
          no
        </label>
      </form>
    </div>
  );
};

export default DeletePost;
