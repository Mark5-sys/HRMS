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

const EmployeeDetail = ({}) => {
  const { employeeId } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const employee = useSelector((state) => state.employees.singleEmployee);

  useEffect(() => {
    const fetchSingleEmployee = async () => {
      try {
        setLoading(true);
        const employee = await getSingleEmployee(employeeId);
        dispatch(
          employeesActions.setSingleEmployee({
            singleEmployee: employee,
          })
        );
        setLoading(false);
      } catch (error) {
        console.log("There was an error while fetching stats ", error);
        setLoading(false);
      }
    };

    fetchSingleEmployee();
  }, []);

  return (
    <Fragment>
      <div className="page-wrapper">
        <div className="content container-fluid">
          {loading ? ( // Conditionally render PatientSkeleton while loading
            <PatientSkeleton />
          ) : (
            <Fragment>
              <div className="page-header">
                <div className="row">
                  <div className="col-sm-12">
                    <h3 className="page-title">Profile</h3>
                    <ul className="breadcrumb">
                      <li className="breadcrumb-item">
                        <Link to={'/'} >Dashboard</Link>
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
                {employee && <ProfileCard employee={employee} />}
              </div>
              <div className="row">
                <div className="col-md-6 d-flex">
                  {employee && (
                    <PersonalInfomation
                      employeeId={employeeId}
                      personalInfo={employee}
                    />
                  )}
                </div>
                <div className="col-md-6 d-flex">
                  {employee && (
                    <EmergencyContact
                      employeeId={employeeId}
                      employee={employee}
                    />
                  )}
                </div>
              </div>
              <div className="row">
                {employee && (
                  <Qualifications employeeId={employeeId} employee={employee} />
                )}
                {/* <BankInformation /> */}
              </div>
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default EmployeeDetail;
