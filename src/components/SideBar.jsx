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
                  <i className="la la-users"></i> <span>Trainees (SS)</span>
                </Link>
              </li>
              <li>
                <Link to={"/roles"}>
                  <i className="la la-info"></i> <span>Employee Roles</span>
                </Link>
              </li>
              <li class="active">
                <Link to={"/clients"}>
                  <i class="la la-users"></i> <span>Clients</span>
                </Link>
              </li>
            <li>
                <Link to={"/Time"}>
                  <i class="la la-hourglass-half"></i> <span>Time</span>
                </Link>
              </li>
              <li>
                <Link to={"/attendance/list"}>
                  <i class="la la-users"></i> <span>AttendanceList</span>
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
              <li className="menu-title">
                <span>STAFFING SOLUTIONS</span>
              </li>
              <li>
                <Link to={"/companies"}>
                  <i className="la la-briefcase"></i> <span>Companies</span>
                </Link>
              </li>
              {/* <li className="menu-title"> */}
              <span>IT ASSET MANAGEMENT</span>
              {/* </li> */}
              {/* <li> */}
              {/* <Link to={"/schedule"}> */}
              <i className="la la-server"></i> <span>Asset Register</span>
              {/* </Link> */}
              {/* </li> */}
              <li className="menu-title">
                <span>MEETINGS & EVENTS</span>
              </li>
              <li>
                <Link to={"/schedule"}>
                  <i className="la la-edit"></i>{" "}
                  <span>General Meeting Scheduler</span>
                </Link>
              </li>
              <li>
                <Link to={"/schedule"}>
                  <i className="la la-ticket"></i> <span>Meeting Posts</span>
                </Link>
              </li>
              <li className="menu-title">
                <span>LEAVE MANAGEMENT</span>
              </li>
              <li>
                <Link to={"/leave/settings"}>
                  <i className="la la-calendar-check"></i>{" "}
                  <span>Leave Settings</span>
                </Link>
              </li>
              <li>
                <Link to={"/leaves"}>
                  <i className="la la-calendar-minus"></i> <span>Leaves</span>
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
