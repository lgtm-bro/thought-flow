import React, { useEffect, useState, useRef, Fragment } from "react";
import axios from "axios";
import Entry from "./Entry.jsx";
import Feelings from "./Feelings.jsx";
import ProgressBar from "./ProgressBar.jsx";
import Journal from "./Journal.jsx";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import Nav from "./Nav.jsx";
import Greet from "./Greet.jsx";

const App = (props) => {
  const [feeling, setFeeling] = useState();
  const [feelingScore, setFeelingScore] = useState();
  const [user, setUser] = useState(sessionStorage.getItem('user'));
  const [milestones, setMilestones] = useState([]);
  const [posts, setPosts] = useState([]);

  const feels = useRef();
  const entry = useRef();
  const login = useRef();
  const signup = useRef();

  useEffect(() => {
    if (user) {
      sessionStorage.setItem("user", user);
    }
    getMilestones(user);
    getPosts(user);
  }, [user])

  useEffect(() => {
    if (feeling) {
      console.log(feeling);
    }
  }, [feeling]);

  useEffect(() => {
    getMilestones(user);
  }, []);

  useEffect(() => {
    getPosts(user);
  }, []);

  useEffect(() => {
    clickOffModal();
  }, []);

  const hideFeels = () => {
    feels.current.classList.add("hide");
  };

  const showEntryForm = (el) => {
    entry.current.classList.remove("hide");
  };

  const getFeeling = (f) => {
    axios
      .get(`/third_emotion/${f}`)
      .then((results) => {
        setFeeling(results.data.name);
        setFeelingScore(results.data.score);
      })
  };

  const clickOffModal = () => {
    document.getElementById('root').addEventListener('click', (e) => {
      if (((!login.current.contains(e.target)) && (!signup.current.contains(e.target)))
      && (!e.target.classList.contains('login'))) {
        login.current.classList.add("hide");
        signup.current.classList.add("hide");
      }
    })
  }

  const showLogin = () => {
    login.current.classList.remove('hide');
    signup.current.classList.add('hide');

    clickOffModal();

  }

  const showSignup = () => {
    login.current.classList.add('hide');
    signup.current.classList.remove('hide');

    // clickOffModal();
  }

  const showHome = () => {
    feels.current.classList.remove("hide");
    entry.current.classList.add("hide");
    document.getElementById("base").selectedIndex = 0;
    document.getElementById("second-container").classList.add("hide");
    document.getElementById("third-container").classList.add("hide");
  }

  const signOut = () => {
    showHome();
    setFeeling('');
  }

  const getUser = (email, password) => {
    axios.get(`/users/${email}?password=${password}`)
      .then(result => {
        setUser(result.data.name);
      }
    )
    .catch(err => console.log(err.response.data.msg))
  }

  const updateUser = (user) => {
    if (user) {
      setUser(user);
    } else {
      sessionStorage.removeItem("user");
      setUser(sessionStorage.getItem('user'));
    }
  }

  const signupUser = (name, email, password) => {
    const user = {"name": name, "email": email, "password": password};
    const config = { headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'}
    }
    axios.post("/signup", user, config)
      .then(results => {
        console.log(results.data)
        setUser(name);
      })
      .catch(err => console.log(err))
  }

  const getMilestones = (name) => {
    console.log('milestones', user, name)
    if (name) {
      axios
      .get(`/milestones/${name}`)
      .then((results) => setMilestones(results.data))
      .catch((err) => console.log(err))
    } else {
      setMilestones([]);
    }
  };

  const getPosts = (name) => {
    console.log('posts', user, name)
    if (name) {
      axios
      .get(`/posts/${name}`)
      .then((results) => setPosts(results.data))
      .catch((err) => console.log(err))
    } else {
      setPosts([]);
    }
  }

  const hideModal = () => {
    login.current.classList.add("hide");
    signup.current.classList.add("hide");
  }


  return (
    <div id="app-wrapper">
      <div id="nav-wrapper">
        <Nav user={user} showLogin={showLogin}
             showHome={showHome}
        />
      </div>
      <br />
      <h1>ThoughtFlow</h1>
      <div id="greet-wrapper">
        <Greet feeling={feeling} user={user}/>
      </div>
      {milestones[0] && <div id="progress-bar-wrapper">
        <ProgressBar milestones={milestones}/>
      </div>}
      <div ref={feels} id="feelings_wrapper">
        <Feelings
          hide={hideFeels}
          show={showEntryForm}
          feeling={getFeeling}/>
      </div>
      <div ref={entry} id="entry-wrapper" className="hide">
        <Entry feeling={feeling} />
      </div>
      <div id="journal-wrapper">
        <Journal posts={posts}/>
      </div>
      <div id="signup-wrapper" className="hide" ref={signup}>
        <Signup signupUser={signupUser}
                showLogin={showLogin}
                hide={hideModal}
        />
      </div>
      <div id="login-wrapper" className="hide" ref={login} login={login}>
        <Login user={user}
               getUser={getUser}
               updateUser={updateUser}
               showSignup={showSignup}
               hide={hideModal}
               clear = {signOut}
        />
      </div>
    </div>
  );
};

export default App;
