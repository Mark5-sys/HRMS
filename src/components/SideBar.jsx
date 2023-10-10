import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SideBar = ({}) => {
  return (
    <Fragment>
      <div class="sidebar" id="sidebar">
        <div class="sidebar-inner slimscroll">
          <div id="sidebar-menu" class="sidebar-menu">
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
              {/* <li class="submenu">
                <a class="noti-dot">
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
              </li> */}

              <li>
                <Link to={"/employees"}>
                  <i class="la la-user"></i> <span>Employees</span>
                </Link>
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
