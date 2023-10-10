import React, { Fragment, useEffect, useState } from "react";
import ProfileCard from "./profile_basic";
import PersonalInfomation from "./personal_information";
import EmergencyContact from "./emergency_contact";
import { useParams } from "react-router-dom";
import { getSingleEmployee } from "../../../services/api";
import { useDispatch, useSelector } from "react-redux";
import { employeesActions } from "../../../store/employee_store";
import Qualifications from "./qualifications";
import BankInformation from "./bank_information";

const EmployeeDetail = ({}) => {
  const { employeeId } = useParams();
  const dispatch = useDispatch();

  const employee = useSelector((state) => state.employees.singleEmployee);

  useEffect(() => {
    const fetchSingleEmployee = async () => {
      try {
        const employee = await getSingleEmployee(employeeId);
        dispatch(
          employeesActions.setSingleEmployee({
            singleEmployee: employee,
          })
        );
      } catch (error) {
        console.log("There was an error while fetching stats ", error);
      }
    };

    fetchSingleEmployee();
  }, []);

  return (
    <Fragment>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div class="page-header">
            <div class="row">
              <div class="col-sm-12">
                <h3 class="page-title">Profile</h3>
                <ul class="breadcrumb">
                  <li class="breadcrumb-item">
                    <a href="admin-dashboard.html">Dashboard</a>
                  </li>
                  <li class="breadcrumb-item active">Profile</li>
                </ul>
              </div>
            </div>
          </div>
          <div
            class="row"
            style={{
              marginBottom: "40px",
            }}
          >
            <ProfileCard employee={employee} />
          </div>
          <div class="row">
            <div class="col-md-6 d-flex">
              <PersonalInfomation  employeeId={employeeId} personalInfo={employee} />
            </div>

            <div class="col-md-6 d-flex">
              <EmergencyContact employeeId={employeeId} employee={employee}   />
            </div>
          </div>

          <div class="row">
            <Qualifications employeeId={employeeId} employee={employee} />
            {/* <BankInformation /> */}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EmployeeDetail;
