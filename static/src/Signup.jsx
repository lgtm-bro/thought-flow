import React, { useState, useEffect, useRef, Fragment } from "react";
import { BiShow } from "react-icons/bi";

const Signup = (props) => {
  const [isUpper, setIsUpper] = useState(false);
  const [isLower, setIsLower] = useState(false);
  const [isNum, setIsNum] = useState(false);
  const [isSymbol, setIsSymbol] = useState(false);
  const [isLen, setIsLen] = useState(false);


	const name = useRef();
  const email = useRef();
  const password = useRef();
	const form = useRef();
  let upperBox = useRef();
  let lowerBox = useRef();
  let numBox = useRef();
  let symbolBox = useRef();
  let lenBox = useRef();

  useEffect(() => {
    if (isUpper) {
      upperBox.current.classList.add('checked');
    } else {
      upperBox.current.classList.remove('checked');
    }
  }, [isUpper])

  useEffect(() => {
    if (isLower) {
      lowerBox.current.classList.add('checked');
    } else {
      lowerBox.current.classList.remove('checked');
    }
  }, [isLower])

  useEffect(() => {
    if (isNum) {
      numBox.current.classList.add('checked');
    } else {
      numBox.current.classList.remove('checked');
    }
  }, [isNum])

  useEffect(() => {
    if (isSymbol) {
      symbolBox.current.classList.add('checked');
    } else {
      symbolBox.current.classList.remove('checked');
    }
  }, [isSymbol])

  useEffect(() => {
    if (isLen) {
      lenBox.current.classList.add('checked');
    } else {
      lenBox.current.classList.remove('checked');
    }
  }, [isLen])


  const emailCheck = /^[a-zA-Z]\w+@\w+\.\w{2,4}/;
  const checkUpper = /(?=.*[A-Z]).+/;
  const checkLower = /(?=.*[a-z]).+/;
  const checkNum = /(?=.*\d).+/;
  const checkSymbol = /(?=.*[!@#$%^&*]).+/;


  const showLogin = () => {
    form.current.reset();
    props.showLogin();
  }

  const setReqs = (e) => {
    let pw = e.target.value;
    setIsUpper(checkUpper.test(pw));
    setIsLower(checkLower.test(pw));
    setIsNum(checkNum.test(pw));
    setIsSymbol(checkSymbol.test(pw));
    setIsLen( pw.length > 7);
  }

  const signupUser = (e) => {
    e.preventDefault();
    if(!emailCheck.test(email.current.value)){
      return alert("Please enter a valid email")
    }

    if(!(isUpper && isLower && isNum && isSymbol & isLen)){
      return alert("Please enter a valid password")
    }

    props.signupUser(name.current.value, email.current.value, password.current.value);
		form.current.reset();
		props.hide();
  };

  const showPassword = () => {
    if (password.current.type === 'password') {
      password.current.type = 'text';
    } else {
      password.current.type = 'password';
    }
  }


  return (
    <Fragment>
      <h2>Sign Up</h2>
			<h4>Already have an account?
				<a href="#login-wrapper" onClick={showLogin}>Log In</a>
			</h4>
      <form action="#" ref={form} onSubmit={(e) => signupUser(e)}>
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
          <input type="password"
                 name="signup-password"
                 required ref={password}
                 onChange={setReqs}
          />
          <span className="eye" onClick={showPassword}>
            <BiShow />
          </span>
        </label>
        <br />
        <br />
        <div>Your password should contain:</div>
        <ul id="pass-reqs">
          <li ref={lowerBox}>at least one lowercase letter</li>
          <li ref={upperBox}>at least one uppercase letter</li>
          <li ref={numBox}>at least one number</li>
          <li ref={symbolBox}>at least one special character</li>
          <li ref={lenBox}>at least eight characters</li>
        </ul>
        <div>
          <button onClick={props.hide}>Cancel</button>
          <input type="submit" value="Sign Up" id="signup-btn" />
        </div>
      </form>
    </Fragment>
  );
};

export default Signup;
