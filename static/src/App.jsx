import React, { useEffect, useState, useRef, Fragment } from "react";
import axios from "axios";
import Entry from "./Entry.jsx";
import Feelings from "./Feelings.jsx";
import ProgressBar from "./ProgressBar.jsx";
import Journal from "./Journal.jsx";


const App = () => {
  const [feeling, setFeeling] = useState();
  const [user, setUser] = useState();
  const feels = useRef();
  const entry = useRef();

  useEffect(() => {
    if (feeling) {
      console.log(feeling.name, feeling.score);
    }
  }, [feeling]);

  const hideFeels = () => {
    feels.current.classList.add("hide");
  };

  const showEntryForm = (el) => {
    entry.current.classList.remove("hide");
  };

  const getFeeling = (f) => {
    axios
      .get(`/third_emotion/${f}`)
      .then((results) => setFeeling(results.data));
  };

  return (
    <Fragment>
      <h1>ThoughtFlow</h1>
      <ProgressBar />
      {/* <div ref={feels} id="feelings_wrapper">
        <Feelings
          hide={hideFeels}
          show={showEntryForm}
          feeling={getFeeling}/>
      </div> */}
      <div ref={entry} id="entry-wrapper" className="">
        <Entry feeling={feeling} />
      </div>
      <Journal />
    </Fragment>
  );
};

export default App;
