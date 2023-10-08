import React, { Fragment, useEffect, useState } from "react";
import {
  getAllDepartments,
  getAllEmployees,
  getAllPositions,
} from "../services/api";
import { useDispatch, useSelector } from "react-redux";
import { departmentsActions } from "../store/department_store";
import { positionsActions } from "../store/position_store";
import { employeesActions } from "../store/employee_store";
import StatsCard from "../components/stats_card";

const Dashboard = ({}) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [greeting, setGreeting] = useState();

  const getGreeting = () => {
    const date = new Date();
    const hour = date.getHours();
    if (hour < 12) {
      setGreeting("Good morning");
    } else if (hour < 18) {
      setGreeting("Good afternoon");
    } else {
      setGreeting("Good evening");
    }
  };

  useEffect(() => {
    getGreeting();
    const fetchData = async () => {
      try {
        const departments = await getAllDepartments();
        dispatch(
          departmentsActions.setDepartments({
            departments: departments,
          })
        );

        const positions = await getAllPositions();
        dispatch(
          positionsActions.setPositions({
            positions: positions,
          })
        );

        const employees = await getAllEmployees();
        dispatch(
          employeesActions.setActiveEmployees({
            activeEmployees: employees,
          })
        );

        console.log("Departments", departments);
        console.log("Positions", positions);
        console.log("Employees", employees);
      } catch (error) {
        console.log("There was an error while fetching stats ", error);
      }
    };

    fetchData();
  }, []);
  return (
    <Fragment>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div class="page-header">
            <div class="row">
              <div class="col-sm-12">
                <h3 class="page-title">
                  {greeting} {user.username}!
                </h3>
                <ul class="breadcrumb">
                  <li class="breadcrumb-item active">Dashboard</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="row">
            <StatsCard />
          </div>

          <div class="row">
            <div class="col-md-12">
              <div class="row">
                <div class="col-md-6 text-center">
                  <div class="card">
                    <div class="card-body">
                      <h3 class="card-title">Total Revenue</h3>
                      <div id="bar-charts"></div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 text-center">
                  <div class="card">
                    <div class="card-body">
                      <h3 class="card-title">Sales Overview</h3>
                      <div id="line-charts"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
