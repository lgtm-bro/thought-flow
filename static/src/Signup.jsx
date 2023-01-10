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
    <div id="signup-wrapper" className="bg-light">
      <h2>Sign Up</h2>
      <h4>
        Already have an account?
        <span className="form-link">
          <Link to="/auth/login"> Login</Link>
        </span>
      </h4>
      <form
        action="#"
        id="signup-form"
        ref={form}
        onSubmit={(e) => submitUserSignup(e)}
      >
        <label htmlFor="signup-email">
          <span className="signup-name">First Name: </span>
          <input type="text" name="signup-name" required ref={name} />
        </label>
        <br />
        <br />
        <label htmlFor="signup-email">
          <span className="signup-label">Email: </span>
          <input type="text" name="signup-email" required ref={email} />
        </label>
        <br />
        <br />
        <label htmlFor="signup-password">
          <span className="signup-label">Password: </span>
          <input
            type="password"
            name="signup-password"
            required
            ref={password}
            onChange={(e) => getPw(e, setPw)}
          />
          <span className="eye" onClick={() => showPassword(password)}>
            <BiShow />
          </span>
        </label>
        <br />
        <br />
        <label htmlFor="signup-password-confirm">
          <span className="signup-label">Confirm Password: </span>
          <input
            type="password"
            name="signup-password-confirm"
            ref={password2}
            onChange={(e) => getPw(e, setPw2)}
          />
          <span className="eye" onClick={() => showPassword(password2)}>
            <BiShow />
          </span>
        </label>
        <Password pw={pw} verify={verifyPw} />
        <div>
          <button type="button" onClick={cancelSignup}>
            Cancel
          </button>
          <input type="submit" value="Sign Up" id="signup-btn" />
        </div>
      </form>
    </div>
  );
};

export default Signup;
