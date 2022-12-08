import React, { useState, useEffect, useRef } from "react";
import GuidedForm from "./GuidedForm.jsx";
import SoloForm from "./SoloForm.jsx";

const Entry = (props) => {
  const [isGuided, setIsGuided] = useState(false);
  const [isSolo, setIsSolo] = useState(false);
  const guided_btn = useRef();
  const solo_btn = useRef();

  useEffect(() => {
    console.log("guided:", isGuided);
  }, [isGuided]);

  const getGuided = () => {
    setIsGuided(guided_btn.current.checked);
    setIsSolo(solo_btn.current.checked);
  };

  return (
    <div className="entryContainer">
      <h3>How would you like to flow today?</h3>
      <form>
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
        {isGuided && <div id="guided-entry-form">
          <GuidedForm />
        </div>}
        {isSolo && <div id="solo-entry-form">
          <SoloForm />
        </div>}
      </form>
    </div>
  );
};

export default Entry;
