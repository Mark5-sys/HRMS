import React, { Fragment, useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import Loading from "../../components/loader/loading";

const EmployeeLogin = ({}) => {
  const initialValues = {
    employeeId: null,
  };

  const validationSchema = yup.object().shape({
    employeeId: yup.string().required("Please enter a employee number"),
  });

  const onSubmit = async (signInValues, { setSubmitting, resetForm }) => {
    try {
    } catch (error) {
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  const [loading, setLoading] = useState(false);
  return (
    <>
      <div className="account-page">
        <div className="main-wrapper">
          <div className="account-content">
            <div className="container">
              <div className="account-logo">
                <a href="admin-dashboard.html">
                  <img
                    src="assets/img/PHC_Logo.png"
                    alt="Providence Human Capital"
                    style={{
                        height: "150px",
                        width: "auto",
                    }}
                  />
                </a>
              </div>

              <div className="account-box">
                <div className="account-wrapper">
                  <h3 className="account-title">Employee Login</h3>
                  <p className="account-subtitle">Enter Employee Number to access dashboard</p>

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
                    }) => (
                      <Form>
                        <div className="input-block mb-4">
                         
                          <Field
                            className="form-control"
                            type="text"
                            id="employeeId"
                            name="employeeId"
                            placeholder="Enter Employee Number"
                          />
                          <ErrorMessage
                            name="employeeId"
                            component="div"
                            className="text-danger"
                          />
                        </div>

                        <div className="input-block mb-4 text-center">
                          {loading ? (
                            <Loading />
                          ) : (
                            <button
                              className="btn btn-primary account-btn"
                              disabled={isSubmitting}
                              onClick={handleSubmit}
                            >
                              Login
                            </button>
                          )}
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeLogin;
