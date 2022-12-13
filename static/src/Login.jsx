import React, {useState, useRef, Fragment} from 'react';

const Login = (props) => {
	const email =useRef()
	const password =useRef()

	const loginUser = (e) => {
		e.preventDefault();
		props.getUser(email.current.value, password.current.value);
		email.current.value = '';
    password.current.value = '';
	}

	return (
		<Fragment>
			<h2>Please Log in</h2>
			<h4>Don't have account?
				<a href="#signup-wrapper"
					 onClick={() => props.showSignup()}
				>
					Sign Up
				</a>
			</h4>
			<form action="#" onSubmit={loginUser}>
				<label htmlFor="login-email">
					<span className="login-label">Email: </span>
					<input type="text"
								 name="login-email"
								 ref={email}
					/>
				</label>
				<br /><br />
				<label htmlFor="login-password" >
					<span className="login-label">Password: </span>
					<input type="password"
								 name="login-password"
								 ref={password}
					/>
				</label>
				<br /><br />
				<input type="submit" value="Log in" id="login-btn"/>
			</form>
		</Fragment>
	)
}

export default Login;