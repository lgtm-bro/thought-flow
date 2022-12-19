import React from "react";

const Nav = (props) => {

  let status = props.user ? "Sign Out" : "Log In";

  const changeStatus = () => {
    props.showLogin();
  }

  return (
    <nav className="topnav">
      <a href="#" onClick={props.showHome}>Home</a>
      <a href="#profile-wrapper">Profile</a>
			<a href="#about">About</a>
      <a href="#login-wrapper" className="login" onClick={changeStatus}>{status}</a>
    </nav>
  );
};

export default Nav;
