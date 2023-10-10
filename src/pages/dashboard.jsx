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
import AgeStats from "./dashboard/components/age_overview_stat";
import GenderStat from "./dashboard/components/gender_overview_stat";
import MaritalStatus from "./dashboard/components/marital_status_stat";
import DepartmentStatistics from "./dashboard/components/departments_stats";

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

  const data = [
    { age: 25, count: 7 },
    { age: 30, count: 5 },
    { age: 35, count: 10 },
    { age: 40, count: 4 },
    // Add more age/count data objects as needed
  ];

  const genderData = [
    { gender: "Male", count: 10 },
    { gender: "Female", count: 8 },
    { gender: "Other", count: 2 },
    // Add more gender/count data objects as needed
  ];

  const maritalStatus = [
    { maritalStatus: "Single", count: 44 },
    { maritalStatus: "Married", count: 28 },
    { maritalStatus: "Divorced", count: 7 },
  ];

  const departmentStats = [
    { department: "I.T & MAINTENANCE", count: 10 },
    { department: "HEALTH & WELLNESS", count: 8 },
    { department: "PAYROLL", count: 5 },
    { department: "HEAD OFFICE", count: 12 },
    { department: "LOGISTICS", count: 6 },
    { department: "STAFFING SOLUTIONS", count: 7 },
    { department: "WELLNESS & SUSTAINABILITY", count: 3 },
    { department: "LEARNING & DEVELOPMENT", count: 9 },
    // Add more department/count data objects as needed
  ];

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
                <GenderStat data={genderData} />
                <AgeStats data={data} />
                <MaritalStatus data={maritalStatus} />
              </div>

              <div class="row">
                <DepartmentStatistics data={departmentStats} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
