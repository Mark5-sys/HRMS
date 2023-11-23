import React, { Fragment, useEffect, useState } from "react";
import {
  ageStatistics,
  birthDays,
  employeeByDepartment,
  employeesCount,
  genderStatistics,
  getAllDepartments,
  getAllEmployees,
  getAllPositions,
  getOrientationMonthlyStats,
  maritalStatistics,
} from "../services/api";
import { useDispatch, useSelector } from "react-redux";
import { departmentsActions } from "../store/department_store";
import { positionsActions } from "../store/position_store/positionSlice";
import { employeesActions } from "../store/employee_store";
import StatsCard from "../components/stats_card";
import AgeStats from "./dashboard/components/age_overview_stat";
import GenderStat from "./dashboard/components/gender_overview_stat";
import MaritalStatus from "./dashboard/components/marital_status_stat";
import DepartmentStatistics from "./dashboard/components/departments_stats";
import { statisticsActions } from "../store/statistics_store";
import AgeDistributionChart from "./dashboard/components/age_distribution_chart";
import MonthlyOrientationStats from "./dashboard/orientation/monthly_orientation_stats";
import BirthdayCard from "../components/birthday_card";

const Dashboard = ({}) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const bds = useSelector((state) => state.statistics.birthdays) || [];
  const [greeting, setGreeting] = useState();
  const [birthdays, setBirthdays] = useState([]);

  const [hovered, setHovered] = useState(false);

  const handleHover = () => {
    setHovered(true);
  };

  const handleHoverLeave = () => {
    setHovered(false);
  };

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
    const reloadEmployees = async () => {
      const employees = await getAllEmployees();
      dispatch(
        employeesActions.setActiveEmployees({
          activeEmployees: employees,
        })
      );
    };
    console.log("Running....");
    reloadEmployees();
  }, []);

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

        const birthdays = await birthDays();
        // setBirthdays(birthdays);
        dispatch(
          statisticsActions.setBirthdays({
            birthdays: birthdays
          })
        )

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

        const resp = await getOrientationMonthlyStats();
        dispatch(
          statisticsActions.setOrientationMonthlyStatistics({
            orientationMonth: resp,
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

  const monthlyOrientsData =
    useSelector((state) => state.statistics.orientationMonthlyStatistics) || {};

  return (
    <Fragment>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <h3
                  className="page-title"
                  style={{
                    fontFamily: "'Cooper Black'",
                  }}
                >
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

              <div
                className={`col-md-6 ${hovered ? "hovered" : ""}`}
                onMouseEnter={handleHover}
                onMouseLeave={handleHoverLeave}
              >
                <div className="card">
                  <div className="card-body">
                    <h4>Upcoming Birthdays</h4>

                    <div
                      className={`birthday-list ${hovered ? "enlarged" : ""}`}
                    >
                      {bds.map((birthday, i) => (
                        <BirthdayCard key={i} employee={birthday} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                {/* <h4 className="card-title">Top line justified</h4> */}
                <ul className="nav nav-tabs nav-tabs-top nav-justified">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      href="#top-justified-tab1"
                      data-bs-toggle="tab"
                    >
                      Providence Human Capital Statistical Analysis
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href="#top-justified-tab2"
                      data-bs-toggle="tab"
                    >
                      Staffing Solutions Statistical Analysis
                    </a>
                  </li>
                </ul>
                <div className="tab-content">
                  <div className="tab-pane show active" id="top-justified-tab1">
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
                  <div className="tab-pane" id="top-justified-tab2">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="row">
                          {monthlyOrientsData && (
                            <MonthlyOrientationStats
                              data={monthlyOrientsData}
                            />
                          )}
                        </div>
                      </div>
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
