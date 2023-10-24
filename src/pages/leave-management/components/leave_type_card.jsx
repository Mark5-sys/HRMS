import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import Select from "react-select";
import LeaveSettingsTable from "./leave_settings_table";
import Loading from "../../../components/loader/loading";
import { API } from "../../../config";
import { employeesActions } from "../../../store/employee_store";
import { getAllEmployees } from "../../../services/api";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const LeaveTypeCard = ({ leaveType }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(true);

  const user = useSelector((state) => state.auth.user);
  const employees =
    useSelector((state) => state.employees.activeEmployees) || [];

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const employeeOptions = employees.map((employee) => {
    // Find the leave that matches the leaveType.id
    const leaveBalance = employee.leave_balances.find(
      (balance) => balance.leave_type_id === leaveType.id
    );

    return {
      value: employee.id,
      label: `${employee.first_name} ${employee.surname}`,
      employeeCode: employee.code,
      department: employee.department.name,
      leaveBalance: leaveBalance, // Assign the found leave balance
    };
  });

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  const initialValues = {
    employee_id: null,
    leave_type_id: null,
    opening_bal: selectedEmployee
      ? selectedEmployee.leaveBalance
        ? selectedEmployee.leaveBalance.opening_bal || 0.0
        : 0.0
      : 0.0,
    accrual: selectedEmployee
      ? selectedEmployee.leaveBalance
        ? selectedEmployee.leaveBalance.accrual || 0.0
        : 0.0
      : 0.0,
    adjustments: selectedEmployee
      ? selectedEmployee.leaveBalance
        ? selectedEmployee.leaveBalance.adjustments || 0.0
        : 0.0
      : 0.0,
    closing_bal: selectedEmployee
      ? selectedEmployee.leaveBalance
        ? selectedEmployee.leaveBalance.closing_bal || 0.0
        : 0.0
      : 0.0,
  };

  const validationSchema = yup.object().shape({});

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    
    setLoading(true);
    const closingBal = values.opening_bal + values.accrual;
    const leaveSettingsData = {
      leave_type_id: parseInt(leaveType.id),
      employee_id: parseInt(selectedEmployee.value),
      adjustments: values.adjustments,
      closing_bal: closingBal,
      opening_bal: values.opening_bal,
      accrual: values.accrual,
    };
    console.log(leaveSettingsData);

    try {
      const response = await fetch(`${API}/edit/leave_balance`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(leaveSettingsData),
      });
      const responseData = await response.json();
      console.log(responseData);
      if (response.ok) {
        const employees = await getAllEmployees();
        dispatch(
          employeesActions.setActiveEmployees({
            activeEmployees: employees,
          })
        );

        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Update was successful",
          timer: 4000,
          confirmButtonColor: "#007a41",
        });
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <Fragment>
      <div className="card leave-box" id="leave_annual">
        <div className="card-body">
          <div className="h3 card-title with-switch">
            {leaveType.name}
            <div className="onoffswitch">
              <input
                type="checkbox"
                name="onoffswitch"
                className="onoffswitch-checkbox"
                id="switch_custom01"
                checked=""
              />
              <label className="onoffswitch-label" for="switch_custom01">
                <span className="onoffswitch-inner"></span>
                <span className="onoffswitch-switch"></span>
              </label>
            </div>
            <button className="btn btn-danger leave-delete-btn" type="button">
              Delete
            </button>
          </div>
          <div className="leave-item">
            <div className="leave-row">
              <div className="leave-left">
                <p>{leaveType.description}</p>
              </div>
            </div>
          </div>

          <div className="">
            <a
              data-toggle="collapse"
              role="button"
              aria-expanded={!isCollapsed}
              aria-controls="collapseExample"
              className="advanced"
              style={{
                fontWeight: "bold",
                color: "black",
              }}
              onClick={handleToggle}
            >
              Edit Employee Leave Balance
              <i
                className={`fa ${
                  isCollapsed ? "fa-angle-down" : "fa-angle-up"
                }`}
                style={{
                  marginLeft: "5px",
                }}
              ></i>
            </a>
            <div
              className={`collapse ${isCollapsed ? "" : "show"}`}
              id="collapseExample"
            >
              <div className="mt-3">
                <Formik
                  enableReinitialize={true}
                  initialValues={initialValues}
                  onSubmit={onSubmit}
                  validationSchema={validationSchema}
                >
                  {({
                    values,
                    isSubmitting,
                    handleSubmit,
                    touched,
                    errors,
                  }) => (
                    <Form>
                      <div className="row">
                        <div className="col-md-4">
                          <div className="input-block mb-3">
                            <label className="col-form-label">Employee</label>
                            <Select
                              value={selectedEmployee}
                              options={employeeOptions}
                              onChange={(selectedOption) =>
                                setSelectedEmployee(selectedOption)
                              }
                              placeholder="Select an employee"
                              isSearchable
                              name="employee_id"
                            />
                            <ErrorMessage
                              name="employee_id"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                        </div>
                        {user.role == "admin" && selectedEmployee && (
                          <>
                            <div className="row">
                              <div className="col-md-3">
                                <div className="input-block mb-3">
                                  <label className="col-form-label">
                                    Opening Balance
                                  </label>
                                  <Field
                                    type="number"
                                    className="form-control"
                                    id="opening_bal"
                                    name="opening_bal"
                                  />
                                  <ErrorMessage
                                    name="opening_bal"
                                    component="div"
                                    className="text-danger"
                                  />
                                </div>
                              </div>
                              <div className="col-md-3">
                                <div className="input-block mb-3">
                                  <label className="col-form-label">
                                    Accrual
                                  </label>
                                  <Field
                                    type="number"
                                    className="form-control"
                                    id="accrual"
                                    name="accrual"
                                  />
                                  <ErrorMessage
                                    name="accrual"
                                    component="div"
                                    className="text-danger"
                                  />
                                </div>
                              </div>
                              <div className="col-md-3">
                                <div className="input-block mb-3">
                                  <label className="col-form-label">
                                    Adjustments
                                  </label>
                                  <Field
                                    type="number"
                                    className="form-control"
                                    id="adjustments"
                                    name="adjustments"
                                  />
                                  <ErrorMessage
                                    name="adjustments"
                                    component="div"
                                    className="text-danger"
                                  />
                                </div>
                              </div>
                            </div>

                            <div>
                              {loading ? (
                                <Loading />
                              ) : (
                                <button
                                  class="btn btn-primary submit-btn"
                                  type="submit"
                                  disabled={isSubmitting}
                                  style={{
                                    borderRadius: "10px",
                                  }}
                                >
                                  Submit
                                </button>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
              {selectedEmployee && (
                <LeaveSettingsTable selectedEmployee={selectedEmployee} />
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default LeaveTypeCard;
