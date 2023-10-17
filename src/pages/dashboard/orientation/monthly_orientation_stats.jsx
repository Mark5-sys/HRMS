import React, { Fragment, useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { getOrientationMonthlyStats } from "../../../services/api";
import { statisticsActions } from "../../../store/statistics_store";

const MonthlyOrientationStats = ({ data }) => {
  const categories = Object.keys(data) || [];
  const totalAttendanceData = (Object.values(data) || []).map(
    (item) => item?.total_attendance || 0
  );
  const deployedData = (Object.values(data) || []).map(
    (item) => item?.deployed || 0
  );

  const chartOptions = {
    xaxis: {
      categories: categories,
    },
  };

  const chartSeries = [
    {
      name: "Total Attendance",
      data: totalAttendanceData,
    },
    {
      name: "Deployed",
      data: deployedData,
    },
  ];

  return (
    <Fragment>
      <div className="col-md-8 text-start">
        <div className="card">
          <div className="card-body">
            <h3 className="card-title">Overall Orientation Statistics</h3>
            <Chart
              options={chartOptions}
              series={chartSeries}
              type="bar"
              height={400}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default MonthlyOrientationStats;
