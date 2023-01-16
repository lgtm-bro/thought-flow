import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import GuidedForm from "./GuidedForm.jsx";
import SoloForm from "./SoloForm.jsx";

const EntryContent = ({
  feeling,
  feelingScore,
  isGuided,
  isSolo,
  reset,
  getEntry,
  submitEntry,
  submitPost,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!(isSolo || isGuided)) {
      navigate("/entry");
    }
  });

  return (
    <div
      id="entry-content"
      className="container text-center p-2 pt-4 mt-4 mt-lg-1 shadow rounded"
    >
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
          <Link to="/entry">
            <button type="button" className="btn form-btn">
              Back
            </button>
          </Link>
          <input type="submit" value="Let it go" className="btn form-btn" />
        </div>
      </form>
    </div>
  );
};

export default EntryContent;
