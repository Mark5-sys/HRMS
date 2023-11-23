import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import { API } from "../../config";
import Loading from "../../components/loader/loading";
import { authActions } from "../../store/auth_store";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const LoginPage = ({}) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = yup.object().shape({
    username: yup.string().required("Please enter a username"),
    password: yup.string().required("Please enter a password"),
  });

  const onSubmit = async (signInValues, { setSubmitting, resetForm }) => {
    console.log("onSubmit", signInValues);
    setLoading(true);
    try {
      const response = await fetch(`${API}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signInValues),
      });
      const responseData = await response.json();
      console.log(responseData);
      if (response.ok) {
        dispatch(
          authActions.setLogin({
            user: responseData.user,
            token: responseData.token,
            isAuthenticated: true,
            role: responseData.user.role,
          })
        );

        resetForm();
        navigate("/dashboard");
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "User Login Was successful",
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
      <div className="account-page">
        <div className="main-wrapper">
          <div className="account-content">
            <Link to={"/job/application"} className="btn btn-primary apply-btn">
              Apply Job
            </Link>
            
            <div className="container">
              <div className="account-logo">
                <a href="admin-dashboard.html">
                  <img
                    src="assets/img/PHC_Logo.png"
                    alt="Providence Human Capital"
                  />
                </a>
              </div>

              <div className="account-box">
                <div className="account-wrapper">
                  <h3 className="account-title">Login</h3>
                  <p className="account-subtitle">Access to our dashboard</p>

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
                          <label className="col-form-label">Username</label>
                          <Field
                            className="form-control"
                            type="text"
                            id="username"
                            name="username"
                          />
                          <ErrorMessage
                            name="username"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                        <div className="input-block mb-4">
                          <div className="row align-items-center">
                            <div className="col">
                              <label className="col-form-label">Password</label>
                            </div>
                            <div className="col-auto">
                              <Link
                                className="text-muted"
                                href="forgot-password.html"
                              >
                                Forgot password?
                              </Link>
                            </div>
                          </div>
                          <div className="position-relative">
                            <Field
                              className="form-control"
                              type="password"
                              id="password"
                              name="password"
                            />
                            <ErrorMessage
                              name="password"
                              component="div"
                              className="text-danger"
                            />
                            {/* <span
                              className="fa-solid fa-eye-slash"
                              id="toggle-password"
                            ></span> */}
                          </div>
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
                        {/* <div className="account-footer">
                          <p>
                            Don't have an account yet?
                            <a href="register.html">Register</a>
                          </p>
                        </div> */}
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default LoginPage;
