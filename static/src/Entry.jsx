import React, { useState, useEffect, useRef, Fragment } from "react";
import { Link, useNavigate, redirect } from "react-router-dom";

import GuidedForm from "./GuidedForm.jsx";
import SoloForm from "./SoloForm.jsx";

const Entry = ({ feeling, feelingScore, submitEntry, setSendToEntry }) => {
  const [isGuided, setIsGuided] = useState();
  const [isSolo, setIsSolo] = useState();
  const [entry, setEntry] = useState("");
  const guided_btn = useRef();
  const solo_btn = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    if (!feeling) {
      reset();
    }
  }, [feeling]);

  useEffect(() => {
    guided_btn.current.checked;
    getGuided();
  }, []);


  const getGuided = () => {
    setIsGuided(guided_btn.current.checked);
    setIsSolo(solo_btn.current.checked);
  };

  const reset = () => {
    setIsGuided(false);
    setIsSolo(false);
    setSendToEntry(false);
    setEntry('');
    solo_btn.current.checked = false;
    guided_btn.current.checked = false;
  };

  const getEntry = (text) => {
    setEntry(text);
  }

  const submitPost = (e) => {
    e.preventDefault();
    submitEntry(entry, isGuided);
    setEntry('');
  };

  return (
    <Fragment>
      <h3>How would you like to flow today?</h3>
      <form action="#" id="entry-type">
        <input
          type="radio"
          name="flow"
          value="guided"
          id="guided"
          ref={guided_btn}
          onChange={getGuided}
        />
        <label htmlFor="guided">Guided</label>
        <input
          type="radio"
          name="flow"
          value="solo"
          id="solo"
          ref={solo_btn}
          onChange={getGuided}
        />
        <label htmlFor="solo">Solo</label>
      </form>
      <form id="entry-form" onSubmit={submitPost}>
        {isGuided && (
          <GuidedForm
            feeling={feeling}
            feelingScore={feelingScore}
            reset={reset}
            getEntry={getEntry}
            submitEntry={submitEntry}
          />
        )}
        {isSolo && <SoloForm reset={reset} getEntry={getEntry} submitEntry={submitEntry} />}
        <br />
        <Link to="/">
          <button type="button" onClick={reset}>
            Cancel
          </button>
        </Link>
        <input
          type="submit"
          value="Let it go"/>
      </form>
    </Fragment>
  );
};

export default Entry;
