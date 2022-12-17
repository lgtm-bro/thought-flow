import React, { useState, useEffect, useRef, Fragment } from "react";
import GuidedForm from "./GuidedForm.jsx";
import SoloForm from "./SoloForm.jsx";

const Entry = (props) => {
  const [isGuided, setIsGuided] = useState(false);
  const [isSolo, setIsSolo] = useState(false);
  const [entry, setEntry] = useState('');
  const guided_btn = useRef();
  const solo_btn = useRef();

  useEffect(() => {
    if (!props.feeling){
      reset();
    }
  }, [props.feeling])

  const getGuided = () => {
    setIsGuided(guided_btn.current.checked);
    setIsSolo(solo_btn.current.checked);
  };

  const reset = (e) => {
    if (e) e.preventDefault();
    setIsGuided(false);
    setIsSolo(false);
    solo_btn.current.checked = false;
    guided_btn.current.checked = false;
  }

  return (
    <Fragment >
      <h3>How would you like to flow today?</h3>
      <form action="#">
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
        {isGuided && (
          <div id="guided-entry-form">
            <GuidedForm feeling={props.feeling}
                        feelingScore={props.feelingScore}
                        reset={reset}
                        submitEntry={props.submitEntry}
                        showHome={props.showHome}
            />
          </div>
        )}
        {isSolo && (
          <div id="solo-entry-form">
            <SoloForm reset={reset}
                      submitEntry={props.submitEntry}
                      showHome={props.showHome}
            />
          </div>
        )}
        {/* {(isGuided || isSolo) && <button onClick={reset} >Cancel</button>}
        {(isGuided || isSolo) && <input type="submit" value="Let it go" />} */}
    </Fragment>
  );
};

export default Entry;
