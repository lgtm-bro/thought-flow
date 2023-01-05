import React, { useState, useRef, Fragment } from "react";
import { Route, Link, Routes, useNavigate } from "react-router-dom";
import { BiShow } from "react-icons/bi";

import Signup from "./Signup.jsx";
import Signout from "./Signout.jsx";
import Login from "./Login.jsx";

const UserAuth = ({ user, getUser, showAlert, clear, signupUser }) => {
  const [isUser, setIsUser] = useState(true);
  const [path, setPath] = useState("login");

  const navigate = useNavigate();

  const cancelForm = () => {
    navigate("/");
  };

  const showLogin = () => {
    navigate("/auth/signup");
  };


  if (user) {
    return (
      <Fragment>
        <Signout cancelForm={cancelForm} clear={clear} />
        <Routes>
          <Route
            path="signout"
            element={
              <Signout
                cancelForm={cancelForm}
                clear={clear}
              />
            }
          />
        </Routes>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Login getUser={getUser} cancelForm={cancelForm} />
      <Routes>
        <Route
          path="login"
          element={
            <Login
              getUser={getUser}
              showAlert={showAlert}
              cancelForm={cancelForm}
            />
          }
        />
        <Route
          path="signup"
          element={<Signup signupUser={signupUser} showAlert={showAlert} />}
        />
      </Routes>
    </Fragment>
  );
};

export default UserAuth;
