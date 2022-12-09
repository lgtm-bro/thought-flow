import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const ProgressBar = (props) => {
  const [milestones, setMilestones] = useState([]);

  useEffect(() => {
    getMilestones(props.user.name);
  }, []);

  // useEffect(() => {
  // 	console.log(milestones)
  // }, [milestones])

  const getMilestones = () => {
    axios
      .get(`/milestones/${props.user.name}`)
      .then((results) => setMilestones(results.data));
  };

  return (
    <div id="progress-bar-wrapper">
      <h4>
        You have great days ahead!
        <br />
        So Far you have...
      </h4>
      {milestones.map((m) => (
        <div key={m.id}>{m.title}</div>
      ))}
    </div>
  );
};

export default ProgressBar;

ProgressBar.defaultProps = {
  user: {
    name: "Sarah",
    email: "sarah@gmail.com",
    password: "Pass",
  },
};
