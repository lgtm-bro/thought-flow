import React, { useState, useEffect, useRef, Fragment } from "react";
import { Routes, Route, Link, useNavigate, redirect } from "react-router-dom";

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

  const getGuided = () => {
    if (guided_btn.current) setIsGuided(guided_btn.current.checked);
    if (solo_btn.current) setIsSolo(solo_btn.current.checked);
    setShowForm();
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
              <div id="entry-get-guided-cancel" className="container py-5">
                <Link to="/">
                  <button
                    type="button"
                    className="btn form-btn px-5"
                    onClick={reset}
                  >
                    Cancel
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

// const expandForm = () => {
//   if (window.matchMedia("(max-width: 578px)").matches) {
//     console.log("small screen");
//     container.current.style.height = "87%";
//   } else {
//     container.current.style.height = "75%";
//   }

//   window
//     .matchMedia("(max-width: 578px)")
//     .addEventListener("change", (event) => {
//       if (event.matches) {
//         container.current.style.height = "87%";
//       } else {
//         container.current.style.height = "75%";
//       }
//     });
// };

