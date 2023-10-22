import React, { Fragment, useEffect, useState } from "react";
import LeavesSummary from "./components/leave_summary";
import LeaveTable from "./components/leave_table";

const AppliedLeaves = () => {
  return (
    <Fragment>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div class="page-header">
            <div class="row align-items-center">
              <div class="col">
                <h3 class="page-title">Leaves </h3>
                <ul class="breadcrumb">
                  <li class="breadcrumb-item">
                    <a href="admin-dashboard.html">Dashboard</a>
                  </li>
                  <li class="breadcrumb-item active">Applied Leaves</li>
                </ul>
              </div>
            </div>
          </div>

          <LeavesSummary />
          <LeaveTable />

        </div>
      </div>
    </Fragment>
  );
};

export default AppliedLeaves;
