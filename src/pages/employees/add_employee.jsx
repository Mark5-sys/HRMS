import React, { Fragment, useEffect, useState } from "react";
import AddEmployeeForm from "./forms/add_employee_form";

const AddEmployee = ({}) => {
  return (
    <Fragment>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div class="page-header">
            <div class="row">
              <div class="col-sm-12">
                <h3 class="page-title">Profile</h3>
                <ul class="breadcrumb">
                  <li class="breadcrumb-item">
                    <a href="admin-dashboard.html">Dashboard</a>
                  </li>
                  <li class="breadcrumb-item active">Add New Employee</li>
                </ul>
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
