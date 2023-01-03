import React, { useEffect, useState, useRef, Fragment } from "react";
import axios from "axios";
import { DateTime } from "luxon";
import { Route, Link, Routes, Navigate } from "react-router-dom";


import NavBar from "./NavBar.jsx";
import Home from "./Home.jsx";
import Profile from "./Profile.jsx";
import UserAuth from "./UserAuth.jsx";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";


const App = (props) => {
  const [user, setUser] = useState(sessionStorage.getItem("user"));
  const [email, setEmail] = useState(sessionStorage.getItem("email"));

  const login = useRef();
  const profile = useRef();


  useEffect(() => {
    if (user) {
      sessionStorage.setItem("user", user);
      sessionStorage.setItem("email", email);
    }
  }, [user]);


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
    updateUser("");
    setEmail("");
  };

    /********** POSTS ***********/
    const retrievePosts = (posts) => {
      setPosts(posts)
    }

  /********** PROFILE ***********/
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


  return (
    <div id="app-wrapper">
      <div id="nav-wrapper">
        <NavBar
          user={user}
        />
        <Routes>
          <Route
            path="/*"
            element={
              <Home
              user={user}
              // posts={posts}
              // setPosts={retrievePosts}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <Profile
                user={user}
                email={email}
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
                // updateUser={updateUser}
                clear={signOut}
                signupUser={signupUser}
              />
            }
          >
          </Route>
        </Routes>
      </div>
    </div>
  );
};

export default App;
