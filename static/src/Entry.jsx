import React, { useState, useEffect, useRef, Fragment } from "react";
import { Routes, Route, Link, useNavigate, redirect } from "react-router-dom";

import GuidedForm from "./GuidedForm.jsx";
import SoloForm from "./SoloForm.jsx";

const Entry = ({
  feeling,
  feelingScore,
  submitEntry,
  setSendToEntry,
  checkMsgStatus,
}) => {
  const [isGuided, setIsGuided] = useState();
  const [isSolo, setIsSolo] = useState();
  const [entry, setEntry] = useState("");
  const [showForm, setShowForm] = useState(false);

  const container = useRef();
  const guided_btn = useRef();
  const solo_btn = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    if (!feeling) {
      reset();
    }
  }, [feeling]);

  useEffect(() => {
    if (guided_btn.current) guided_btn.current.checked;
    getGuided();
  }, []);

  useEffect(() => {
    isSolo || isGuided
      ? ((container.current.style.height = "70%"),
      setShowForm(true), navigate("/entry/form"))
      : (container.current.style.height = "50%");
  }, [isSolo, isGuided]);

  const getGuided = () => {
    if (guided_btn.current) setIsGuided(guided_btn.current.checked);
    if (solo_btn.current) setIsSolo(solo_btn.current.checked);
    setShowForm()
  };

  const reset = () => {
    setIsGuided(false);
    setIsSolo(false);
    setSendToEntry(false);
    checkMsgStatus();
    setEntry("");
    if (solo_btn.current) solo_btn.current.checked = false;
    if (guided_btn.current) guided_btn.current.checked = false;
  };

  const getEntry = (text) => {
    setEntry(text);
  };

  const submitPost = (e) => {
    e.preventDefault();
    submitEntry(entry, isGuided);
    setEntry("");
  };

  return (
    <main
      id="entry-container"
      className="container justify-content-center text-center shadow rounded"
      ref={container}
    >
      {/* {
        (!isGuided && !isSolo) &&
        <div id="entry-get-guided" className="container p-2 mt-2 mt-sm-3">
        <h3 className=" mt-2">How do you want to flow today?</h3>
        <form action="#" id="entry-type" className="py-2 pb-1">
          <span id="entry-radio-guided" className="form-check-inline">
            <input
              type="radio"
              name="isGuided"
              value="guided"
              id="guided"
              className="form-check-input"
              ref={guided_btn}
              onChange={getGuided}
            />
            <label htmlFor="guided" className="form-check-label">
              Guided
            </label>
          </span>
          <span id="entry-radio-solo" className=".form-check-inline">
            <input
              type="radio"
              name="isGuided"
              value="solo"
              id="solo"
              className="form-check-input"
              ref={solo_btn}
              onChange={getGuided}
            />
            <label htmlFor="solo" className="form-check-label">
              Solo
            </label>
          </span>
        </form>
      </div>} */}

      <Routes>
        <Route
          path="/"
          element={
            <div id="entry-get-guided" className="container p-2 mt-2 mt-sm-3">
              <h3 className=" mt-2">How do you want to flow today?</h3>
              <form action="#" id="entry-type" className="py-2 pb-1">
                <span id="entry-radio-guided" className="form-check-inline">
                  <input
                    type="radio"
                    name="isGuided"
                    value="guided"
                    id="guided"
                    className="form-check-input"
                    ref={guided_btn}
                    onChange={getGuided}
                  />
                  <label htmlFor="guided" className="form-check-label">
                    Guided
                  </label>
                </span>
                <span id="entry-radio-solo" className=".form-check-inline">
                  <input
                    type="radio"
                    name="isGuided"
                    value="solo"
                    id="solo"
                    className="form-check-input"
                    ref={solo_btn}
                    onChange={getGuided}
                  />
                  <label htmlFor="solo" className="form-check-label">
                    Solo
                  </label>
                </span>
              </form>
            </div>
          }
        />

        <Route
          path="/form/*"
          element={
            <div id="entry-content" className="container-fluid">
              <form id="post-form" className="form-group" onSubmit={submitPost}>
                <div id="entry-form">
                  {isGuided && (
                    <GuidedForm
                      feeling={feeling}
                      feelingScore={feelingScore}
                      reset={reset}
                      getEntry={getEntry}
                      submitEntry={submitEntry}
                    />
                  )}
                  {isSolo && (
                    <SoloForm
                      reset={reset}
                      getEntry={getEntry}
                      submitEntry={submitEntry}
                    />
                  )}
                </div>
                <div id="entry-btn-div" className="form-btn-div">
                  <Link to="/">
                    <button
                      type="button"
                      className="btn form-btn"
                      onClick={reset}
                    >
                      Cancel
                    </button>
                  </Link>
                  <input
                    type="submit"
                    value="Let it go"
                    className="btn form-btn"
                  />
                </div>
              </form>
            </div>
          }
        />
      </Routes>
    </main>
  );
};

export default Entry;

{
  /* <Routes>
<Route
  path="guided"
  element={
    <GuidedForm
      feeling={feeling}
      feelingScore={feelingScore}
      reset={reset}
      getEntry={getEntry}
      submitEntry={submitEntry}
    />
  }
/>
<Route
  path="solo"
  element={
    <SoloForm
      reset={reset}
      getEntry={getEntry}
      submitEntry={submitEntry}
    />
  }
/>
</Routes> */
}
