import React, { Fragment, useEffect, useState } from "react";

const StatsCard = ({ stat }) => {
  return (
    <Fragment>
      <div class="col-md-6 col-sm-6 col-lg-6 col-xl-3">
        <div class="card dash-widget">
          <div class="card-body">
            <span class="dash-widget-icon">
              <i class="fa-solid fa-users"></i>
            </span>
            <div class="dash-widget-info">
              <h3>178</h3>
              <span>Employees</span>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default StatsCard;
