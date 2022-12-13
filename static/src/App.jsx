import React, { useEffect, useState, useRef, Fragment } from "react";
import axios from "axios";
import Entry from "./Entry.jsx";
import Feelings from "./Feelings.jsx";
import ProgressBar from "./ProgressBar.jsx";
import Journal from "./Journal.jsx";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import Nav from "./Nav.jsx";


const App = (props) => {
  const [feeling, setFeeling] = useState();
  const [user, setUser] = useState();
  const feels = useRef();
  const entry = useRef();
  const login = useRef();
  const signup = useRef();

  useEffect(() => {
    if (feeling) {
      console.log(feeling.name, feeling.score);
    }
  }, [feeling]);

  useEffect(() => {
      hideModal();
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
      .then((results) => setFeeling(results.data));
  };

  const hideModal = () => {
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

    hideModal();

  }

  const showSignup = () => {
    login.current.classList.add('hide');
    signup.current.classList.remove('hide');

    // hideModal();
  }

  const showHome = () => {
    feels.current.classList.remove("hide");
    entry.current.classList.add("hide");
  }

  const getUser = (email, password) => {
    axios.get(`/users/${email}?password=${password}`)
      .then(result => {
        sessionStorage.setItem("user", result.data.name);
        setUser(result.data)
      }
    )
    .catch(err => console.log(err.response.data.msg))
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
        sessionStorage.setItem("user", name)
      })
      .catch(err => console.log(err))
  }


  return (
    <div id="app-wrapper">
      <div id="nav-wrapper">
        <Nav showLogin={showLogin} showHome={showHome}/>
      </div>
      <br />
      <h1>ThoughtFlow</h1>
      <ProgressBar />
      <div ref={feels} id="feelings_wrapper">
        <Feelings
          hide={hideFeels}
          show={showEntryForm}
          feeling={getFeeling}/>
      </div>
      <div ref={entry} id="entry-wrapper" className="hide">
        <Entry feeling={feeling} />
      </div>
      <Journal />
      <div id="signup-wrapper" className="hide" ref={signup}>
        <Signup signupUser={signupUser} showLogin={showLogin}/>
      </div>
      <div id="login-wrapper" className="hide" ref={login} login={login}>
        <Login getUser={getUser} showSignup={showSignup} />
      </div>
    </div>
  );
};

export default App;
