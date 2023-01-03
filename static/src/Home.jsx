import React, { useEffect, useState, useRef, Fragment } from "react";
import axios from "axios";
import { DateTime } from "luxon";
import { BrowserRouter } from "react-router-dom";
import {
  Route,
  Link,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";

import Greet from "./Greet.jsx";
import Feelings from "./Feelings.jsx";
import Entry from "./Entry.jsx";
import Hub from "./Hub.jsx";
import Milestone from "./Milestone.jsx";
import Quote from "./Quote.jsx";

const Home = ({ user }) => {
  const [feeling, setFeeling] = useState();
  const [feelingScore, setFeelingScore] = useState();
  const [posts, setPosts] = useState([]);
  const [milestones, setMilestones] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    getPosts(user);
    getMilestones(user);
  }, []);

  useEffect(() => {
    getPosts(user);
  }, [user]);


  /********** FEELINGS ***********/
  const getFeeling = (f) => {
    axios.get(`/third_emotion/${f}`).then((results) => {
      setFeeling(results.data.name);
      setFeelingScore(results.data.score);
    });
  };

  /********** POST ENTRY ***********/
  const showHome = (el) => {
    navigate("/");
  };

  const getPosts = (name) => {
    if (name) {
      axios
        .get(`/posts/${name}`)
        .then((results) => setPosts(results.data))
        .catch((err) => console.log(err));
    } else {
      setPosts([]);
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
        navigate("/")
      })
      .catch((err) => console.log("POST err", err));
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
        .then((results) => setMilestones(results.data))
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
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  const showMilestone = () => {
    navigate("/milestone");
  };

  const getQuote = async (keyword = "inspirational") => {
    return await axios
      .get(`/quote/${keyword}`)
      .then((res) => res.data)
      .catch((err) => console.log(err));
  };


  return (
    <div id="home-wrapper">
      {location.pathname === "/" && <h1>ThoughtFlow</h1>}
      <br />
      {location.pathname === "/" && (
        <div id="greet-wrapper" >
          <Greet feeling={feeling} user={user} />
        </div>
      )}
      {!feeling && <div id="feelings-wrapper">
        <Feelings
          user={user}
          // hide={hideFeels}
          showHome={showHome}
          feeling={getFeeling}
        />
      </div>}
      {location.pathname === "/" && feeling && <Quote getQuote={getQuote}/>}
      {location.pathname === "/" && (
        <div id="hub-wrapper" >
          <Hub
            feeling={feeling}
            posts={posts}
            milestones={milestones}
            showMilestone={showMilestone}
            deletePost={deletePost}
            updateEntry={updateEntry}
          />
        </div>
      )}

      <Routes>
        <Route
          path="feelings"
          element={
            <Feelings
              user={user}
              showHome={showHome}
              feeling={getFeeling}
            />
          }
        ></Route>
        <Route
          path="entry"
          element={
            feeling && <Entry
              feeling={feeling}
              feelingScore={feelingScore}
              submitEntry={submitEntry}
            />
          }
        ></Route>
        <Route
          path="milestone"
          element={
            <Milestone getQuote={getQuote} submitMilestone={submitMilestone} />
          }
        ></Route>
        <Route
          path="quote"
          element={
            <Quote />
          }
        ></Route>
      </Routes>
    </div>
  );
};

export default Home;
