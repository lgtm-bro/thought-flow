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
  const navigate = useNavigate();
  const location = useLocation();

  const [currTab, setCurrTab] = useState(location.pathname.slice(5) || 'journal');

  const journalEntries = useRef();
  const milestoneEntries = useRef();
  const journal = useRef();
  const milestones = useRef();
  const trends = useRef();

  const hubTabs = [journal, milestones, trends];
  const activeColor = "#e88686";
  const activeBg = "#37a9c926";
  const defaultColor = "#606060";
  const defaultBg = "#fffdf9e9";
  const defaultMsg =
    "First, let's indentify how you feel about this experience ";

  useEffect(() => {
    setCurrTab(location.pathname.slice(5) || 'journal');
  }, [location.pathname])

  useEffect(() => {
    let tab =
      hubTabs.find(t => t.current.innerText === currTab);
    changeActiveTab(null, tab.current)
  }, [currTab]);


  const changeActiveTab = (e, el) => {
    let parent, child;

    if (e) {
      parent = e.target.parentNode;
    } else {
      parent = el;

    }

    parent.classList.add("active", "hub-active");

    hubTabs.forEach((t) => {
      if (parent !== t.current) {
        t.current.classList.remove("active", "hub-active");
      }
    });

    props.checkMsgStatus();

  };

  const recordTrendClick = (e) => {
    if (sessionStorage.getItem("user")) sessionStorage.setItem("trend", true)
    changeActiveTab(e);
  }

  const sendFeelingMsg = (msg, hasQ, path = "/") => {
    props.changeMsg(msg, hasQ, path);
  };


  return (
    <Fragment>
      <nav id="hub-nav" className="nav nav-tabs rounded">
        <span
          id="hub-journal"
          className="hub-link nav-link"
          ref={journal}
          onClick={changeActiveTab}
        >
          <Link to="/">journal</Link>
        </span>
        <span
          id="hub-milestones"
          ref={milestones}
          className="hub-link nav-link"
          onClick={changeActiveTab}
        >
          <Link to="/hub-milestones">milestones</Link>
        </span>
        <span
          id="hub-trends"
          className="hub-link nav-link"
          ref={trends}
          onClick={recordTrendClick}
          // onClick={changeActiveTab}
        >
          <Link to="/hub-trends">trends</Link>
        </span>
      </nav>
      <div id="hub-content" className="container-fluid">
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
            element={
              <Trends
                getUserSessions={props.getUserSessions}
                emotionColors={props.emotionColors}
              />
            }
          />
        </Routes>
      </div>
    </Fragment>
  );
};

export default Hub;
