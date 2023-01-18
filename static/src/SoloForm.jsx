import React, { useRef } from "react";

const SoloForm = ({ getEntry, submitEntry, reset }) => {
  const form = useRef();

  const submitPost = (e, entry, isGuided) => {
    e.preventDefault();
    props.submitEntry(e, entry, isGuided);
  };

  const setEntry = (e) => {
    getEntry(e.target.value);
  };

  return (
    <div className="container-fluid px-5 me-5">
      <label htmlFor="solo_text" className="solo-label form-label mb-3">
        tell us about it...
      </label>
      <textarea
        rows="5"
        cols="8"
        id="solo_text"
        className="form-control"
        required
        onChange={setEntry}
      ></textarea>
    </div>
  );
};

export default SoloForm;
