import React from "react";

const Nav = (props) => {
  return (
    <div className="topnav">
      <a href="#" onClick={props.showHome}>Home</a>
      <a href="#profile-wrapper">Profile</a>
			<a href="#about">About</a>
      <a href="#login-wrapper" className="login" onClick={props.showLogin}>Log In</a>
    </div>
  );
};

export default Nav;
