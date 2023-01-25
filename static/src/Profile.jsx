import React, { useState, useRef } from "react";
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

  const validateEmail = (em) => {
    const emailCheck = /^[a-zA-Z][\w\.+\-\']+@[\w.]+\.\w{2,4}/;
    return emailCheck.test(em);
  };

  const submitChanges = (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      return props.showAlert("please enter a valid email");
    }

    if (newPw) {
      if (!pwVerified) {
        return props.showAlert(
          "please make sure that your new password meets all requirements"
        );
      }

      if (!checkPasswords()) {
        return props.showAlert("the new passwords don't match");
      }

      props.updateProfile(name, email, password.current.value, newPw);
    } else {
      props.updateProfile(name, email, password.current.value, null);
    }

    setNewPw("");
    form.current.reset();
  };

  return (
    <div
      id="profile-container"
      className="container-fluid mx-med-auto p-4 my-3 my-md-5 shadow rounded"
    >
      <h2 className="text-center mb-3">profile</h2>
      <form
        id="profile-form"
        className="form-group p-1"
        ref={form}
        onSubmit={submitChanges}
      >
        <input
          type="text"
          defaultValue={props.user}
          placeholder="name"
          required
          className="profile-form-input form-control"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          id="profile-email"
          defaultValue={props.email}
          placeholder="email"
          required
          className="profile-form-input form-control"
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="input-group">
          <input
            type="password"
            id="profile-password"
            placeholder="current password"
            className="profile-form-input form-control"
            required
            ref={password}
          />
          <span
            className="profile-form-input input-group-text"
            onClick={() => showPassword(password)}
          >
            <BiShow />
          </span>
        </div>
        <div className="input-group">
          <input
            type="password"
            id="profile-new-password"
            className="profile-form-input form-control"
            placeholder="new password (optional)"
            ref={newPassword}
            onChange={(e) => setNewPw(e.target.value)}
          />
          <span
            className="profile-form-input input-group-text"
            onClick={() => showPassword(newPassword)}
          >
            <BiShow />
          </span>
        </div>
        <div className="input-group">
          <input
            type="password"
            id="profile-confirm-password"
            placeholder="confirm new password"
            className="profile-form-input form-control"
            ref={passwordConfirm}
          />
          <span
            className="profile-form-input input-group-text"
            onClick={() => showPassword(passwordConfirm)}
          >
            <BiShow />
          </span>
        </div>
        <Password pw={newPw} verify={verifyPw} />
        <div id="profile-btns" className="form-btn-div">
          <button type="button" className="btn form-btn px-4 px-lg-5" onClick={cancelForm}>
            cancel
          </button>
          <input type="submit" value="update" className="btn form-btn px-4 px-lg-5" />
        </div>
      </form>
    </div>
  );
};

export default Profile;
