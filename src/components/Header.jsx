import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../store/auth_store";

const Header = ({}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const signOut = () => {
    dispatch(authActions.setLogout());

    navigate("/login");
  };

  return (
    <Fragment>
      <div className="header">
        <div className="header-left">
          <Link to={"/"} className="logo">
            <img
              src="/assets/img/phc_white.png"
              width="90"
              height="90"
              alt="Logo"
            />
          </Link>
          <Link to={"/"} className="logo2">
            <img
              src="/assets/img/phc_white.png"
              width="90"
              height="90"
              alt="Logo"
            />
          </Link>
        </div>

        <a id="toggle_btn" href="javascript:void(0);">
          <span className="bar-icon">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </a>

        <div className="page-title-box">
          <h3>HR Management</h3>
        </div>

        <a id="mobile_btn" className="mobile_btn" href="#sidebar">
          <i className="fa-solid fa-bars"></i>
        </a>

        <ul className="nav user-menu">
          <li className="nav-item">
            <div className="top-nav-search">
              <a href="javascript:void(0);" className="responsive-search">
                <i className="fa-solid fa-magnifying-glass"></i>
              </a>
              <form>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Search here"
                />
                <button className="btn" type="submit">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </form>
            </div>
          </li>

          <li className="nav-item dropdown has-arrow main-drop">
            <a
              href="#"
              className="dropdown-toggle nav-link"
              data-bs-toggle="dropdown"
            >
              <span className="user-img" style={{
                marginRight: '10px',
              }}>
                <img
                  src="/assets/img/profiles/avatar-21.jpg"
                  alt="User Image"
                />
                <span className="status online"></span>
              </span>
              <span>{user.username}</span>
            </a>
            <div className="dropdown-menu">
              <a className="dropdown-item">My Profile</a>
              <a className="dropdown-item">Settings</a>
              <a className="dropdown-item" onClick={signOut}>
                Logout
              </a>
            </div>
          </li>
        </ul>

        <div className="dropdown mobile-user-menu">
          <a
            href="#"
            className="nav-link dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa-solid fa-ellipsis-vertical"></i>
          </a>
          <div className="dropdown-menu dropdown-menu-right">
            <a className="dropdown-item" href="profile.html">
              My Profile
            </a>
            <a className="dropdown-item" href="settings.html">
              Settings
            </a>
            <a className="dropdown-item" href="index.html">
              Logout
            </a>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Header;
