import React, { Fragment, useState, useEffect, useRef } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

const GuidedForm = (props) => {
  const embracing = useRef();
  const resisting = useRef();

  const [prompt1, setPrompt1] = useState("");
  const [prompt2, setPrompt2] = useState("");
  const [prompt3, setPrompt3] = useState("");
  const [isEmbracing, setIsEmbracing] = useState();
  const [showPrompt2, setShowPrompt2] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (isEmbracing !== undefined) {
      setShowPrompt2(true);
    }
  }, [isEmbracing]);

  useEffect(() => {
    props.getEntry(
      `${prompt1.trim()}\n\n${prompt2.trim()}\n\n${prompt3.trim()}`
    );
  }, [prompt1, prompt2, prompt3]);

  const getEmbracing = () => {
    // props.expandForm();
    setIsEmbracing(embracing.current.checked);
    // navigate("/entry/prompt2");
  };

  const getPrompt = (e, prompt, func) => {
    let input = "";

    if (e.target.value) {
      input =
        e.target.value.substring(0, 2) !== "I "
          ? e.target.value[0].toLowerCase() + e.target.value.substring(1)
          : e.target.value;
    }

    if (prompt === prompt1) {
      func(`I am feeling ${props.feeling} because ` + input);
    } else if (prompt === prompt2) {
      if (isEmbracing) {
        func("I am embracing this, so " + input);
      } else {
        func("If I embraced this feeling, " + input);
      }
    } else {
      func(e.target.value);
    }
  };

  const checkKey = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.target.checked = !e.target.checked;
    }
  };

  const prompt1Key = props.feelingScore > 0 ? "helped" : "caused";
  const postureQuestion = isEmbracing
    ? "How do you think embracing these feelings is impacting this experience for you?"
    : "What would it feel like to embrace them?";

  return (
    <div id="guided-container" className="container px-3 mr-5">
      <div id="prompt1" className="container">
        <label htmlFor="prompt1" className="guided-label form-label">
          What experience or event {prompt1Key} you to feel {props.feeling}?
        </label>
        <textarea
          id="prompt1"
          className="form-control"
          required
          onChange={(e) => getPrompt(e, prompt1, setPrompt1)}
        ></textarea>
        <label htmlFor="posture" className="guided-label form-label d-block">
          Are you embracing or resisting these feelings?
        </label>
        <span id="entry-embracing-radio" className="form-check-inline">
          <input
            type="radio"
            name="posture"
            value="embracing"
            id="embracing"
            className="form-check-input"
            ref={embracing}
            onChange={getEmbracing}
            onKeyDown={checkKey}
          />
          <label htmlFor="embracing" className="form-check-label fw-bold">
            embracing
          </label>
        </span>
        <span id="entry-resisting-radio" className="form-check-inline">
          <input
            type="radio"
            name="posture"
            value="resisting"
            id="resisting"
            className="form-check-input"
            ref={resisting}
            onChange={getEmbracing}
          />
          <label htmlFor="resisting" className="form-check-label fw-bold">
            resisting
          </label>
        </span>
      </div>
      {showPrompt2 && (
        <div id="guided-form-part2">
          <label htmlFor="prompt2" className="guided-label form-label">
            {postureQuestion}
          </label>
          <textarea
            id="prompt2"
            className="form-control"
            required
            onChange={(e) => getPrompt(e, prompt2, setPrompt2)}
          ></textarea>
          <label htmlFor="prompt3" className="guided-label form-label">
            What other insights or emotions would you like to share about this
            experience?
          </label>
          <textarea
            id="prompt3"
            className="form-control"
            onChange={(e) => getPrompt(e, prompt3, setPrompt3)}
          ></textarea>
        </div>
      )}

      {/* <Routes>
        <Route
          path="/"
          element={
            <div id="prompt1" className="container">
              <label htmlFor="prompt1" className="guided-label form-label">
                What experience or event {prompt1Key} you to feel{" "}
                {props.feeling}?
              </label>
              <textarea
                id="prompt1"
                className="form-control"
                required
                onChange={(e) => getPrompt(e, prompt1, setPrompt1)}
              ></textarea>
              <label
                htmlFor="posture"
                className="guided-label form-label d-block"
              >
                Are you embracing or resisting these feelings?
              </label>
              <div className="my-3">
                <span id="entry-embracing-radio" className="form-check-inline">
                  <input
                    type="radio"
                    name="posture"
                    value="embracing"
                    id="embracing"
                    className="form-check-input"
                    ref={embracing}
                    onChange={getEmbracing}
                    onKeyDown={checkKey}
                  />
                  <label htmlFor="embracing" className="form-check-label">
                    Embracing
                  </label>
                </span>
                <span id="entry-resisting-radio" className="form-check-inline">
                  <input
                    type="radio"
                    name="posture"
                    value="resisting"
                    id="resisting"
                    className="form-check-input"
                    ref={resisting}
                    onChange={getEmbracing}
                  />
                  <label htmlFor="resisting" className="form-check-label">
                    Resisting
                  </label>
                </span>
              </div>
            </div>
          }
        />
        <Route
          path="/prompt2"
          element={
            <div id="guided-form-part2">
              <label htmlFor="prompt2" className="guided-label form-label">
                {postureQuestion}
              </label>
              <textarea
                id="prompt2"
                className="form-control"
                required
                onChange={(e) => getPrompt(e, prompt2, setPrompt2)}
              ></textarea>
              <label htmlFor="prompt3" className="guided-label form-label">
                What other insights or emotions would you like to share about
                this experience?
              </label>
              <textarea
                id="prompt3"
                className="form-control"
                onChange={(e) => getPrompt(e, prompt3, setPrompt3)}
              ></textarea>
            </div>
          }
        />
      </Routes> */}
    </div>
  );
};

export default GuidedForm;
