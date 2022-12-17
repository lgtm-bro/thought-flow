import React, { Fragment, useState, useEffect, useRef } from "react";


const SoloForm = (props) => {
  const [entry, setEntry] = useState("");
  const form = useRef();

  const submitPost = (e) => {
    e.preventDefault();
    props.submitEntry(e, entry, false);
    form.current.reset();
    props.showHome();
  }

  const getEntry = (e) => {
    setEntry(e.target.value)
  }

  return (
    <Fragment>
      <form onSubmit={submitPost} ref={form}>
        <br />
        <label htmlFor="solo_text">
        <span className="prompt">Tell us about it...</span>
          <br/>
          <textarea id="solo_text" required onChange={getEntry}></textarea>
        </label>
        <br /><br />
        {<button onClick={props.reset} >Cancel</button>}
        {<input type="submit" value="Let it go"/>}
      </form>
    </Fragment>
  );
};

export default SoloForm;
