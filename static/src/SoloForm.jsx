import React, { Fragment, useState, useEffect, useRef } from "react";

const SoloForm = ({ getEntry, submitEntry }) => {
  const form = useRef();

  const submitPost = (e, entry, isGuided) => {
    e.preventDefault();
    props.submitEntry(e, entry, isGuided);
  };

  const setEntry = (e) => {
    getEntry(e.target.value);
  };

  return (
    <div className="container">
      <label htmlFor="solo_text" className="solo-label form-label mb-3">
        Tell us about it...
      </label>
      <textarea
        id="solo_text"
        required
        className="form-control p-5 mb-5"
        onChange={setEntry}
      ></textarea>
    </div>
  );
};

export default SoloForm;
