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
  const journalEntries = useRef();
  const milestoneEntries = useRef();
  const journal= useRef();
  const milestones = useRef();
  const trends = useRef();

  const navigate = useNavigate();

  const hubTabs = [journal, milestones, trends];
  const activeColor = "#e88686";
  const deactiveColor = "#606060";
  const defaultMsg =
    "First, let's indentify how you feel about this experience ";

  const activeTab = (e) => {
    let parent, child;

    e.target.text ?
      (parent = e.target.parentNode, child = e.target):
      (parent= e.target, child = e.target.firstChild);

      parent.classList.add("active");
      child.style.color = activeColor;

      hubTabs.forEach(t => {
        if (parent !== t.current) {
          t.current.classList.remove("active");
          t.current.children[0].style.color = deactiveColor;
        }
      })

    props.checkMsgStatus();
  }

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
        className="nav nav-tabs rounded"
      >
        <span
          id="hub-journal"
          className="hub-link nav-link active"
          ref={journal}
          onClick={activeTab}
        >
          <Link to="/">journal</Link>
        </span>
        <span
          id="hub-milestones"
          ref={milestones}
          className="hub-link nav-link"
          onClick={activeTab}
        >
          <Link to="/hub-milestones">milestones</Link>
        </span>
        <span
          id="hub-trends"
          className="hub-link nav-link"
          ref={trends}
          onClick={activeTab}
          // onClick={() => props.checkMsgStatus("", false, "/hub-milestones")}
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
          element={<Trends getUserSessions={props.getUserSessions} emotionColors={props.emotionColors} />}
        />
      </Routes>
    </Fragment>
  );
};

export default Hub;
