import React, { useEffect, useState, useRef, Fragment } from "react";
import axios from "axios";
import { DateTime } from "luxon";
import { Route, Link, Routes, Navigate } from "react-router-dom";

import index from "./index.jsx";
import Home from "./Home.jsx";
import Entry from "./Entry.jsx";
import Feelings from "./Feelings.jsx";
import Hub from "./Hub.jsx";
import MilestoneBar from "./MilestoneBar.jsx";
import Journal from "./Journal.jsx";
import Login from "./Login.jsx";
import UserAuth from "./UserAuth.jsx";
import Signup from "./Signup.jsx";
import NavBar from "./NavBar.jsx";
import Greet from "./Greet.jsx";
import Milestone from "./Milestone.jsx";
import Quote from "./Quote.jsx";
import Profile from "./Profile.jsx";

const App = (props) => {
  const [feeling, setFeeling] = useState();
  const [feelingScore, setFeelingScore] = useState();
  const [user, setUser] = useState(sessionStorage.getItem("user"));
  const [email, setEmail] = useState(sessionStorage.getItem("email"));
  const [milestones, setMilestones] = useState([]);
  const [posts, setPosts] = useState([]);

  const feels = useRef();
  const greet = useRef();
  const entry = useRef();
  const milestone = useRef();
  const hub = useRef();
  const login = useRef();
  const profile = useRef();

  useEffect(() => {
    if (user) {
      sessionStorage.setItem("user", user);
      sessionStorage.setItem("email", email);
    }
    getMilestones(user);
    getPosts(user);
  }, [user]);

  useEffect(() => {
    getMilestones(user);
  }, []);

  useEffect(() => {
    getPosts(user);
  }, []);

  /******** CHANGE DISPLAY ********/
  const loginClick = () => {
    // login.current.classList.remove("signup-click");
    // login.current.classList.remove("signout-click");

    if (document.getElementById("signup-container")) {
      document.getElementById("login-container").classList.remove("hide");
    }

    if (document.getElementById("signup-container")) {
      document.getElementById("signup-container").classList.add("hide");
    }
  };

  const hideModal = () => {
    // login.current.classList.add("hide");
  };

  const clickOffModal = (e) => {
    // if (e) {
    //   if (
    //     !login.current.contains(e.target) &&
    //     !e.target.classList.contains("login")
    //   ) {
    //     login.current.classList.add("hide");
    //   }
    // }
  };

  const clearProfile = () => {
    document.getElementById("profile-form").reset();
  };

  const showHome = () => {
    // feels.current.classList.remove("hide");
    // hub.current.classList.remove("hide");
    // greet.current.classList.remove("hide");
    // entry.current.classList.add("hide");
    // milestone.current.classList.add("hide");
    // profile.current.classList.add("hide");
    // document.getElementById("base").selectedIndex = 0;
    // document.getElementById("second-container").classList.add("hide");
    // document.getElementById("third-container").classList.add("hide");
    setFeeling();
    // clearProfile();
  };

  /********** USER ***********/
  const getUser = (email, password) => {
    axios
      .get(`/users/${email}?password=${password}`)
      .then((result) => {
        setUser(result.data.name);
        setEmail(email);
      })
      .catch((err) => {
        alert(err.response.data.msg);
        return err;
      });
  };

  const updateUser = (user) => {
    if (user) {
      setUser(user);
    } else {
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("email");
      setUser(null);
      setEmail(null);
    }
  };

  /******** LOGIN / SIGNUP ********/
  const signupClick = () => {
    // login.current.classList.add("signup-click");
  };

  const showLogin = () => {
    // login.current.classList.remove("hide");
  };

  const signupUser = (name, email, password) => {
    const user = { name: name, email: email, password: password };
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    axios
      .post("/signup", user, config)
      .then((results) => {
        console.log("results", results.data);
        setUser(results.data.user);
        setEmail(results.data.email);
      })
      .catch((err) => console.log(err));
  };

  /********** SIGNOUT ***********/
  const signOut = () => {
    // showHome();
    setFeeling("");
    updateUser("");
    setEmail("");
    // loginClick();
  };

  const signoutClick = () => {
    // if (login.current) {
    //   login.current.classList.add("signout-click");
    // }
  };

  /********** FEELINGS ***********/
  // const hideFeels = () => {
  //   feels.current.classList.add("hide");
  // };

  const getFeeling = (f) => {
    axios.get(`/third_emotion/${f}`).then((results) => {
      setFeeling(results.data.name);
      setFeelingScore(results.data.score);
    });
  };

  /********** POST ENTRY ***********/
  // const showEntryForm = (el) => {
  //   entry.current.classList.remove("hide");
  // };

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

  // const clearEntry = () => {
  //   if (entry.current) {
  //     if (entry.current.classList.contains("hide")) {
  //       document.getElementById("entry-form").reset();
  //       // document.getElementById("guided-form").reset();
  //       // document.getElementById("solo-form").reset();
  //       // document.getElementById("guided-entry-form").classList.add('hide');
  //       // document.getElementById("solo-entry-form").classList.add('hide');
  //     }
  //   }
  // };

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

  // const showMilestone = () => {
  //   entry.current.classList.add("hide");
  //   milestone.current.classList.remove("hide");
  // };

  const getQuote = async (keyword = "inspirational") => {
    return await axios
      .get(`/quote/${keyword}`)
      .then((res) => res.data)
      .catch((err) => console.log(err));
  };

  // const addMilestoneClick = () => {
  //   feels.current.classList.add("hide");
  //   showMilestone();
  // };

  /********** PROFILE ***********/
  const showProfile = () => {
    if (user) {
      // profile.current.classList.remove("hide");
      // feels.current.classList.add("hide");
      // entry.current.classList.add("hide");
      // hub.current.classList.add("hide");
      // login.current.classList.add("hide");
      // greet.current.classList.add("hide");
      // clearEntry();
    } else {
      return alert("You must Login to view Profile");
    }
  };

  const updateProfile = (name, profEmail, cp, np) => {
    let userInfo;

    if (profEmail === email) {
      userInfo = {
        name: name,
        currentPassword: cp,
        newPassword: np,
        newEmail: null,
      };
    } else {
      userInfo = {
        name: name,
        currentPassword: cp,
        newPassword: np,
        newEmail: profEmail,
      };
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };

    axios
      .put(`/update_user/${email}`, userInfo, config)
      .then((res) => {
        console.log(res);
        setUser(name);
        if (profEmail) {
          setEmail(profEmail);
        }
      })
      .catch((err) => alert(err.response.data.msg));
  };

  // let profilePath = user ? "/profile" : "/";
  let profileElement = user ? Profile : Home;

  return (
    <div id="app-wrapper" onClick={clickOffModal}>
      <div id="nav-wrapper">
        <NavBar
          user={user}
          showLogin={showLogin}
          showProfile={showProfile}
          loginClick={loginClick}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Home
              user={user}
              milestones={milestones}
              posts={posts}
              setPosts={setPosts}
              setMilestones={setMilestones}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <Profile
                user={user}
                email={email}
                hide={showHome}
                updateProfile={updateProfile}
              />
            }
          />
          <Route path="/about" element={<Navigate to="/" />} />
          <Route
            path="/auth/*"
            element={
              <UserAuth
                user={user}
                getUser={getUser}
                updateUser={updateUser}
                clear={signOut}
                // signupClick={signupClick}
                // loginClick={loginClick}
                signupUser={signupUser}
                signoutClick={signoutClick}
              />
            }
          >
            {/* <Route
              path="/auth/login"
              element={<Login getUser={getUser}/>}
            />
            <Route
              path="/auth/signup"
              element={<Signup signupUser={signupUser} />}
            /> */}
          </Route>
          {/* <Route path="/*" element={<index />} /> */}
        </Routes>
      </div>
      <br />
      <br />
      {/* <h1>ThoughtFlow</h1>
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
      </div>*/}
    </div>
  );
};

export default App;
