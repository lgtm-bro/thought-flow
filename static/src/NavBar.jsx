import React, { Fragment } from "react";
import { Link, Routes, Route } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const NavBar = ({user, showAlert}) => {
  let status = user ? "Sign Out" : "Log In";
  let profileLink = user ? "/profile" : "/";

  const checkUser = () => {
    if (!user) {
      showAlert("You must Login to view Profile");
    }
  }


  return (
    <nav className="topnav">
      <span id="nav-home" className="nav-link">
        <Link to="/">Home</Link>
      </span>
      <span id="nav-profile" className="nav-link" onClick={checkUser} >
        <Link to={profileLink}>Profile</Link>
      </span>
      <span id="nav-about" className="nav-link">
        <Link to="/about">About</Link>
      </span>
      <span id="nav-contact" className="nav-link">
        <Link to="/contact">Contact</Link>
      </span>
      <span id="nav-login" className="nav-link">
        <Link to="/auth">{status}</Link>
      </span>
    </nav>
  );
};

export default NavBar;
