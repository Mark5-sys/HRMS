import React, { Fragment, useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";

const DepartmentStatistics = ({ data }) => {
  const options = {
    chart: {
      id: "basic-bar",
      type: "bar",
    },
    xaxis: {
      categories: data.map((item) => item.department),
      labels: {
        rotate: -45,
        style: {
          fontSize: "12px",
          fontWeight: 400,
          cssClass: "apexcharts-xaxis-label",
        },
      },
    },
    yaxis: {
      title: {
        text: "Number of People",
      },
    },
  };

  const series = [
    {
      name: "Number of People",
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

export default DepartmentStatistics;
