import React, { Fragment, useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";

const AgeStats = ({ data }) => {
  const [hoveredAge, setHoveredAge] = useState(null);

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
    colors: Array.from(
      { length: data.length },
      () => `#${Math.floor(Math.random() * 16777215).toString(16)}`
    ),
    tooltip: {
      enabled: true,
      custom: function ({ seriesIndex, dataPointIndex, w }) {
        const age = w.config.xaxis.categories[dataPointIndex];
        console.log('a', age, 'b',seriesIndex )
        setHoveredAge(age);
      },
    },
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

      {hoveredAge && (
        <div className="col-md-12 text-start">
          <div className="card mt-4">
            <div className="card-body">
              <h5 className="card-title">Employees aged {hoveredAge}</h5>
              <ul>
                {data
                  .find((item) => item.age === hoveredAge)
                  .employees.map((employee, index) => (
                    <li key={index} className="mb-3">
                      {employee.first_name} {employee.surname}{" "}
                      {employee.gender === "Female" ? (
                        <span
                          className="badge bg-inverse-warning"
                          style={{
                            marginLeft: "40px",
                          }}
                        >
                          {employee.gender.toUpperCase()}
                        </span>
                      ) : (
                        <span
                          className="badge bg-inverse-success"
                          style={{
                            marginLeft: "40px",
                          }}
                        >
                          {employee.gender.toUpperCase()}
                        </span>
                      )}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default AgeStats;
