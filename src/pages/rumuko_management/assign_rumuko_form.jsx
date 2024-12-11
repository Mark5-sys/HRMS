import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import Loading from "../../components/loader/loading";
import Swal from "sweetalert2";

const AssignRumuko = () => {
  const [departments, setDepartments] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const initialValues = {
    department: "",
    employee_id: "",
    user_id: user.id,
    start_time: "07:45",
    end_time: "08:15",
    presentation_date: "",
  };

  const validationSchema = yup.object().shape({
    department: yup.number().required("Please select a department"),
    employee_id: yup.number().required("Please select an employee"),
    start_time: yup.string().required("Start time is required"),
    end_time: yup.string().required("End time is required"),
    presentation_date: yup.string().required("Presentation date is required"),
  });

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    const assignData = {
      ...values,
      user_id: parseInt(user.id),
    };

    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:8000/api/rumuko/scheduler",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(assignData),
        }
      );

      const responseData = await response.json();
      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Employee assigned to schedule successfully.",
        });
        resetForm();
      } else {
        throw new Error(responseData.message || "Failed to assign employee.");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Something went wrong.",
      });
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/department");
        const data = await response.json();
        setDepartments(data.data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchDepartments();
  }, []);

  const handleDepartmentChange = (departmentId) => {
    const department = departments.find((d) => d.id === parseInt(departmentId));
    setSelectedEmployees(department ? department.employees : []);
  };

  return (
    <div id="add_schedule" className="modal custom-modal fade" role="dialog">
      <div
        className="modal-dialog modal-dialog-centered modal-lg"
        role="document"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" style={{ textTransform: "uppercase" }}>
              Add Employee To Schedule
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
            >
              {({ values, isSubmitting, handleChange }) => (
                <Form>
                  <div className="row">
                    <div className="col-sm-6 mb-3">
                      <div className="form-floating">
                        <Field
                          as="select"
                          className="form-select"
                          id="department"
                          name="department"
                          onChange={(e) => {
                            handleChange(e);
                            handleDepartmentChange(e.target.value);
                          }}
                        >
                          <option value="">Select Department</option>
                          {departments.map((department) => (
                            <option key={department.id} value={department.id}>
                              {department.name}
                            </option>
                          ))}
                        </Field>
                        <label className="col-form-label">
                          Department <span className="text-danger">*</span>
                        </label>
                        <ErrorMessage
                          name="department"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </div>

                    <div className="col-sm-6">
                      <div className="form-floating mb-3">
                        <Field
                          as="select"
                          className="form-select"
                          id="employee_id"
                          name="employee_id"
                        >
                          <option value="">Select Employee</option>
                          {selectedEmployees.map((employee) => (
                            <option key={employee.id} value={employee.id}>
                              {employee.first_name} {employee.surname}
                            </option>
                          ))}
                        </Field>
                        <label className="col-form-label">
                          Employee Name <span className="text-danger">*</span>
                        </label>
                        <ErrorMessage
                          name="employee_id"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </div>

                    <div className="col-sm-6">
                      <div className="input-block mb-3">
                        <Field
                          type="date"
                          className="form-control datetimepicker"
                          id="presentation_date"
                          name="presentation_date"
                        />
                        <label className="col-form-label">
                          Presentation Date
                        </label>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-sm-4">
                        <div className="input-block mb-3">
                          <label className="col-form-label">
                            Start Time <span className="text-danger">*</span>
                          </label>
                          <Field
                            type="time"
                            className="form-control"
                            id="start_time"
                            name="start_time"
                          />
                          <ErrorMessage
                            name="start_time"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>

                      <div className="col-sm-4">
                        <div className="input-block mb-3">
                          <label className="col-form-label">
                            End Time <span className="text-danger">*</span>
                          </label>
                          <Field
                            type="time"
                            className="form-control"
                            id="end_time"
                            name="end_time"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {loading ? (
                    <Loading />
                  ) : (
                    <button
                      className="btn btn-primary submit-btn mt-3"
                      type="submit"
                      style={{ borderRadius: "10px" }}
                      disabled={isSubmitting}
                    >
                      Submit
                    </button>
                  )}
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignRumuko;
