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
    <Fragment>
      <br />
      <label htmlFor="solo_text">
        <span className="prompt">Tell us about it...</span>
        <br />
        <textarea id="solo_text" required onChange={setEntry}></textarea>
      </label>
      <br />
      <br />
      {/* <button onClick={props.reset} >Cancel</button> */}
    </Fragment>
  );
};

export default SoloForm;
