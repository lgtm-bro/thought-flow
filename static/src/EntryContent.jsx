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
              getEntry={getEntry}
              submitEntry={submitEntry}
            />
          )}
          {isSolo && <SoloForm getEntry={getEntry} submitEntry={submitEntry} />}
        </div>
        <div id="entry-btn-div" className="form-btn-div mt-4">
          <Link to="/entry">
            <button type="button" className="btn form-btn px-5" onClick={reset}>
              back
            </button>
          </Link>
          <input type="submit" value="save" className="btn form-btn px-5" />
        </div>
      </form>
    </div>
  );
};

export default EntryContent;
