import React, { Fragment, useEffect, useState } from "react";

const LeavesSummary = () => {
  return (
    <Fragment>
      <div class="row">
        <div class="col-md-3 d-flex">
          <div class="stats-info w-100">
            <h6>Today Presents</h6>
            <h4>12 / 60</h4>
          </div>
        </div>
        <div class="col-md-3 d-flex">
          <div class="stats-info w-100">
            <h6>Planned Leaves</h6>
            <h4>
              8 <span>Today</span>
            </h4>
          </div>
        </div>
        <div class="col-md-3 d-flex">
          <div class="stats-info w-100">
            <h6>Unplanned Leaves</h6>
            <h4>
              0 <span>Today</span>
            </h4>
          </div>
        </div>
        <div class="col-md-3 d-flex">
          <div class="stats-info w-100">
            <h6>Pending Requests</h6>
            <h4>12</h4>
          </div>
        </div>
      </div>
    </Fragment>
  );
};


export default LeavesSummary
