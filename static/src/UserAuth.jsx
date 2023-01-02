import React, { useState, useRef, Fragment } from "react";
import {  Route, Link, Routes, useNavigate } from "react-router-dom";
import { BiShow } from "react-icons/bi";

import Signup from "./Signup.jsx";
import Signout from "./Signout.jsx";
import Login from "./Login.jsx";

const UserAuth = (props) => {
  // const login = useRef();
  // const signup = useRef();
	// const signout = useRef();
	const [isUser, setIsUser] = useState(true);
	const [path, setPath] = useState("login");
	// const [element, setElement] = useState(Login)

  const navigate = useNavigate();


  const cancelForm = () => {
    navigate("/");
  };

  const showLogin = () => {
		navigate("/auth/signup")
  };

  const loginUser = (e, email, password) => {
    e.preventDefault();
    props.getUser(email, password);
    navigate("/");
  };

  if (props.user) {
    return (
			<Fragment>
				<Signout cancelForm={cancelForm} clear={props.clear} signoutClick={props.signoutClick} />
			<Routes>
				<Route path="signout" element={<Signout cancelForm={cancelForm} clear={props.clear} signoutClick={props.signoutClick} />}/>
			</Routes>
			</Fragment>
    );
  }

console.log('Auth props', props)

	return (
		<Fragment>
			<Login getUser={props.getUser} cancelForm={cancelForm} />
			<Routes>
				<Route path='login' element={<Login getUser={props.getUser} cancelForm={cancelForm} />}/>
				<Route path="signup" element={<Signup signupUser={props.signupUser}/>}/>
			</Routes>
		</Fragment>
	)
};

export default UserAuth;