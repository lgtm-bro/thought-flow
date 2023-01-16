import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiShow } from "react-icons/bi";

const Login = (props) => {
  const email = useRef();
  const password = useRef();
  const form = useRef();
  const login = useRef();

  const navigate = useNavigate();

  const showPassword = () => {
    if (password.current.type === "password") {
      password.current.type = "text";
    } else {
      password.current.type = "password";
    }
  };

  const loginUser = (e) => {
    e.preventDefault();
    props.getUser(email.current.value, password.current.value);
  };

  return (
    <div id="login-wrapper" className="container p-4 my-5 shadow rounded" ref={login}>
      <div id="login-form-header" className="row text-center my-3">
        <h2 className="text-center mb-3">please login</h2>
        <h3 className="pt-1 form-text">
          Don't have account?
          <span className="auth-link ms-2">
            <Link to="/auth/signup">sign up</Link>
          </span>
        </h3>
      </div>
      <form action="#" className="form-group p-2" ref={form} onSubmit={loginUser}>
        <input
          type="email"
          name="login-email"
          placeholder="email"
          className="form-input form-control"
          required
          ref={email}
        />
        <div id="login-password" className="input-group my-3">
          <input
            type="password"
            name="login-password"
            placeholder="password"
            className="form-input form-control"
            required
            ref={password}
            aria-label="login password"
            aria-describedby="show-password-icon"
          />
          <span
            id="show-password-icon"
            className="form-input input-group-text"
            onClick={showPassword}
          >
            <BiShow />
          </span>
        </div>
        <div id="login-btn-div" className="form-btn-div">
          <Link to="/">
            <button type="button" className="btn form-btn border px-4">
              cancel
            </button>
          </Link>
          <input type="submit" value="login" className="btn form-btn border px-4" />
        </div>
      </form>
    </div>
  );
};

export default Login;
