import React, { useEffect, useState, useRef, Fragment } from "react";
import axios from "axios";
import { DateTime } from "luxon";
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
import MilestoneForm from "./MilestoneForm.jsx";
import Quote from "./Quote.jsx";

const Home = ({ user, showAlert }) => {
  const [feeling, setFeeling] = useState();
  const [feelingScore, setFeelingScore] = useState();
  const [posts, setPosts] = useState([]);
  const [milestones, setMilestones] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  const config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };

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

  const submitEntry = (entry, guided) => {
    const post = {
      user: user,
      date: DateTime.now().toISO(),
      entry: entry,
      guided: guided,
    };

    axios
      .post("/posts", post, config)
      .then((results) => {
        console.log(results.data);
        getPosts(user);
        navigate("/");
      })
      .catch((err) => console.log("POST err", err));
  };

  const updateEntry = (id, newEntry) => {
    const entry = { newEntry };

    axios
      .put(`/posts/update/${id}`, entry, config)
      .then((res) => console.log(res.data))
      .catch((err) => showAlert(err.response.data.msg));
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

  const submitMilestone = (title) => {
    axios
      .post(`/milestones/${user}`, { title }, config)
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

  const updateMilestone = (id, text) => {
    axios
      .put(`/milestone/${id}`, { text }, config)
      .then((res) => {
        console.log(res.data);
        getMilestones(user);
      })
      .catch((err) => console.log(err));
  };

  const deleteMilestone = (id) => {
    axios
      .delete(`/milestone/${id}`)
      .then((res) => {
        console.log(res.data);
        getMilestones(user);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div id="home-wrapper">
      <h1>ThoughtFlow</h1>
      <br />
      <div id="greet-wrapper">
        <Greet feeling={feeling} user={user} />
      </div>
      {!feeling && (
        <div id="feelings-wrapper">
          <Feelings user={user} showHome={showHome} feeling={getFeeling} />
        </div>
      )}
      {location.pathname === "/" && feeling && <Quote getQuote={getQuote} />}
      <div id="hub-wrapper">
        <Hub
          feeling={feeling}
          posts={posts}
          milestones={milestones}
          showMilestone={showMilestone}
          deletePost={deletePost}
          updateEntry={updateEntry}
          updateMilestone={updateMilestone}
          deleteMilestone={deleteMilestone}
        />
      </div>

      <Routes>
        <Route
          path="feelings"
          element={
            <Feelings user={user} showHome={showHome} feeling={getFeeling} />
          }
        ></Route>
        <Route
          path="entry"
          element={
            feeling && (
              <Entry
                feeling={feeling}
                feelingScore={feelingScore}
                submitEntry={submitEntry}
              />
            )
          }
        />
        {/* <Route
          path="/hub/"
          element={
            <Hub
              feeling={feeling}
              posts={posts}
              milestones={milestones}
              showMilestone={showMilestone}
              deletePost={deletePost}
              updateEntry={updateEntry}
              updateMilestone={updateMilestone}
              deleteMilestone={deleteMilestone}
            />
          }
        /> */}
        <Route
          path="milestone"
          element={
            <MilestoneForm
              getQuote={getQuote}
              submitMilestone={submitMilestone}
            />
          }
        />
        <Route path="quote" element={<Quote />} />
      </Routes>
    </div>
  );
};

export default Home;
