import React, { useState, useRef, Fragment } from "react";

const Login = (props) => {
  const email = useRef();
  const password = useRef();
  const form = useRef();
  const cancel = useRef();
  const signout = useRef();

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
		props.hide();
  };

  const cancelSignout = () => {
    props.hide();
  };

  if (sessionStorage.getItem("user")) {
    return (
      <Fragment>
        <h2>Are you sure that you want to sign out?</h2>
        <button ref={cancel} onClick={props.hide}>Cancel</button>
        <button ref={signout} onClick={signoutUser}>
          Sign Out
        </button>
        {msg && <div>{msg}</div>}
      </Fragment>
    )
  } else {
    return (
      <Fragment>
        <h2>Please Log in</h2>
        <h4>
          Don't have account?
          <a href="#signup-wrapper" onClick={() => props.showSignup()}>
            Sign Up
          </a>
        </h4>
        <form action="#" ref={form} onSubmit={loginUser}>
          <label htmlFor="login-email">
            <span className="login-label">Email: </span>
            <input type="text" name="login-email" ref={email} />
          </label>
          <br />
          <br />
          <label htmlFor="login-password">
            <span className="login-label">Password: </span>
            <input type="password" name="login-password" ref={password} />
          </label>
          <br />
          <br />
          <input type="submit" value="Log in" id="login-btn" />
        </form>
      </Fragment>
    )
  }
}

export default Login;
