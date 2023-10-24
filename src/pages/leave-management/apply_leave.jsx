import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import Loading from "../../components/loader/loading";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { API } from "../../config";

const ApplyForLeave = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    leave_type_id: null,
    employee_id: null, // Add employee_id
    start_date: "", // Add start_date
    end_date: "", // Add end_date
    request_advance: false, // Add request_advance
    reason: "", // Add reason
  };

  const leaveTypes = useSelector((state) => state.leave.leaveTypes) || [];
  const employee =
    useSelector((state) => state.employees.activeEmployees) || [];

  const validationSchema = yup.object().shape({
    leave_type_id: yup.number().required("Select a leave type"),
    start_date: yup.string().required("Start date is required"),

    end_date: yup.string().required("End date is required"),

    request_advance: yup.boolean(),
    reason: yup.string().nullable(),
  });

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    setLoading(true);
    console.log(values);

    const applicationData = {
      employee_id: 117,
      end_date: values.end_date,
      start_date: values.start_date,
      leave_type_id: parseInt(values.leave_type_id),
      request_advance: values.request_advance,
      reason: values.reason,
    };

    try {
      const response = await fetch(`${API}/leave/application`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(applicationData),
      });

      const responseData = await response.json();
      console.log(responseData.data);
      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Orientee has been successfully added",
          timer: 2000,
          confirmButtonColor: "#007a41",
        });
      }

      navigate('/leaves');
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <Fragment>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div class="page-header">
            <div class="row align-items-center">
              <div class="col">
                <h3 class="page-title">Apply Leave </h3>
                <ul class="breadcrumb">
                  <li class="breadcrumb-item">
                    <Link to={"/"}>Dashboard</Link>
                  </li>
                  <li class="breadcrumb-item active">Apply Leave</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="card card-color">
            <div className="box-body">
              <div className="container_">
                <Formik
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
                    handleChange,
                  }) => (
                    <Form>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="input-block mb-3">
                            <label className="col-form-label">
                              Leave Types
                            </label>
                            <Field
                              as="select"
                              className="select form-control"
                              id="leave_type_id"
                              name="leave_type_id"
                              onChange={handleChange}
                            >
                              <option value={""}> </option>
                              {leaveTypes.map((leaveType) => (
                                <option key={leaveType.id} value={leaveType.id}>
                                  {leaveType.name}
                                </option>
                              ))}
                            </Field>
                            <ErrorMessage
                              name="gender"
                              component="div"
                              className="text-danger"
                            />
                          </div>

                          <div className="row">
                            <div className="col-md-6">
                              <div className="input-block mb-3">
                                <label className="col-form-label">
                                  Start Date
                                </label>
                                <Field
                                  type="date" // Use the appropriate input type for your date format
                                  className="form-control"
                                  id="start_date"
                                  name="start_date"
                                  onChange={handleChange}
                                />
                                <ErrorMessage
                                  name="start_date"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="input-block mb-3">
                                <label className="col-form-label">
                                  End Date
                                </label>
                                <Field
                                  type="date" // Use the appropriate input type for your date format
                                  className="form-control"
                                  id="end_date"
                                  name="end_date"
                                  onChange={handleChange}
                                />
                                <ErrorMessage
                                  name="end_date"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                            </div>

                            {/* Reason */}
                            <div className="col-md-12">
                              <div className="input-block mb-3">
                                <label className="col-form-label">Reason</label>
                                <Field
                                  as="textarea" // Use the textarea input type for a multiline text input
                                  className="form-control"
                                  id="reason"
                                  name="reason"
                                  onChange={handleChange}
                                />
                                <ErrorMessage
                                  name="reason"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                            </div>
                          </div>

                          {loading ? (
                            <Loading />
                          ) : (
                            <button
                              className="btn btn-primary submit-btn"
                              type="submit"
                              style={{
                                borderRadius: "10px",
                                marginBottom: "10px",
                              }}
                            >
                              Submit
                            </button>
                          )}
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ApplyForLeave;
