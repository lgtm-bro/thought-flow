import React, { useState, useEffect, useRef, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiShow } from "react-icons/bi";
import Password from "./Password.jsx";

const Signup = ({ signupUser, showAlert }) => {
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [pwVerified, setPwVerified] = useState(false);

  const name = useRef();
  const email = useRef();
  const password = useRef();
  const password2 = useRef();
  const form = useRef();

  const emailCheck = /^[a-zA-Z]\w+@\w+\.\w{2,4}/;
  const navigate = useNavigate();

  const getPw = (e, method) => {
    method(e.target.value);
  };

  const verifyPw = (res) => {
    setPwVerified(res);
  };

  const showPassword = (el) => {
    if (el.current.type === "password") {
      el.current.type = "text";
    } else {
      el.current.type = "password";
    }
  };

  const cancelSignup = (e) => {
    setPw("");
    form.current.reset();
    navigate("/");
  };

  const submitUserSignup = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (name.current.value === "") {
      return showAlert("Please enter a name");
    }

    if (!emailCheck.test(email.current.value)) {
      return showAlert("Please enter a valid email");
    }

    if (!pwVerified) {
      return showAlert("Please enter a valid password");
    }

    if (pw !== pw2) {
      return showAlert("Passwords do not match");
    }

    signupUser(name.current.value, email.current.value, password.current.value);
    form.current.reset();
    navigate("/");
  };

  return (
    <div id="signup-wrapper" className="form-control bg-light shadow">
      <div id="signup-form-header" className="row text-center my-3">
        <h4>Sign Up</h4>
        <h5 className="form-text">
          Already have an account?
          <span className="custom-link">
            <Link to="/auth"> login</Link>
          </span>
        </h5>
      </div>
      <form
        action="#"
        id="signup-form"
        className="form-group"
        ref={form}
        onSubmit={(e) => submitUserSignup(e)}
      >
        <input
          type="text"
          name="signup-name"
          placeholder="first name"
          className="form-input form-control"
          required
          ref={name}
        />
        <input
          type="email"
          name="signup-email"
          placeholder="email"
          className="form-input form-control"
          required
          ref={email}
        />
        <div className="input-group">
          <input
            type="password"
            name="signup-password"
            placeholder="password"
            className="form-control form-input"
            required
            ref={password}
            onChange={(e) => getPw(e, setPw)}
          />
          <span
            className="input-group-text form-input"
            onClick={() => showPassword(password)}
          >
            <BiShow />
          </span>
        </div>
        <div className="input-group">
          <input
            type="password"
            name="signup-password-confirm"
            placeholder="confirm password"
            className="form-control form-input"
            ref={password2}
            onChange={(e) => getPw(e, setPw2)}
          />
          <span
            className="input-group-text form-input"
            onClick={() => showPassword(password2)}
          >
            <BiShow />
          </span>
        </div>
        <Password pw={pw} verify={verifyPw} />
        <div className="form-btn-div">
          <button type="button" className="btn form-btn" onClick={cancelSignup}>
            Cancel
          </button>
          <input type="submit" value="Sign Up" id="signup-btn" className="btn form-btn"/>
        </div>
      </form>
    </div>
  );
};

export default Signup;
