import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EmployeeTable from "./components/employee_table";
import { employeesActions } from "../../store/employee_store";
import { useDispatch, useSelector } from "react-redux";

const EmployeeList = ({}) => {
  const dispatch = useDispatch();

  
  return (
    <Fragment>
      <div className="page-wrapper">
        <div className="content container-fluid">
          
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="page-title">Employee</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to={"/"}>Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Employee</li>
                </ul>
              </div>
              <div className="col-auto float-end ms-auto">
                <Link
                  to={"/add/employee"}
                  onClick={() => triggerEmployeeUpdate()}
                  className="btn add-btn"
                >
                  <i className="fa-solid fa-plus"></i> Add Employee
                </Link>
                <div className="view-icons"></div>
              </div>
            </div>
          </div>

          <EmployeeTable />
        </div>
      </div>
    </Fragment>
  );
};

export default EmployeeList;
