import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import { API } from "../../../config";

const maritalStatuses = ["Married", "Single", "Divorced"];
const gender = ["Male", "Female", "Other"];
const empStatus = ["Pending", "Orientation", "Active"];

const EditEmployeeFormModal = ({}) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const positions = useSelector((state) => state.position.positions);
  const departments = useSelector((state) => state.department.departments);

  const initialValues = {
    employeeCode: "",
    firstName: "Tea",
    surname: "",
    department: null,
    nationalId: "",
    maritalStatus: "",
    dateOfBirth: "",
    position: null,
    gender: "Male",
    postalCity: "",
    phoneNumber1: "",
    phoneNumber2: "",
    address: "",
    email: "",
  };

  const validationSchema = yup.object().shape({
    email: yup.string().email().required("Please enter a valid email"),
    address: yup.string().required("Please enter a  address"),
  });

  const onSubmit = async (employeeValues, { setSubmitting, resetForm }) => {
    setLoading(true);
    try {
      const response = await fetch(`${API}/employee/${1}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const responseData = await response.json();
      console.log(responseData.data);
      if (response.ok) {
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

  return (
    <Fragment>
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Profile Information</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {({ values, isSubmitting, handleSubmit, touched, errors }) => (
              <Form>
                <div class="row">
                  <div class="col-md-12">
                    <div class="profile-img-wrap edit-img">
                      <img
                        class="inline-block"
                        src="/assets/img/profiles/avatar-02.jpg"
                        alt="User Image"
                      />
                      <div class="fileupload btn">
                        <span class="btn-text">edit</span>
                        <input class="upload" type="file" />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-4">
                        <div class="input-block mb-3">
                          <label class="col-form-label">First Name</label>
                          <Field
                            type="text"
                            class="form-control"
                            id="firstName"
                            name="firstName"
                          />
                          <ErrorMessage
                            name="firstName"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>

                      <div class="col-md-4">
                        <div class="input-block mb-3">
                          <label class="col-form-label">Surname</label>
                          <Field
                            type="text"
                            class="form-control"
                            id="surname"
                            name="surname"
                          />
                          <ErrorMessage
                            name="surname"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                      <div class="col-md-4">
                        <div class="input-block mb-3">
                          <label class="col-form-label">National Id</label>
                          <Field
                            type="text"
                            class="form-control"
                            id="nationalId"
                            name="nationalId"
                          />
                          <ErrorMessage
                            name="nationalId"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>

                      <div class="col-md-4">
                        <div class="input-block mb-3">
                          <label class="col-form-label">Employee Code</label>
                          <Field
                            type="text"
                            class="form-control"
                            id="employeeCode"
                            name="employeeCode"
                          />
                          <ErrorMessage
                            name="employeeCode"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>

                      <div class="col-md-4">
                        <div class="input-block mb-3">
                          <label class="col-form-label">Birth Date</label>
                          <div class="cal-icon">
                            <Field
                              class="form-control datetimepicker"
                              type="text"
                              name="birthDate"
                              id="birthDate"
                            />
                            <ErrorMessage
                              name="birthDate"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                        </div>
                      </div>

                      <div class="col-md-4">
                        <div class="input-block mb-3">
                          <label class="col-form-label">Gender</label>
                          <Field as="select" className="select form-control">
                            <option value=""></option>
                            {gender.map((gender) => (
                              <option key={gender} value={gender}>
                                {gender}
                              </option>
                            ))}
                          </Field>
                          <ErrorMessage
                            name="gender"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-12">
                    <div class="input-block mb-3">
                      <label class="col-form-label">Address</label>
                      <Field
                        type="text"
                        class="form-control"
                        name="address"
                        id="address"
                      />
                      <ErrorMessage
                        name="address"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                  </div>

                  <div class="col-md-6">
                    <div class="input-block mb-3">
                      <label class="col-form-label">Email Address</label>
                      <Field
                        type="email"
                        class="form-control"
                        name="email"
                        id="email"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                  </div>

                  <div class="col-md-6">
                    <div class="input-block mb-3">
                      <label class="col-form-label">Postal City</label>
                      <Field
                        type="text"
                        class="form-control"
                        name="postalCity"
                        id="postalCity"
                      />
                      <ErrorMessage
                        name="postalCity"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                  </div>

                  <div class="col-md-4">
                    <div class="input-block mb-3">
                      <label class="col-form-label">Department</label>
                      <Field as="select" className="select form-control">
                        <option value=""></option>
                        {departments.map((department) => (
                          <option key={department.id} value={department.id}>
                            {department.name}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="department"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                  </div>

                  <div class="col-md-4">
                    <div class="input-block mb-3">
                      <label class="col-form-label">Position/Designation</label>
                      <Field as="select" className="select form-control">
                        <option value=""></option>
                        {positions.map((position) => (
                          <option key={position.id} value={position.id}>
                            {position.name}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="position"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                  </div>

                  <div class="col-md-4">
                    <div class="input-block mb-3">
                      <label class="col-form-label">Marital Status</label>
                      <Field as="select" className="select form-control">
                        <option value=""></option>
                        {maritalStatuses.map((maritalStatus) => (
                          <option key={maritalStatus} value={maritalStatus}>
                            {maritalStatus}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="maritalStatus"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                  </div>

                  <div class="col-md-6">
                    <div class="input-block mb-3">
                      <label class="col-form-label">Phone Number 1</label>
                      <Field
                        type="text"
                        class="form-control"
                        name="phoneNumber1"
                        id="phoneNumber1"
                      />{" "}
                      <ErrorMessage
                        name="phoneNumber1"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="input-block mb-3">
                      <label class="col-form-label">Phone Number 2</label>
                      <Field
                        type="text"
                        class="form-control"
                        name="phoneNumber2"
                        id="phoneNumber2"
                      />{" "}
                      <ErrorMessage
                        name="phoneNumber2"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                  </div>
                </div>

                <div class="submit-section">
                  <button
                    class="btn btn-primary submit-btn"
                    style={{
                      borderRadius: "10px",
                    }}
                  >
                    Submit
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Fragment>
  );
};

export default EditEmployeeFormModal;
