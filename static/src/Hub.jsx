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

  const sendFeelingMsg = (msg, hasQ, path = "/") => {
    props.changeMsg(msg, hasQ, path);
  };

  return (
    <Fragment>
      <nav
        id="hub-nav"
        className="navbar bg-light flex-justify-between flex-nowrap p-3 shadow rounded"
      >
        <span
          id="hub-journal"
          className="nav-link hub-link navbar-item"
          onClick={props.checkMsgStatus}
        >
          <Link to="/">journal</Link>
        </span>
        <span
          id="hub-milestones"
          className="nav-link hub-link nav-item"
          onClick={props.checkMsgStatus}
        >
          <Link to="/hub-milestones">milestones</Link>
        </span>
        <span
          id="hub-trends"
          className="nav-link hub-link nav-item"
          onClick={() => props.checkMsgStatus("", false, "/hub-milestones")}
        >
          <Link to="/hub-trends">trends</Link>
        </span>
      </nav>

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
              setSendToEntry={props.setSendToEntry}
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
              changeMsg={props.changeMsg}
            />
          }
        />
        <Route
          path="/hub-trends"
          element={<Trends getUserSessions={props.getUserSessions} />}
        />
      </Routes>
    </Fragment>
  );
};

export default Hub;
