import React, { Fragment, useEffect, useState } from "react";
import ProfileCard from "./profile_basic";
import PersonalInfomation from "./personal_information";
import EmergencyContact from "./emergency_contact";
import { Link, useParams } from "react-router-dom";
import { getSingleEmployee } from "../../../services/api";
import { useDispatch, useSelector } from "react-redux";
import { employeesActions } from "../../../store/employee_store";
import Qualifications from "./qualifications";
import BankInformation from "./bank_information";
import PatientSkeleton from "../../../components/skeletons/patient_skeleton";
import { useGetEmployeeQuery } from "../../../store/api/employeeSlice";

const EmployeeDetail = () => {

  
  const { employeeId } = useParams();
  const dispatch = useDispatch();
  const { data: emps, isFetching, isSuccess } = useGetEmployeeQuery(employeeId);
  useEffect(() => {
    if (emps) {
      dispatch(
        employeesActions.setSingleEmployee({
          singleEmployee: emps.data,
        })
      );
    }
  }, [emps, dispatch]);
  const employee = useSelector((state) => state.employees.singleEmployee);

  let content;

  if (isFetching) {
    content = <PatientSkeleton />;
  } else if (isSuccess) {
    content = (
      <Fragment>
        <div className="page-header">
          <div className="row">
            <div className="col-sm-12">
              <h3 className="page-title">Profile</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to={"/"}>Dashboard</Link>
                </li>
                <li className="breadcrumb-item active">Profile</li>
              </ul>
            </div>
          </div>
        </div>
        <div
          className="row"
          style={{
            marginBottom: "40px",
          }}
        >
          {emps.data && <ProfileCard employee={emps.data} />}
        </div>
        <div className="row">
          <div className="col-md-6 d-flex">
            {emps.data && (
              <PersonalInfomation
                employeeId={employeeId}
                personalInfo={emps.data}
              />
            )}
          </div>
          <div className="col-md-6 d-flex">
            {employee && (
              <EmergencyContact employeeId={employeeId} employee={emps.data} />
            )}
          </div>
        </div>
        <div className="row">
          {employee && (
            <Qualifications employeeId={employeeId} employee={emps.data} />
          )}
          {/* <BankInformation /> */}
        </div>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <div className="page-wrapper">
        <div className="content container-fluid">{content}</div>
      </div>
    </Fragment>
  );
};

export default EmployeeDetail;
