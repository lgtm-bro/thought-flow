import React, { Fragment, useState, useEffect, useRef } from "react";

const GuidedForm = (props) => {
  const embracing = useRef();
  const resisting = useRef();
  const form = useRef();
  const [prompt1, setPrompt1] = useState("");
  const [prompt2, setPrompt2] = useState("");
  const [prompt3, setPrompt3] = useState("");
  const [isEmbracing, setIsEmbracing] = useState();
  const [showPrompt2, setShowPrompt2] = useState(false);
  let entry = "";

  useEffect(() => {
    if (isEmbracing !== undefined) setShowPrompt2(true);
  }, [isEmbracing]);

  useEffect(() => {
    entry = `${prompt1.trim()}\n\n${prompt2.trim()}\n\n${prompt3.trim()}`;

  }, [prompt1, prompt2, prompt3]);

  const getEmbracing = () => {
    setIsEmbracing(embracing.current.checked);
  };

  const getPrompt = (e, func) => {
    func(e.target.value);
  };

  const submitPost = (e) => {
    e.preventDefault();
    props.submitEntry(e, entry, true);
    // form.current.reset();
    props.showHome();
  }

  const checkKey = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.target.checked = !e.target.checked;
    }
  }

  const prompt1Key = props.feelingScore > 0 ? "helped" : "caused";
  const postureQuestion = isEmbracing
    ? "How do you think embracing these feelings is impacting this experience for you?"
    : "What would it feel like to embrace them?";

  return (
    <form onSubmit={submitPost} ref={form}>
      <br />
      <label htmlFor="prompt1">
        What experience or event {prompt1Key} you to feel {props.feeling}?
        <br />
        <textarea
          id="prompt1"
          onChange={(e) => getPrompt(e, setPrompt1)}
        ></textarea>
      </label>

      <br />
      <br />

      {/* <label htmlFor="posture"> */}
        <span className="prompt">
          Are you embracing or resisting these feelings?
        </span>
      {/* </label> */}

      <br />

      <input
        type="radio"
        name="posture"
        value="embracing"
        id="embracing"
        ref={embracing}
        onChange={getEmbracing}
        onKeyDown={checkKey}
      />

      <label htmlFor="embracing">Embracing</label>

      <input
        type="radio"
        name="posture"
        value="resisting"
        id="resisting"
        ref={resisting}
        onChange={getEmbracing}
      />

      <label htmlFor="resisting">Resisting</label>

      <br />
      <br />

      {showPrompt2 && (
        <div id="guided-form-part2">
          <label htmlFor="prompt2">
            <span className="prompt">{postureQuestion}</span>
            <br />
            <textarea
              id="prompt2"
              onChange={(e) => getPrompt(e, setPrompt2)}
            ></textarea>
          </label>
          <br />
          <br />
          <label htmlFor="prompt3">
            <span className="prompt">
              What other insights or emotions would you like to share about this
              experience?
            </span>
            <br />
            <textarea
              id="prompt3"
              onChange={(e) => getPrompt(e, setPrompt3)}
            ></textarea>
          </label>
        </div>
      )}

      <br />
      <br />

      <button onClick={props.reset} >Cancel</button>

      <input
        type="submit"
        value="Let it go"/>
    </form>
  );
};

GuidedForm.defaultProps = {
  feeling: { name: "creative", score: 6 },
};

export default GuidedForm;
