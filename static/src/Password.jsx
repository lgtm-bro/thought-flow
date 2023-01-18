import React, { useState, useEffect, useRef } from "react";
import { BiShow } from "react-icons/bi";

const Password = ({ pw, verify }) => {
  const [isUpper, setIsUpper] = useState(false);
  const [isLower, setIsLower] = useState(false);
  const [isNum, setIsNum] = useState(false);
  const [isSymbol, setIsSymbol] = useState(false);
  const [isLen, setIsLen] = useState(false);
  const [password, setPassword] = useState(pw);

  let upperBox = useRef();
  let lowerBox = useRef();
  let numBox = useRef();
  let symbolBox = useRef();
  let lenBox = useRef();

  useEffect(() => {
    if (isUpper) {
      upperBox.current.classList.add("checked");
    } else {
      upperBox.current.classList.remove("checked");
    }
  }, [isUpper]);

  useEffect(() => {
    if (isLower) {
      lowerBox.current.classList.add("checked");
    } else {
      lowerBox.current.classList.remove("checked");
    }
  }, [isLower]);

  useEffect(() => {
    if (isNum) {
      numBox.current.classList.add("checked");
    } else {
      numBox.current.classList.remove("checked");
    }
  }, [isNum]);

  useEffect(() => {
    if (isSymbol) {
      symbolBox.current.classList.add("checked");
    } else {
      symbolBox.current.classList.remove("checked");
    }
  }, [isSymbol]);

  useEffect(() => {
    if (isLen) {
      lenBox.current.classList.add("checked");
    } else {
      lenBox.current.classList.remove("checked");
    }
  }, [isLen]);

  useEffect(() => {
    setIsUpper(checkUpper.test(pw));
    setIsLower(checkLower.test(pw));
    setIsNum(checkNum.test(pw));
    setIsSymbol(checkSymbol.test(pw));
    setIsLen(pw.length > 7);
  }, [pw]);

  useEffect(() => {
    validatePass();
  }, [isUpper, isLower, isNum, isSymbol, isLen]);

  const checkUpper = /(?=.*[A-Z]).+/;
  const checkLower = /(?=.*[a-z]).+/;
  const checkNum = /(?=.*\d).+/;
  const checkSymbol = /(?=.*[!@#$%^&*]).+/;

  const validatePass = () => {
    if (isUpper && isLower && isNum && isSymbol && isLen) {
      verify(true);
    } else {
      verify(false);
    }
  };

  return (
    <div id="password-container">
      <div className="ps-1 ps-sm-3 py-2">Your password should contain:</div>
      <ul id="pass-reqs" className="ps-1 ps-md-2 ms-5">
        <li ref={lowerBox}>at least one lowercase letter</li>
        <li ref={upperBox}>at least one uppercase letter</li>
        <li ref={numBox}>at least one number</li>
        <li ref={symbolBox}>at least one special character</li>
        <li ref={lenBox}>at least eight characters</li>
      </ul>
    </div>
  );
};

export default Password;
