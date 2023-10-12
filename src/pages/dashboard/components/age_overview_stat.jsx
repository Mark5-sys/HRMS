import React, { Fragment, useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";

const AgeStats = ({ data }) => {
  const options = {
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: data.map((item) => item.age),
      title: {
        text: "Employees Age",
      },
    },
    yaxis: {
      title: {
        text: "Number of People per Age",
      },
    },
    colors: Array.from({ length: data.length }, () =>
      `#${Math.floor(Math.random() * 16777215).toString(16)}`
    ),
  };

  const series = [
    {
      name: "Employee(s)",
      data: data.map((item) => item.count),
    },
  ];
  return (
    <Fragment>
      <div className="col-md-12 text-start">
        <div className="card">
          <div className="card-body">
            <h3 className="card-title">Age Overview</h3>
            <ApexCharts
              options={options}
              series={series}
              type="bar"
              height={350}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AgeStats;
