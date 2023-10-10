import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { employeesCount } from "../services/api";
import { statisticsActions } from "../store/statistics_store";

const StatsCard = ({ stat }) => {
  const dispatch = useDispatch();

  const allEmployees = useSelector((state) => state.statistics.employeesCount);

  useEffect(() => {
    const fetchStats = async () => {
      const employees = await employeesCount();
      dispatch(
        statisticsActions.setEmployeesCount({
          employeesCount: employees,
        })
      );
    };

    fetchStats();
  }, []);

  return (
    <Fragment>
      <div class="col-md-6 col-sm-6 col-lg-6 col-xl-3">
        <div class="card dash-widget">
          <div class="card-body">
            <span class="dash-widget-icon">
              <i class="fa-solid fa-users"></i>
            </span>
            <div class="dash-widget-info">
              <h3>{allEmployees}</h3>
              <span>Employees</span>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default StatsCard;
