import React, { useState, useEffect, useRef, Fragment } from "react";
import { BiShow } from "react-icons/bi";
import Password from "./Password.jsx";

const Signup = (props) => {
  const [pw, setPw] = useState('');
  const [pw2, setPw2] = useState('');
  const [pwVerified, setPwVerified] = useState(false);


	const name = useRef();
  const email = useRef();
  const password = useRef();
  const password2 = useRef();
	const form = useRef();

  const emailCheck = /^[a-zA-Z]\w+@\w+\.\w{2,4}/;

  const getPw = (e, method) => {
    method(e.target.value);
  }

  const verifyPw = (res) => {
    setPwVerified(res);
  }

  const showLogin = () => {
    form.current.reset();
    password.current.value = '';
    props.showLogin();
  }

  const showPassword = (el) => {
    if (el.current.type === 'password') {
      el.current.type = 'text';
    } else {
      el.current.type = 'password';
    }
  }

  const cancelSignup = (e) => {
    setPw('');
    form.current.reset();
    props.hide();
  }

  const signupUser = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if(name.current.value === '') {
      return alert("Please enter a name")
    }

    if(!emailCheck.test(email.current.value)) {
      return alert("Please enter a valid email")
    }

    if (!pwVerified) {
      return alert("Please enter a valid password")
    }

    if (pw !== pw2) {
      return alert("Passwords do not match")
    }

    props.signupUser(name.current.value, email.current.value, password.current.value);
		form.current.reset();
		props.hide();
  };


  return (
    <Fragment>
      <h2>Sign Up</h2>
			<h4>Already have an account?
				<a href="#login-wrapper" onClick={showLogin}>Log In</a>
			</h4>
      <form action="#" id="signup-form" ref={form} onSubmit={(e) => signupUser(e)}>
				<label htmlFor="signup-email">
          <span className="signup-name">First Name: </span>
          <input type="text" name="signup-name" ref={name} />
        </label>
        <br />
        <br />
        <label htmlFor="signup-email">
          <span className="signup-label">Email: </span>
          <input type="text" name="signup-email" ref={email} />
        </label>
        <br />
        <br />
         <label htmlFor="signup-password">
          <span className="signup-label">Password: </span>
          <input type="password"
                 name="signup-password"
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
          <input type="password"
                 name="signup-password-confirm"
                 ref={password2}
                 onChange={(e) => getPw(e, setPw2)}
          />
          <span className="eye" onClick={() => showPassword(password2)}>
            <BiShow />
          </span>
        </label>
        <Password pw={pw} verify={verifyPw}/>
        <div>
          <button type="button" onClick={cancelSignup}>Cancel</button>
          <input type="submit" value="Sign Up" id="signup-btn" />
        </div>
      </form>
    </Fragment>
  );
};

export default Signup;
