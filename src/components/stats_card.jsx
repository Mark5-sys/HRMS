import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { employeesCount } from "../services/api";
import { statisticsActions } from "../store/statistics_store";
import { Link } from "react-router-dom";

const StatsCard = ({ stat }) => {
  const dispatch = useDispatch();

  useEffect(() => {}, []);

  return (
    <Fragment>
      <div class="col-md-6 col-sm-6 col-lg-6 col-xl-3">
        <div class="card dash-widget">
          <div class="card-body">
            <span
              class="dash-widget-icon"
              style={{
                cursor: "pointer",
              }}
            >
              <i class="fa-solid fa-users"></i>
            </span>
            <div class="dash-widget-info">
              <h3>{stat.count}</h3>
              <span>{stat.stat}</span>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default StatsCard;
