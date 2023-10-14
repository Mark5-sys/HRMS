import React, { Fragment, useEffect, useState } from "react";
import {
  ageStatistics,
  employeeByDepartment,
  employeesCount,
  genderStatistics,
  getAllDepartments,
  getAllEmployees,
  getAllPositions,
  maritalStatistics,
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
import { statisticsActions } from "../store/statistics_store";
import AgeDistributionChart from "./dashboard/components/age_distribution_chart";

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

        const genderStats = await genderStatistics();
        dispatch(
          statisticsActions.setGenderStatistics({
            genderStatistics: genderStats,
          })
        );

        const maritalStats = await maritalStatistics();
        dispatch(
          statisticsActions.setMaritalStatusStatistics({
            maritalStatusStatistics: maritalStats,
          })
        );

        const ageStats = await ageStatistics();
        dispatch(
          statisticsActions.setAgeStatistics({
            ageStatistics: ageStats,
          })
        );

        const dptStats = await employeeByDepartment();

        dispatch(
          statisticsActions.setEmployeeDepartmentStatistics({
            employeeByDepartmentStatistics: dptStats,
          })
        );

        const databaseStats = await employeesCount();

        dispatch(
          statisticsActions.setEmployeesCount({
            employeesCount: databaseStats,
          })
        );
        console.log(databaseStats);
      } catch (error) {
        console.log("There was an error while fetching stats ", error);
      }
    };

    fetchData();
  }, []);

  const genderData =
    useSelector((state) => state.statistics.genderStatistics) || [];
  const maritalStatus =
    useSelector((state) => state.statistics.maritalStatusStatistics) || [];
  const data = useSelector((state) => state.statistics.ageStatistics) || [];
  const bydpt =
    useSelector((state) => state.statistics.employeeByDepartmentStatistics) ||
    [];

  const dbstats = useSelector((state) => state.statistics.employeesCount) || [];

  return (
    <Fragment>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <h3 className="page-title">
                  {greeting} {user.username}!
                </h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item active">Dashboard</li>
                </ul>
              </div>
            </div>
          </div>

          {dbstats.length > 0 && (
            <div className="row">
              {dbstats.map((stat, index) => (
                <StatsCard key={index} stat={stat} />
              ))}
            </div>
          )}

          <div className="row">
            <div className="col-md-12">
              <div className="row">
                <GenderStat data={genderData} />
                <DepartmentStatistics data={bydpt} />
              </div>

              <div className="row">
                <AgeStats data={data} />
              </div>
              <div className="row">
                <MaritalStatus data={maritalStatus} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
