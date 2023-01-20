import React, { useRef, Fragment } from "react";
import { Link } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";

const NavBar = ({ user, showAlert }) => {
  const dropDownBtn = useRef();
  const dropDown = useRef();
  let status = user ? "sign out" : "login";
  let profileLink = user ? "/profile" : "/";

  const closeNav = () => {
    if (dropDown.current.classList.contains("show")) {
      dropDown.current.classList.remove("show");
      dropDownBtn.current.classList.add("collapsed");
      dropDownBtn.current.setAttribute("aria-expanded", false);
    }
  };

  const checkUser = () => {
    if (!user) {
      showAlert("you must login to view your profile");
    }

    closeNav();
  };

  return (
    <nav id="navbar" className="navbar navbar-expand-lg navbar-light mask-custom fixed-top me-auto shadow-0 pt-3">
      <div className="container-fluid justify-content-between px-4">
        <span id="nav-home" className="navbar-brand">
          <Link to="/">
            <h1 id="nav-title" className="justify-content-start">
              <span id="thought-span">thought</span>
              <span id="flow-span">flow</span>
            </h1>
          </Link>
        </span>
        <button
          id="navbar-toggler"
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#main-nav-menu"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          ref={dropDownBtn}
        >
          <AiOutlineMenu />
        </button>
        <div
          className="collapse navbar-collapse"
          id="main-nav-menu"
          ref={dropDown}
        >
          <ul className="navbar-nav ms-auto text-center pe-4">
            <li
              className="navbar-link nav-item ms-auto pe-2"
              onClick={closeNav}
            >
              <span className="nav-link">
                <Link to="/about">about</Link>
              </span>
            </li>
            <li
              className="navbar-link nav-item ms-auto pe-2"
              onClick={closeNav}
            >
              <span className="nav-link">
                <Link to="/contact">contact us</Link>
              </span>
            </li>
            <li
              className="navbar-link nav-item ms-auto pe-2"
              onClick={checkUser}
            >
              <span className="navbar-link nav-link">
                <Link to={profileLink}>profile</Link>
              </span>
            </li>
            <li
              className="navbar-link nav-item ms-auto pe-2"
              onClick={closeNav}
            >
              <span className="nav-link">
                <Link to="/auth/">{status}</Link>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
