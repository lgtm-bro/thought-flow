import React, { useState, useEffect, useRef, Fragment } from "react";
import axios from "axios";

const ProgressBar = (props) => {
  const [milestones, setMilestones] = useState([]);

  // useEffect(() => {
  //   getMilestones(props.user.name);
  // }, []);

  // const getMilestones = () => {
  //   axios
  //     .get(`/milestones/${props.user.name}`)
  //     .then((results) => setMilestones(results.data));
  // };

  return (
    <Fragment>
      <h4>
        You have great days ahead!
        <br />
        So Far you have...
      </h4>
      {props.milestones.map((m) => (
        <div key={m.id}>{m.title}</div>
      ))}
    </Fragment>
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
