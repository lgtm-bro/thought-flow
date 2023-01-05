import React, { useState, useRef, Fragment } from "react";
import {
  Route,
  Link,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";

import Journal from "./Journal.jsx";
import MilestoneBar from "./MilestoneBar.jsx";
import Trends from "./Trends.jsx";

const Hub = (props) => {
  const journalEntries = useRef();
  const milestoneEntries = useRef();

  const [tab, setTab] = useState("journal");

  const showJournal = () => {
    if (tab !== "journal") {
      journalEntries.current.classList.remove("hide");
      milestoneEntries.current.classList.add("hide");
      setTab("journal");
    }
  };

  const showMilestones = () => {
    if (tab !== "milestones") {
      milestoneEntries.current.classList.remove("hide");
      journalEntries.current.classList.add("hide");
      setTab("milestones");
    }
  };

  return (
    <Fragment>
      <nav id="hub-nav">
        <span id="hub-journal" className="nav-link">
          <Link to="/" >Journal</Link>
          {/* <a href="#" onClick={showJournal}>
            Journal
          </a> */}
        </span>
        <span id="hub-milestones" className="nav-link">
          <Link to="/milestones" >Milestones</Link>
          {/* <a href="#" onClick={showMilestones}>
            Milestones
          </a> */}
        </span>
        <span id="hub-trends" className="nav-link">
          <Link to="/trends">Trends</Link>
          {/* <a href="#">
            Trends
          </a> */}
        </span>
      </nav>
      {/* <div id="journal-wrapper" ref={journalEntries}>
        <Journal
          posts={props.posts}
          feeling={props.feeling}
          deletePost={props.deletePost}
          updateEntry={props.updateEntry}
        />
      </div> */}
      {/* <div id="milestone-bar-wrapper" ref={milestoneEntries} className="hide">
        <MilestoneBar
          milestones={props.milestones}
          feeling={props.feeling}
          showMilestone={props.showMilestone}
          updateMilestone={props.updateMilestone}
          deleteMilestone={props.deleteMilestone}
        />
      </div>
      <div id="trends-wrapper">
        <Trends />
      </div> */}

      <Routes>
        <Route
          path="/"
          element={
            <Journal
              posts={props.posts}
              feeling={props.feeling}
              deletePost={props.deletePost}
              updateEntry={props.updateEntry}
            />
          }
        />
        <Route
          path="/milestones"
          element={
            <MilestoneBar
              milestones={props.milestones}
              feeling={props.feeling}
              showMilestone={props.showMilestone}
              updateMilestone={props.updateMilestone}
              deleteMilestone={props.deleteMilestone}
            />
          }
        />
        <Route path="/trends" element={<Trends />} />
      </Routes>
    </Fragment>
  );
};

export default Hub;
