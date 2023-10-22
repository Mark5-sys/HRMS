import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import Loading from "../../components/loader/loading";
import { API } from "../../config";
import { getRumukoSchedule } from "../../services/api";
import { rumukoScheduleActions } from "../../store/rumuko_store";

const AssignRumuko = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const employees =
    useSelector((state) => state.employees.activeEmployees) || [];
  const departments =
    useSelector((state) => state.department.departments) || [];

  const user = useSelector((state) => state.auth.user);

  const initialValues = {
    department: null,
    employee_id: null,
    user_id: null,
    start_time: "07:45",
    end_time: "08:15",
    presentation_date: "",
  };

  const validationSchema = yup.object().shape({
    employee_id: yup.number().required("Please select a employee"),
    start_time: yup.string().required("Start time is required"),
    end_time: yup.string().required("End time is required"),
    presentation_date: yup.string().required("Presentation date is required"),
  });

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    const assignData = {
      employee_id: parseInt(values.employee_id),
      user_id: parseInt(user.id),
      start_time: values.start_time,
      end_time: values.end_time,
      presentation_date: values.presentation_date,
    };
    setLoading(true);
    try {
      const response = await fetch(`${API}/rumuko/scheduler`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(assignData),
      });

      const responseData = await response.json();
      console.log(responseData.data);
      if (response.ok) {
        const schedule = await getRumukoSchedule();
        dispatch(
          rumukoScheduleActions.setRumukoSchedule({
            rumukoSchedule: schedule,
          })
        );
        setLoading(false);
        resetForm();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };
  useEffect(() => {}, []);
  return (
    <>
      <div id="add_schedule" className="modal custom-modal fade" role="dialog">
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title"
                style={{
                  textTransform: "uppercase",
                }}
              >
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
                {({ values, isSubmitting, handleSubmit, touched, errors }) => (
                  <Form>
                    <div className="row">
                      <div className="col-sm-6 mb-3">
                        <div className="form-floating">
                          <Field
                            as="select"
                            className="form-select"
                            id="department"
                            name="department"
                          >
                            <option value></option>
                            {departments.map((department) => (
                              <option key={department.id} value={department.id}>
                                {department.name}
                              </option>
                            ))}
                          </Field>
                          <label className="col-form-label">
                            Department <span className="text-danger">*</span>
                          </label>
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
                            <option value></option>
                            {employees.map((employee) => (
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
                              Start Time
                              <span className="text-danger">*</span>
                            </label>
                            <div className="input-group time">
                              <Field
                                className="form-control timepicker"
                                id="start_time"
                                name="start_time"
                              />
                              <span className="input-group-text">
                                <i className="fa-regular fa-clock"></i>
                              </span>
                            </div>
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
                            <div className="input-group time">
                              <Field
                                className="form-control timepicker"
                                id="end_time"
                                name="end_time"
                              />
                              <span className="input-group-text">
                                <i className="fa-regular fa-clock"></i>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {loading ? (
                      <Loading />
                    ) : (
                      <button
                        className="btn btn-primary submit-btn mt-3"
                        style={{
                          borderRadius: "10px",
                        }}
                        type="submit"
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
    </>
  );
};

export default AssignRumuko;
