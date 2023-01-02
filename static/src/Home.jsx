import React, { useEffect, useState, useRef, Fragment } from "react";
import axios from "axios";
import { DateTime } from "luxon";
import { BrowserRouter } from "react-router-dom";
import { Route, Link, Routes } from "react-router-dom";

import Entry from "./Entry.jsx";
import Feelings from "./Feelings.jsx";
import Hub from "./Hub.jsx";
import MilestoneBar from "./MilestoneBar.jsx";
import Milestone from "./Milestone.jsx";
import Journal from "./Journal.jsx";
import Greet from "./Greet.jsx";
import Quote from "./Quote.jsx";


const Home = ({user, milestones, posts}) => {
  const [feeling, setFeeling] = useState();
  const [feelingScore, setFeelingScore] = useState();


  const feels = useRef();
  const greet = useRef();
  const entry = useRef();
  const hub = useRef();
  const milestone = useRef();


  // useEffect(() => {
  //   getMilestones(user);
  //   getPosts(user);
  // }, [user]);

  // useEffect(() => {
  //   getMilestones(user);
  // }, []);

  // useEffect(() => {
  //   getPosts(user);
  // }, []);

  /******** CHANGE DISPLAY ********/

  const clearProfile = () => {
    document.getElementById("profile-form").reset();
  };

  const showHome = () => {
  //   feels.current.classList.remove("hide");
  //   hub.current.classList.remove("hide");
  //   greet.current.classList.remove("hide");
  //   entry.current.classList.add("hide");
  //   milestone.current.classList.add("hide");
  //   // profile.current.classList.add("hide");
  //   document.getElementById("base").selectedIndex = 0;
  //   document.getElementById("second-container").classList.add("hide");
  //   document.getElementById("third-container").classList.add("hide");
  //   setFeeling();
  //   clearProfile();
  };

  /********** USER ***********/

  /******** LOGIN / SIGNUP ********/

  /********** SIGNOUT ***********/

  /********** FEELINGS ***********/
  const hideFeels = () => {
    feels.current.classList.add("hide");
  };

  const getFeeling = (f) => {
    axios.get(`/third_emotion/${f}`).then((results) => {
      setFeeling(results.data.name);
      setFeelingScore(results.data.score);
    });
  };

  /********** POST ENTRY ***********/
  const showEntryForm = (el) => {
    entry.current.classList.remove("hide");
  };

  const getPosts = (name) => {
    if (name) {
      axios
        .get(`/posts/${name}`)
        .then((results) => props.setPosts(results.data))
        .catch((err) => console.log(err));
    } else {
      props.setPosts([]);
    }
  };

  const submitEntry = (e, entry, guided) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };

    const post = {
      user: user,
      date: DateTime.now().toISO(),
      entry: entry,
      guided: guided,
    };

    axios
      .post("/posts", post, config)
      .then((results) => {
        getPosts(user);
        showMilestone();
      })
      .catch((err) => console.log("POST err", err));
  };


  const clearEntry = () => {
    if (entry.current) {
      if (entry.current.classList.contains("hide")) {
        document.getElementById("entry-form").reset();
        // document.getElementById("guided-form").reset();
        // document.getElementById("solo-form").reset();
        // document.getElementById("guided-entry-form").classList.add('hide');
        // document.getElementById("solo-entry-form").classList.add('hide');
      }
    }
  };

  const updateEntry = (id, newEntry) => {
    const entry = { newEntry };

    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };

    axios
      .put(`/posts/update/${id}`, entry, config)
      .then((res) => console.log(res.data))
      .catch((err) => alert(err.response.data.msg));
  };

  /********** JOURNAL ***********/
  const deletePost = (id) => {
    // const data = { data: { id } }
    axios
      .delete(`/posts/delete/${id}`)
      .then((results) => {
        console.log(results);
        getPosts(user);
      })
      .catch((err) => console.log(err));
  };

  /********** MILESTONES ***********/
  const getMilestones = (name) => {
    if (name) {
      axios
        .get(`/milestones/${name}`)
        .then((results) => props.setMilestones(results.data))
        .catch((err) => console.log(err));
    } else {
      setMilestones([]);
    }
  };

  const submitMilestone = (title, details = null) => {
    const milestone = {
      title: title,
      details: details,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };

    axios
      .post(`/milestones/${user}`, milestone, config)
      .then((res) => {
        console.log(res.data);
        getMilestones(user);
      })
      .catch((err) => console.log(err));
  };


  const showMilestone = () => {
    entry.current.classList.add("hide");
    milestone.current.classList.remove("hide");
  };

  const getQuote = async (keyword = "inspirational") => {
    return await axios
      .get(`/quote/${keyword}`)
      .then((res) => res.data)
      .catch((err) => console.log(err));
  };

  const addMilestoneClick = () => {
    feels.current.classList.add("hide");
    showMilestone();
  };

  /********** PROFILE ***********/





  return (
    <div id="home-wrapper">
      <h1>ThoughtFlow</h1>
      <br />
      <div id="greet-wrapper" ref={greet}>
        <Greet feeling={feeling} user={user} />
      </div>
      <div ref={feels} id="feelings-wrapper">
        <Feelings
          user={user}
          hide={hideFeels}
          show={showEntryForm}
          feeling={getFeeling}
        />
      </div>
      <div ref={entry} id="entry-wrapper" className="hide">
        <Entry
          feeling={feeling}
          feelingScore={feelingScore}
          submitEntry={submitEntry}
          showHome={showHome}
        />
      </div>
      <div id="hub-wrapper" ref={hub}>
        <Hub
          posts={posts}
          milestones={milestones}
          addMilestoneClick={addMilestoneClick}
          deletePost={deletePost}
          updateEntry={updateEntry}
        />
      </div>
      <div id="milestone-wrapper" ref={milestone} className={"hide"}>
        <Milestone getQuote={getQuote} submitMilestone={submitMilestone} />
      </div>
    </div>
  );
};

export default Home;
