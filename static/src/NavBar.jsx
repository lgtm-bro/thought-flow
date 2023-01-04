import React, {Fragment} from "react";
import {Link, Routes, Route} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


const NavBar = (props) => {

  let status = props.user ? "Sign Out" : "Log In";


  return (
    // <nav className="topnav">
    //   <a href="#" onClick={props.showHome}>Home</a>
    //   <a href="#profile-wrapper" onClick={props.showProfile}>Profile</a>
		// 	<a href="#about">About</a>
    //   <a href="#login-wrapper" className="login" onClick={changeStatus}>{status}</a>
    // </nav>
    <Fragment>
      <nav className="topnav">
          <span className="nav-link">
            <Link to="/" >Home</Link>
          </span>
          <span className="nav-link">
            <Link to="/profile" >Profile</Link>
          </span>
          <span className="nav-link">
            <Link to="/about" >About</Link>
          </span>
          <span className="nav-link">
            <Link to="/auth" >{status}</Link>
          </span>
    </nav>
  </Fragment>
  );
};

export default NavBar;
