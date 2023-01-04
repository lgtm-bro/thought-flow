import React, { useState, useEffect, useRef, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { BiShow } from "react-icons/bi";

import Password from "./Password.jsx";

const Profile = (props) => {
  const [name, setName] = useState(props.user);
  const [email, setEmail] = useState(props.email);
  const [newPw, setNewPw] = useState("");
  const [pwVerified, setPwVerified] = useState(false);

  const password = useRef();
  const newPassword = useRef();
  const passwordConfirm = useRef();
  const form = useRef();

  const navigate = useNavigate();


  const showPassword = (fieldRef) => {
    if (fieldRef.current.type === "password") {
      fieldRef.current.type = "text";
    } else {
      fieldRef.current.type = "password";
    }
  };

  const verifyPw = (res) => {
    setPwVerified(res);
  };

  const cancelForm = () => {
    setNewPw("");
    form.current.reset();
    navigate("/");
  };

  const checkPasswords = () => {
    return newPassword.current.value === passwordConfirm.current.value;
  };

  const validateEmail = (e) => {
    const emailCheck = /^[a-zA-Z]\w+@\w+\.\w{2,4}/;
    return emailCheck.test(e);
  };

  const submitChanges = (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      return props.showAlert("Please enter a valid email");
    }

    if (newPw) {
      if (!pwVerified) {
        return props.showAlert(
          "Please make sure that your new password meets all requirements"
        );
      }

      if (!checkPasswords()) {
        return props.showAlert("The new passwords don't match");
      }

      props.updateProfile(name, email, password.current.value, newPw);
    } else {
      props.updateProfile(name, email, password.current.value, null);
    }

    setNewPw("");
    form.current.reset();
    navigate("/");
  };

  return (
    <div id="profile-wrapper">
      <h2>Edit Profile</h2>
      <form id="profile-form" ref={form} onSubmit={submitChanges}>
        <label htmlFor="profile-name">Name</label>
        <br />
        <input
          type="text"
          defaultValue={props.user}
          required
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <br />
        <label htmlFor="profile-email">Email</label>
        <br />
        <input
          type="text"
          id="profile-email"
          defaultValue={props.email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <br />
        <label htmlFor="profile-password">Current Password</label>
        <br />
        <input type="password" id="profile-password" ref={password} required />
        <span className="eye" onClick={() => showPassword(password)}>
          <BiShow />
        </span>
        <br />
        <br />
        <label htmlFor="profile-new-password">New Password</label>
        <br />
        <input
          type="password"
          id="profile-new-password"
          ref={newPassword}
          placeholder="optional"
          onChange={(e) => setNewPw(e.target.value)}
        />
        <span className="eye" onClick={() => showPassword(newPassword)}>
          <BiShow />
        </span>
        <br />
        <br />
        <label htmlFor="profile-confirm-password">Confirm New Password</label>
        <br />
        <input
          type="password"
          id="profile-confirm-password"
          ref={passwordConfirm}
        />
        <span className="eye" onClick={() => showPassword(passwordConfirm)}>
          <BiShow />
        </span>
        <Password pw={newPw} verify={verifyPw} />
        <br />
        <br />
        <div id="profile-btns">
          <button type="button" onClick={cancelForm}>
            Cancel
          </button>
          <input type="submit" value="Update Info" />
        </div>
      </form>
    </div>
  );
};

export default Profile;
