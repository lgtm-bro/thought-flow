import React, { useState, useRef, useEffect, Fragment } from "react";
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
  const [tab, setTab] = useState("journal");

  const journalEntries = useRef();
  const milestoneEntries = useRef();

  const navigate = useNavigate();
  const defaultMsg =
    "First, let's indentify how you feel about this experience ";

  useEffect(() => {
    navigate("/");
  }, []);

  // const showJournal = () => {
  //   if (tab !== "journal") {
  //     journalEntries.current.classList.remove("hide");
  //     milestoneEntries.current.classList.add("hide");
  //     setTab("journal");
  //   }
  // };

  // const showMilestones = () => {
  //   if (tab !== "milestones") {
  //     milestoneEntries.current.classList.remove("hide");
  //     journalEntries.current.classList.add("hide");
  //     setTab("milestones");
  //   }
  // };

  const sendFeelingMsg = (msg, hasQ, path = "/") => {
    props.changeMsg(msg, hasQ, path);
  };

  return (
    <Fragment>
      <nav id="hub-nav">
        <span
          id="hub-journal"
          className="nav-link"
          onClick={props.checkMsgStatus}
        >
          <Link to="/">Journal</Link>
        </span>
        <span
          id="hub-milestones"
          className="nav-link"
          onClick={props.checkMsgStatus}
        >
          <Link to="/hub-milestones">Milestones</Link>
        </span>
        <span
          id="hub-trends"
          className="nav-link"
          onClick={props.checkMsgStatus}
        >
          <Link to="/hub-trends">Trends</Link>
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
              updateEntry={props.updateEntry}
              deletePost={props.deletePost}
              changeMsg={props.changeMsg}
            />
          }
        />
        <Route
          path="/hub-milestones"
          element={
            <MilestoneBar
              milestones={props.milestones}
              feeling={props.feeling}
              updateMilestone={props.updateMilestone}
              deleteMilestone={props.deleteMilestone}
            />
          }
        />
        <Route path="/hub-trends" element={<Trends getUserSessions={props.getUserSessions} />} />
      </Routes>
    </Fragment>
  );
};

export default Hub;
