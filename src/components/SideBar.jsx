import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SideBar = ({}) => {
  return (
    <Fragment>
      <div class="sidebar" id="sidebar">
        <div class="sidebar-inner slimscroll">
          <div id="sidebar-menu" class="sidebar-menu">
            <nav class="greedys sidebar-horizantal">
              <ul class="list-inline-item list-unstyled links">
                <li class="menu-title">
                  <span>Main</span>
                </li>

                <li class="submenu">
                  <Link to={"/dashboard"}>
                    <i class="la la-dashboard"></i> <span> Dashboard</span>
                    <span class="menu-arrow"></span>
                  </Link>
                  <ul>
                    <li>
                      <Link to={"/dashboard"}>Admin Dashboard</Link>
                    </li>
                    <li>
                      <Link to={"/dashboard"}>Employee Dashboard</Link>
                    </li>
                  </ul>
                </li>

                <li class="menu-title">
                  <span>Employees</span>
                </li>
                <li class="submenu">
                  <a href="#" class="noti-dot">
                    <i class="la la-user"></i> <span> Employees</span>
                    <span class="menu-arrow"></span>
                  </a>
                  <ul>
                    <li>
                      <Link to={"/employees"}>All Employees</Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>

            <ul class="sidebar-vertical">
              <li class="menu-title">
                <span>Main</span>
              </li>

              <li>
                <Link to={"/dashboard"}>
                  <i class="la la-dashboard"></i> <span>Dashboard</span>
                </Link>
              </li>

              <li class="menu-title">
                <span>Employees</span>
              </li>
              <li class="submenu">
                <a href="#" class="noti-dot">
                  <i class="la la-user"></i> <span> Employees</span>
                  <span class="menu-arrow"></span>
                </a>
                <ul>
                  <li>
                    <Link to={"/employees"}>Active Employees</Link>
                  </li>
                  <li>
                    <Link to={"/employees"}>Orientation</Link>
                  </li>
                  <li>
                    <Link to={"/employees"}>Pending</Link>
                  </li>
                </ul>
              </li>

              <li>
                <Link to={"/departments"}>
                  <i class="la la-files-o"></i> <span>Departments</span>
                </Link>
              </li>

              <li>
                <Link to={"/positions"}>
                  <i class="la la-briefcase"></i> <span>Positions</span>
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
