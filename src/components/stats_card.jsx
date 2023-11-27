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
      <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
        <div className="card dash-widget">
          <div className="card-body">
            <span
              className="dash-widget-icon"
              style={{
                cursor: "pointer",
              }}
            >
              <i className="fa-solid fa-users"></i>
            </span>
            <div className="dash-widget-info">
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
