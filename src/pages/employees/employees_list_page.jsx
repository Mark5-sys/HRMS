import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EmployeeTable from "./components/employee_table";
import { employeesActions } from "../../store/employee_store";
import { useSelector } from "react-redux";

const EmployeeList = ({}) => {
  const positions = useSelector((state) => state.position.positions);
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
                <Link to={"/add/employee"} href="#" className="btn add-btn">
                  <i className="fa-solid fa-plus"></i> Add Employee
                </Link>
                <div className="view-icons"></div>
              </div>
            </div>
          </div>

          <div class="row filter-row">
            <div class="col-sm-6 col-md-3">
              <div class="input-block mb-3 form-focus">
                <input type="text" class="form-control floating" />
                <label class="focus-label">Employee ID</label>
              </div>
            </div>
            <div class="col-sm-6 col-md-3">
              <div class="input-block mb-3 form-focus">
                <input type="text" class="form-control floating" />
                <label class="focus-label">Employee Name</label>
              </div>
            </div>
            <div class="col-sm-6 col-md-3">
              <div class="input-block mb-3 form-focus select-focus">
                <select
                  class="form-select floating"
                  style={{
                    height: "50px",
                  }}
                >
                  <option value=""></option>
                  {positions.map((position) => (
                    <option key={position.id} value={position.id}>
                      {position.name}
                    </option>
                  ))}
                </select>
                <label class="focus-label">Designation</label>
              </div>
            </div>
            <div class="col-sm-6 col-md-3">
              <div class="d-grid">
                <a href="#" class="btn btn-success w-100">
                  {" "}
                  Search{" "}
                </a>
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
