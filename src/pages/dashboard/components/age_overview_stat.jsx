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
        text: "Age",
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
    },
  ];
  return (
    <Fragment>
      <div className="col-md-4 text-start">
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
