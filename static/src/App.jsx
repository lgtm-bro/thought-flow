import React, { useEffect, useState, useRef, Fragment } from "react";
import axios from "axios";
import { DateTime } from "luxon";

import Entry from "./Entry.jsx";
import Feelings from "./Feelings.jsx";
import Hub from "./Hub.jsx";
import MilestoneBar from "./MilestoneBar.jsx";
import Journal from "./Journal.jsx";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import Nav from "./Nav.jsx";
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
    login.current.classList.remove("signup-click");
    login.current.classList.remove("signout-click");
    document.getElementById('signup-container').classList.add('hide');
    document.getElementById('login-container').classList.remove('hide');
  };

  const hideModal = () => {
    loginClick();
    login.current.classList.add("hide");
  };

  const clickOffModal = (e) => {
    console.log('app click')
    if (e) {
      if (
        !login.current.contains(e.target) &&
        !e.target.classList.contains("login")
      ) {
        login.current.classList.add("hide");
      }
    }
  };

  const clearProfile = () => {
    document.getElementById("profile-form").reset();
  }

  const showHome = () => {
    feels.current.classList.remove("hide");
    hub.current.classList.remove("hide");
    greet.current.classList.remove("hide");
    entry.current.classList.add("hide");
    milestone.current.classList.add("hide");
    profile.current.classList.add("hide");
    document.getElementById("base").selectedIndex = 0;
    document.getElementById("second-container").classList.add("hide");
    document.getElementById("third-container").classList.add("hide");
    setFeeling();
    clearProfile();
  };

  /********** USER ***********/
  const getUser = (email, password) => {
    axios
      .get(`/users/${email}?password=${password}`)
      .then((result) => {
        setUser(result.data.name);
        setEmail(email);
        hideModal();
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
    login.current.classList.add("signup-click");
  };

  const showLogin = () => {
    login.current.classList.remove("hide");
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
        console.log('results', results.data);
        setUser(results.data.user);
        setEmail(results.data.email);
      })
      .catch((err) => console.log(err));
  };

  /********** SIGNOUT ***********/
  const signOut = () => {
    showHome();
    setFeeling("");
    updateUser("");
    setEmail("");
    loginClick();
  };

  const signoutClick = () => {
    if (login.current) {
      login.current.classList.add("signout-click");
    }
  };

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

  const clearEntry = () => {
    if (entry.current) {
      if (entry.current.classList.contains('hide')) {
        document.getElementById("entry-form").reset();
        // document.getElementById("guided-form").reset();
        // document.getElementById("solo-form").reset();
        // document.getElementById("guided-entry-form").classList.add('hide');
        // document.getElementById("solo-entry-form").classList.add('hide');
      }
    }
  }

  /********** JOURNAL ***********/
  const deletePost = (id) => {
    // const data = { data: { id } }
    axios.delete(`/posts/delete/${id}`)
    .then((results) => {
      console.log(results);
      getPosts(user);
    })
    .catch((err) => console.log(err));
  }

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
    feels.current.classList.add('hide');
    showMilestone();
  }

  /********** PROFILE ***********/
  const showProfile = () => {
    if (user) {
      profile.current.classList.remove("hide");
      feels.current.classList.add("hide");
      entry.current.classList.add("hide");
      hub.current.classList.add("hide");
      login.current.classList.add("hide");
      greet.current.classList.add("hide");
      clearEntry();
    } else {
      alert("You must Login to view Profile")
    }
  };

  const updateProfile = (name, profEmail, cp, np) => {
    let userInfo;

    if (profEmail === email) {
      userInfo = {
        name: name,
        currentPassword: cp,
        newPassword: np,
        newEmail: null
      }
    } else {
      userInfo = {
        name: name,
        currentPassword: cp,
        newPassword: np,
        newEmail: profEmail
      }
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };

    axios.post(`/update_user/${email}`, userInfo, config)
      .then(res => {
        console.log(res);
        setUser(name);
        if (profEmail) {
          setEmail(profEmail);
        }
      })
      .catch((err) => console.log(err));
  }


  return (
    <div id="app-wrapper" onClick={clickOffModal}>
      <div id="nav-wrapper">
        <Nav
          user={user}
          showLogin={showLogin}
          showHome={showHome}
          showProfile={showProfile}
          loginClick={loginClick}
        />
      </div>
      <br /><br />
      <h1>ThoughtFlow</h1>
      <div id="greet-wrapper" ref={greet}>
        <Greet feeling={feeling} user={user} />
      </div>
      {/* {milestones[0] && (
        <div id="milestone-bar-wrapper">
          <MilestoneBar milestones={milestones} />
        </div>
      )} */}
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
        />
      </div>
      <div id="milestone-wrapper" ref={milestone} className={"hide"}>
        <Milestone
          getQuote={getQuote}
          submitMilestone={submitMilestone}
        />
      </div>
      <div id="login-wrapper" className="hide" ref={login}>
        <Login
          user={user}
          getUser={getUser}
          updateUser={updateUser}
          signupUser={signupUser}
          hide={hideModal}
          clear={signOut}
          signupClick={signupClick}
          loginClick={loginClick}
          signoutClick={signoutClick}
        />
      </div>
      <div id="profile-wrapper" ref={profile} className="hide">
        <Profile
          user={user}
          email={email}
          hide={showHome}
          updateProfile={updateProfile}
        />
      </div>
    </div>
  );
};

export default App;
