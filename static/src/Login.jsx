import React, { useState, useRef, Fragment } from "react";
import Signup from "./Signup.jsx";
import { BiShow } from "react-icons/bi";

const Login = (props) => {
  const email = useRef();
  const password = useRef();
  const form = useRef();
  const cancel = useRef();
  const signout = useRef();
	const login = useRef();
  const signup = useRef();

  const [msg, setMsg] = useState("");

  const loginUser = (e) => {
    e.preventDefault();
    props.getUser(email.current.value, password.current.value);
    form.current.reset();
    props.hide();
  };

  const signoutUser = () => {
    props.updateUser("");
    cancel.current.classList.add("hide");
    signout.current.classList.add("hide");
    setMsg("You have signed out");
    props.loginClick();
    props.hide();
    props.clear();
  };

  const cancelSignout = () => {
    props.hide();
  };

	const showSignup = () => {
    form.current.reset();
    login.current.classList.add('hide');
    signup.current.classList.remove('hide');
    props.signupClick();
  }

	const showLogin = () => {
    login.current.classList.remove('hide');
    signup.current.classList.add('hide');
    props.loginClick();
  }

  const showPassword = () => {
    if (password.current.type === 'password') {
      password.current.type = 'text';
    } else {
      password.current.type = 'password';
    }
  }

  if (props.user) {
    props.signoutClick();
    return (
      <Fragment>
        <h3>Are you sure you want to sign out?</h3>
        <button ref={cancel} onClick={props.hide}>
          Cancel
        </button>
        <button ref={signout} onClick={signoutUser}>
          Sign Out
        </button>
        {msg && <div>{msg}</div>}
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <div id="login-container" ref={login}>
          <h2>Please Log in</h2>
          <h4>
            Don't have account?
            <a href="#signup-wrapper" onClick={showSignup}>
              Sign Up
            </a>
          </h4>
          <form action="#" ref={form} onSubmit={loginUser}>
            <label htmlFor="login-email">
              <span className="login-label">Email: </span>
              <input type="text"
                     name="login-email"
                     required
                     ref={email}
              />
            </label>
            <br />
            <br />
            <label htmlFor="login-password">
              <span className="login-label">Password: </span>
              <input type="password"
                     name="login-password"
                     required
                     ref={password}
              />
              <span className="eye" onClick={showPassword}>
                <BiShow />
              </span>
            </label>
            <br />
            <br />
            <button onClick={props.hide}>Cancel</button>
            <input type="submit" value="Log in" id="login-btn" />
          </form>
        </div>
        <div id="signup-container" ref={signup} className="hide">
          <Signup showLogin={showLogin}
									signupUser={props.signupUser}
									hide={props.hide}
					/>
        </div>
      </Fragment>
    );
  }
};

export default Login;
