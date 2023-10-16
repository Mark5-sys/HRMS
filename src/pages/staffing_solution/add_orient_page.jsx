import React, { Fragment, useEffect, useState } from "react";
import NewOrientForm from "./forms/new_orient_form";

const AddOrientPage = () => {
  return (
    <Fragment>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <h3 className="page-title">Add New Orient</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="admin-dashboard.html">Dashboard</a>
                  </li>
                  <li className="breadcrumb-item active">Add New Orient</li>
                </ul>
              </div>
            </div>
          </div>
          <NewOrientForm />
        </div>
      </div>
    </Fragment>
  );
};

export default AddOrientPage;
