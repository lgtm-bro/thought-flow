import React, { Fragment } from "react";
import { Link, Routes, Route } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const NavBar = ({ user, showAlert }) => {
  let status = user ? "sign out" : "login";
  let profileLink = user ? "/profile" : "/";

  const checkUser = () => {
    if (!user) {
      showAlert("You must Login to view Profile");
    }
  };

  return (
    <nav className="navbar navbar-expand-md navbar-light">
      <div className="container-fluid">
      <span id="nav-home" className=" navbar-brand">
                <Link to="/">
                  <h1 id="nav-title" className=" justify-content-start navbar-brand">thoughtflow</h1>
                </Link>
              </span>
        <button
        id="app-nav-toggler"
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#main-nav-menu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div id="main-nav-menu" className="navbar-collapse collapse justify-content-end">
          <ul className="navbar-nav">
            {/* <li>
              <span id="nav-home" className="nav-link navbar-item">
                <Link to="/">home</Link>
              </span>
            </li> */}
            <li
              id="nav-profile"
              className="nav-link nav-item"
              onClick={checkUser}
            >
              <Link to={profileLink}>profile</Link>
            </li>
            <li id="nav-about" className="nav-link nav-item">
              <Link to="/about">about</Link>
            </li>
            <li id="nav-contact" className="nav-link nav-item">
              <Link to="/contact">contact us</Link>
            </li>
            <li id="nav-login" className="nav-link nav-item">
              <Link to="/auth/">{status}</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
