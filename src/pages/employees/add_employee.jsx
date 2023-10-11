import React, { Fragment, useEffect, useState } from "react";
import AddEmployeeForm from "./forms/add_employee_form";
import { Link } from "react-router-dom";

const AddEmployee = ({}) => {
  return (
    <Fragment>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <h3 className="page-title">Profile</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="admin-dashboard.html">Dashboard</a>
                  </li>
                  <li className="breadcrumb-item active">Add New Employee</li>
                </ul>
              </div>
              <div className="col-auto float-end ms-auto">
                <Link to={"/add/employee/excel"}  className="btn add-btn">
                <i className="fas fa-file-excel"></i> Upload Excel
                </Link>
                <div className="view-icons"></div>
              </div>
            </div>
          </div>

          <AddEmployeeForm />
        </div>
      </div>
    </Fragment>
  );
};

export default AddEmployee;
