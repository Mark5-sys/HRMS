import React, { Fragment, useEffect, useState } from "react";
import Chart from "react-apexcharts";

const DepartmentStatistics = ({ data }) => {
  const options = {
    chart: {
      id: "basic-bar",
      type: "bar",
    },
    xaxis: {
      categories: data.map((item) => ({
        value: item.department,
        tooltip: item.department,
      })),
      labels: {
        rotate: -0,
        style: {
          fontSize: "10px",
          fontWeight: 400,
          cssClass: "apexcharts-xaxis-label",
        },
        formatter: function (value) {
          return value.value; // Extract the value property
        },
      },
    },
    yaxis: {
      title: {
        text: "Employee(s)",
      },
    },
    tooltip: {
      x: {
        show: true,
      },
    },
  };
  const series = [
    {
      name: "Employee(s)",
      data: data.map((item) => item.count),
      curve: "smooth",
    },
  ];
  return (
    <Fragment>
      <div className="col-md-8 text-start">
        <div className="card">
          <div className="card-body">
            <h3 className="card-title">Department Analysis</h3>
            <Chart options={options} series={series} type="bar" height={400} />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default DepartmentStatistics;
