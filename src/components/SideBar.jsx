import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SideBar = ({}) => {
  return (
    <Fragment>
      <div className="sidebar" id="sidebar">
        <div className="sidebar-inner slimscroll">
          <div id="sidebar-menu" className="sidebar-menu">
            <ul className="sidebar-vertical">
              <li className="menu-title">
                <span>Main</span>
              </li>

              <li>
                <Link to={"/dashboard"}>
                  <i className="la la-dashboard"></i> <span>Dashboard</span>
                </Link>
              </li>

              <li className="menu-title">
                <span>Employees</span>
              </li>

              <li>
                <Link to={"/employees"}>
                  <i className="la la-user"></i> <span>Employees</span>
                </Link>
              </li>

              <li>
                <Link to={"/orients"}>
                  <i className="la la-users"></i> <span>Orients (SS)</span>
                </Link>
              </li>

              <li className="menu-title">
                <span>HR</span>
              </li>

              <li>
                <Link to={"/departments"}>
                  <i className="la la-files-o"></i> <span>Departments</span>
                </Link>
              </li>

              <li>
                <Link to={"/positions"}>
                  <i className="la la-briefcase"></i> <span>Positions</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default SideBar;
