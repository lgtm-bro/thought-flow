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
import Message from "./Message.jsx";
import ConfirmModal from "./ConfirmModal.jsx";
import Feelings from "./Feelings.jsx";
import Entry from "./Entry.jsx";
import Hub from "./Hub.jsx";
import MilestoneForm from "./MilestoneForm.jsx";
import Quote from "./Quote.jsx";

const Home = ({ user, showAlert }) => {
  const [feeling, setFeeling] = useState(sessionStorage.getItem("feeling"));
  const [feelingScore, setFeelingScore] = useState();
  const [posts, setPosts] = useState([]);
  const [milestones, setMilestones] = useState([]);
  const [userMsg, setUserMsg] = useState();
  const [userMsgQuestion, setUserMsgQuestion] = useState(false);
  const [userMsgPath, setUserMsgPath] = useState();
  const [userMsgLinkText, setUserMsgLinkText] = useState();
  const [sendToEntry, setSendToEntry] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const emotionsColors = {
    happy: "rgba(255, 99, 132, 0.5)",
    anticipation: "rgba(54, 162, 235, 0.5)",
    surprised: "rgba(255, 206, 86, 0.5)",
    bad: "rgba(75, 192, 192, 0.5)",
    fearful: "rgba(153, 102, 255, 0.5)",
    angry: "rgba(255, 159, 64, 0.5)",
    disgust: "rgba(192, 246, 163, 0.5)",
    sad: "rgba(213, 245, 255, 0.8)",
  };

  const userId = sessionStorage.getItem("userId");

  const config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };

  useEffect(() => {
    getPosts(userId);
    getMilestones(user);
    checkMsgStatus();
  }, []);

  useEffect(() => {
    getPosts(userId);
    checkMsgStatus();
  }, [user]);

  useEffect(() => {
    checkMsgStatus();
  }, [feeling]);

  /******** USER MESSAGES *********/
  const changeMsg = (
    msg,
    hasQuestion = false,
    path = "!",
    linkText = "Yes"
  ) => {
    setUserMsg(msg);
    setUserMsgQuestion(hasQuestion);
    setUserMsgLinkText(linkText);
    setUserMsgPath(path);
  };

  const checkMsgStatus = () => {
    if (feeling) {
      changeMsg("Would like to write about it? ", true, "/entry");
    } else if (user) {
      changeMsg("How are you feeling?");
    } else {
      changeMsg("create an account or login to get started");
    }
  };

  /********** FEELINGS ***********/
  const getFeeling = (f) => {
    axios.get(`/third_emotion/${f}`).then((results) => {
      changeMsg("Would like to write about it? ", true, "/entry");
      setFeeling(results.data.name);
      setFeelingScore(results.data.score);
      if (sendToEntry) navigate("/entry");
    });
  };

  const sendFeeling = (feeling) => {
    setFeeling(feeling);
  };

  /********** GREETING ***********/

  /********** POST ENTRY ***********/
  const showHome = (el) => {
    navigate("/");
  };

  const getPosts = (userId) => {
    if (userId) {
      axios
        .get(`/posts/${userId}`)
        .then((results) => {
          setPosts(results.data);
          checkMsgStatus();
        })
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
        getPosts(userId);
        setSendToEntry(false);
        navigate("/");
      })
      .catch((err) => console.log("POST err", err));
  };

  const updateEntry = (id, newEntry) => {
    const entry = { newEntry };

    axios
      .put(`/posts/update/${id}`, entry, config)
      .then((res) => {
        console.log(res.data);
        getPosts(userId);
      })
      .catch((err) => showAlert(err.response.data.msg));
  };

  /********** JOURNAL ***********/
  const deletePost = (id) => {
    // const data = { data: { id } }
    axios
      .delete(`/posts/delete/${id}`)
      .then((results) => {
        console.log(results);
        getPosts(userId);
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
        checkMsgStatus();
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  const getQuote = async (keyword = "inspirational") => {
    return await axios
      .get(`/quote/${keyword}`)
      .then((res) => res.data)
      .catch((err) => console.log(err));
  };

  const getQuote2 = async () => {
    try {
      return await axios.get("/new-quote", config);
    } catch (err) {
      console.log(err.response.data.msg);
    }
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

  /********** USER SESSIONS ***********/
  const getUserSessions = async (userId) => {
    try {
      return await axios.get(`/sessions/${userId}`);
    } catch (err) {
      console.log(err.response.data.msg);
    }
  };

  return (
    <div id="home-container" className="mt-3">
      <div
        id="home-all"
        className="row justify-content-evenly justify-content-lg-around gx-5 gx-lg-0"
      >
        <div
          id="home-main"
          className="col-12 col-md-5 col-lg-4 mt-0 mt-md-5 ms-md-3 ms-lg-4"
        >
          <div id="msg-center" className="p-3 mt-3 mx-auto shadow-sm rounded">
            <div id="greet-wrapper" className="fs-5 my-1 pe-md-5 pe-lg-1">
              <Greet
                feeling={feeling}
                user={user}
                sendFeeling={setFeeling}
                checkMsgStatus={checkMsgStatus}
              />
            </div>
            <div
              id="user-msg-wrapper"
              className="my-1 fs-6 fs-5 ps-3 text-center text-md-start"
            >
              {userMsg && (
                <Message
                  msg={userMsg}
                  hasQuestion={userMsgQuestion}
                  linkText={userMsgLinkText}
                  path={userMsgPath}
                  changeMsg={changeMsg}
                />
              )}
            </div>
          </div>
          {(location.pathname.includes("hub") || location.pathname === "/") &&
            user &&
            !feeling && (
              <Feelings
                user={user}
                showHome={showHome}
                feeling={getFeeling}
                sendToEntry={sendToEntry}
              />
            )}
          {(location.pathname.includes("hub") || location.pathname === "/") &&
            feeling && <Quote getQuote={getQuote2} />}
        </div>
        {(location.pathname.includes("hub") || location.pathname === "/") && (
          <div
            id="hub-wrapper"
            className="col-12 col-md-6 mx-5 ms-md-0 me-md-5 shadow rounded"
          >
            <Hub
              feeling={feeling}
              posts={posts}
              milestones={milestones}
              checkMsgStatus={checkMsgStatus}
              changeMsg={changeMsg}
              deletePost={deletePost}
              updateEntry={updateEntry}
              updateMilestone={updateMilestone}
              deleteMilestone={deleteMilestone}
              getUserSessions={getUserSessions}
              setSendToEntry={setSendToEntry}
            />
          </div>
        )}
      </div>

      <Routes>
        <Route
          path="/confirm"
          element={<ConfirmModal sendFeeling={setFeeling} />}
        />
        <Route
          path="/feelings"
          element={
            <Feelings
              user={user}
              colors={emotionsColors}
              feeling={getFeeling}
              showAlert={showAlert}
              showHome={showHome}
              sendToEntry={sendToEntry}
            />
          }
        />
        <Route
          path="/entry/*"
          element={
            <Entry
              feeling={feeling}
              feelingScore={feelingScore}
              submitEntry={submitEntry}
              setSendToEntry={setSendToEntry}
              checkMsgStatus={checkMsgStatus}
            />
          }
        />
        <Route
          path="/milestone"
          element={
            <MilestoneForm
              getQuote={getQuote2}
              submitMilestone={submitMilestone}
              checkMsgStatus={checkMsgStatus}
            />
          }
        />
        <Route path="/quote" element={<Quote />} />
      </Routes>
    </div>
  );
};

export default Home;
