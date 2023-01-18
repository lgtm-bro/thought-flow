import React, { useState, useEffect, useRef, Fragment } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

import EntryContent from "./EntryContent.jsx";

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
    if (isSolo || isGuided) {
      setShowForm(true), navigate("/entry/form");
    }
  }, [isSolo, isGuided]);

  const getGuided = (e) => {
    if (guided_btn.current) setIsGuided(guided_btn.current.checked);
    if (solo_btn.current) setIsSolo(solo_btn.current.checked);
    setShowForm(null);
  };

  const reset = () => {
    setIsGuided(false);
    setIsSolo(false);
    if (solo_btn.current) solo_btn.current.checked = false;
    if (guided_btn.current) guided_btn.current.checked = false;
  };

  const canceForm = () => {
    reset();
    setSendToEntry(false);
    checkMsgStatus();
    setEntry("");
  };

  const goBack = () => {
    setIsGuided(false);
    setIsSolo(false);
    setSendToEntry(false);
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
    <Fragment>
      <Routes>
        <Route
          path="/"
          element={
            <div
              id="entry-get-flow"
              className="container text-center p-2 pt-4 mt-4 mt-lg-1 shadow rounded"
            >
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
                    onClick={getGuided}
                  />
                  <label htmlFor="guided" className="form-check-label fw-bold">
                    guided
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
                    onClick={getGuided}
                  />
                  <label htmlFor="solo" className="form-check-label fw-bold">
                    solo
                  </label>
                </span>
              </form>
              <div id="entry-get-guided-cancel" className="container py-5">
                <Link to="/">
                  <button
                    type="button"
                    className="btn form-btn px-5"
                    onClick={canceForm}
                  >
                    cancel
                  </button>
                </Link>
              </div>
            </div>
          }
        />
        <Route
          path="/form/*"
          element={
            <EntryContent
              feeling={feeling}
              feelingScore={feelingScore}
              isGuided={isGuided}
              isSolo={isSolo}
              reset={reset}
              canceForm={canceForm}
              getEntry={getEntry}
              submitEntry={submitEntry}
              submitPost={submitPost}
            />
          }
        />
      </Routes>
    </Fragment>
  );
};

export default Entry;
