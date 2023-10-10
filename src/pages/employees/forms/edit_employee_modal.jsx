import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import { API } from "../../../config";
import { employeesActions } from "../../../store/employee_store";
import Loading from "../../../components/loader/loading";

import { getSingleEmployee } from "../../../services/api";

const maritalStatuses = ["Married", "Single", "Divorced"];
const gender = ["Male", "Female", "Other"];
const empStatus = ["Pending", "Orientation", "Active"];

const EditEmployeeFormModal = ({}) => {
  const { employeeId } = useParams();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const positions = useSelector((state) => state.position.positions);
  const departments = useSelector((state) => state.department.departments);

  const employee = useSelector((state) => state.employees.singleEmployee);

  const initialValues = {
    employeeCode: employee.code,
    firstName: employee.first_name,
    surname: employee.surname,
    department: employee.department ? employee.department.id : "",
    nationalId: employee.national_id,
    maritalStatus: employee.marital_status,
    dateOfBirth: employee.date_of_birth,
    position: employee.position ? employee.position.id : "",
    gender: employee.gender,
    postalCity: employee.postal_city,
    phoneNumber1: employee.phone_number_1,
    phoneNumber2: employee.phone_number_2,
    address: employee.address,
    email: employee.email,
  };

  const validationSchema = yup.object().shape({
    email: yup.string().nullable(),
    address: yup.string().nullable(),
  });

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    setLoading(true);

    const apiData = {
      code: values.employeeCode,
      position_id: parseInt(values.position),
      first_name: values.firstName,
      surname: values.surname,
      department_id: parseInt(values.department),
      national_id: values.nationalId,
      marital_status: values.maritalStatus,
      date_of_birth: values.dateOfBirth,
      gender: values.gender,
      postal_city: values.postalCity,
      phone_number_1: values.phoneNumber1,
      phone_number_2: values.phoneNumber2,
      address: values.address,
      email: values.email,
    };

    // console.log("Vaues", apiData)
    try {
      const response = await fetch(`${API}/employee/${employee.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiData),
      });
      const responseData = await response.json();
      console.log(responseData);
      if (response.ok) {
        setLoading(false);
        resetForm();

        const employee = await getSingleEmployee(employeeId);
        dispatch(
          employeesActions.setSingleEmployee({
            singleEmployee: employee,
          })
        );
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <Fragment>
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Profile Information</h5>
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
              handleChange,
            }) => (
              <Form>
                <div className="row">
                  <div className="col-md-12">
                    <div className="profile-img-wrap edit-img">
                      <img
                        className="inline-block"
                        src="/assets/img/user.jpg"
                        alt="User Image"
                      />
                      <div className="fileupload btn">
                        <span className="btn-text">edit</span>
                        <input className="upload" type="file" />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="input-block mb-3">
                          <label className="col-form-label">First Name</label>
                          <Field
                            type="text"
                            className="form-control"
                            id="firstName"
                            name="firstName"
                            onChange={handleChange}
                          />
                          <ErrorMessage
                            name="firstName"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="input-block mb-3">
                          <label className="col-form-label">Surname</label>
                          <Field
                            type="text"
                            className="form-control"
                            id="surname"
                            name="surname"
                            onChange={handleChange}
                          />
                          <ErrorMessage
                            name="surname"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="input-block mb-3">
                          <label className="col-form-label">National Id</label>
                          <Field
                            type="text"
                            className="form-control"
                            id="nationalId"
                            name="nationalId"
                            onChange={handleChange}
                          />
                          <ErrorMessage
                            name="nationalId"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="input-block mb-3">
                          <label className="col-form-label">
                            Employee Code
                          </label>
                          <Field
                            type="text"
                            className="form-control"
                            id="employeeCode"
                            name="employeeCode"
                            onChange={handleChange}
                          />
                          <ErrorMessage
                            name="employeeCode"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="input-block mb-3">
                          <label className="col-form-label">Birth Date</label>
                          <div className="cal-icon">
                            <Field
                              className="form-control datetimepicker"
                              type="text"
                              name="dateOfBirth"
                              id="dateOfBirth"
                              onChange={handleChange}
                            />
                            <ErrorMessage
                              name="dateOfBirth"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="input-block mb-3">
                          <label className="col-form-label">Gender</label>
                          <Field
                            as="select"
                            className="select form-control"
                            id="gender"
                            name="gender"
                            onChange={handleChange}
                          >
                            <option value={""}> {values.gender}</option>
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

                <div className="row">
                  <div className="col-md-12">
                    <div className="input-block mb-3">
                      <label className="col-form-label">Address</label>
                      <Field
                        type="text"
                        className="form-control"
                        name="address"
                        id="address"
                        onChange={handleChange}
                      />
                      <ErrorMessage
                        name="address"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">Email Address</label>
                      <Field
                        type="email"
                        className="form-control"
                        name="email"
                        id="email"
                        onChange={handleChange}
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">Postal City</label>
                      <Field
                        type="text"
                        className="form-control"
                        name="postalCity"
                        id="postalCity"
                        onChange={handleChange}
                      />
                      <ErrorMessage
                        name="postalCity"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">Department</label>
                      <Field
                        as="select"
                        className="select form-control"
                        onChange={handleChange}
                        id="department"
                        name="department"
                      >
                        {employee.department ? (
                          <option value="">{employee.department.name}</option>
                        ) : null}
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

                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Position/Designation
                      </label>
                      <Field
                        as="select"
                        className="select form-control"
                        onChange={handleChange}
                        id="position"
                        name="position"
                      >
                        { employee.position ? (<option value="">{employee.position.name}</option>) : null}
                        
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

                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">Marital Status</label>
                      <Field
                        as="select"
                        className="select form-control"
                        id="maritalStatus"
                        name="maritalStatus"
                        onChange={handleChange}
                      >
                        <option value="">{values.maritalStatus}</option>
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

                  <div className="col-md-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">Phone Number 1</label>
                      <Field
                        type="text"
                        className="form-control"
                        name="phoneNumber1"
                        id="phoneNumber1"
                        value={values.phoneNumber1}
                        onChange={handleChange}
                      />{" "}
                      <ErrorMessage
                        name="phoneNumber1"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">Phone Number 2</label>
                      <Field
                        type="text"
                        className="form-control"
                        name="phoneNumber2"
                        id="phoneNumber2"
                        value={values.phoneNumber2}
                        onChange={handleChange}
                      />{" "}
                      <ErrorMessage
                        name="phoneNumber2"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                  </div>
                </div>

                {loading ? (
                  <Loading />
                ) : (
                  <div className="submit-section">
                    <button
                      className="btn btn-primary submit-btn"
                      type="submit"
                      style={{
                        borderRadius: "10px",
                      }}
                    >
                      Submit
                    </button>
                  </div>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Fragment>
  );
};

export default EditEmployeeFormModal;
