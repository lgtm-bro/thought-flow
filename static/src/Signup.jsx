import React, { useState, useRef, Fragment } from "react";

const Signup = (props) => {
	const name = useRef();
  const email = useRef();
  const password = useRef();
	const form = useRef();


  const signupUser = (e) => {
    e.preventDefault();
    props.signupUser(name.current.value, email.current.value, password.current.value);
		form.current.reset();
  };

  return (
    <Fragment>
      <h2>Sign Up</h2>
			<h4>Already have an account?
				<a href="#login-wrapper" onClick={props.showLogin}>Log In</a>
			</h4>
      <form action="#" ref={form} onSubmit={(e) => signupUser(e)}>
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
          <input type="password" name="signup-password" ref={password} />
        </label>
        <br />
        <br />
        <input type="submit" value="Sign Up" id="signup-btn" />
      </form>
    </Fragment>
  );
};

export default Signup;
