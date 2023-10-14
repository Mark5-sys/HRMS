import React, { Fragment, useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";

const GenderStat = ({ data }) => {
  const options = {
    chart: {
      id: "basic-pie",
    },
    labels: data.map((item) => item.gender),
    legend: {
      position: "bottom",
    },
  };

  const series = data.map((item) => item.count);
  return (
    <Fragment>
      <div className="col-md-4 text-start">
        <div className="card">
          <div className="card-body">
            <h3 className="card-title">Gender Analysis</h3>
            <ApexCharts
              options={options}
              series={series}
              type="pie"
              height={450}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default GenderStat;
