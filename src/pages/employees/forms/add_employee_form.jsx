import React, { Fragment, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { API } from "../../../config";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../../../components/loader/loading";

const maritalStatuses = ["Married", "Single", "Divorced"];
const gender = ["Male", "Female", "Other"];
const empStatus = ["Pending", "Orientation", "Active"];

const AddEmployeeForm = ({}) => {
  const [isLoading, setIsLoading] = useState(false);
  const positions = useSelector((state) => state.position.positions);
  const departments = useSelector((state) => state.department.departments);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      employeeCode: "",
      firstName: "",
      surname: "",
      department: null,
      nationalId: "",
      maritalStatus: "",
      dateOfBirth: "",
      position: null,
      gender: "",
      postalCity: "",
      phoneNumber1: "",
      phoneNumber2: "",
      employeeStatus: "",
    },
    
    validationSchema: Yup.object({
      employeeCode: Yup.string().nullable(),
      firstName: Yup.string().nullable(),
      department: Yup.number().nullable(),
      nationalId: Yup.string().nullable(),
      maritalStatus: Yup.string().nullable(),
      dateOfBirth: Yup.string().nullable(),
      position: Yup.number().nullable(),
      gender: Yup.string().required("Select Gender"),
      postalCity: Yup.string().nullable(),
      employeeStatus: Yup.string().nullable(),
    }),
    onSubmit: async (values) => {
      const postData = {
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
        status: values.employeeStatus,
      };
      console.log(postData);

      try {
        setIsLoading(true);
        const response = await fetch(`${API}/employee`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        });
        const data = await response.json();
        if (response.ok) {
          setIsLoading(false);
          navigate("/employees");
        }
        console.log("data", data);
      } catch (error) {
        console.error("Error Messsage", error);
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <Fragment>
      <div className="container_">
        <form onSubmit={formik.handleSubmit}>
          <div className="row">
            <div className="col-sm-3">
              <div className="input-block mb-3">
                <label className="col-form-label">
                  Employee Code <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="employeeCode"
                  value={formik.values.employeeCode}
                  onChange={formik.handleChange}
                />
                {formik.touched.employeeCode && formik.errors.employeeCode && (
                  <div className="text-danger">
                    {formik.errors.employeeCode}
                  </div>
                )}
              </div>
            </div>

            <div className="col-sm-3">
              <div className="input-block mb-3">
                <label className="col-form-label">
                  First Name <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="firstName"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                />
                {formik.touched.firstName && formik.errors.firstName && (
                  <div className="text-danger">{formik.errors.firstName}</div>
                )}
              </div>
            </div>

            <div className="col-sm-3">
              <div className="input-block mb-3">
                <label className="col-form-label">Surname</label>
                <input
                  className="form-control"
                  type="text"
                  name="surname"
                  value={formik.values.surname}
                  onChange={formik.handleChange}
                />
                {formik.touched.surname && formik.errors.surname && (
                  <div className="text-danger">{formik.errors.surname}</div>
                )}
              </div>
            </div>

            <div className="col-sm-3">
              <div className="input-block mb-3">
                <label className="col-form-label">
                  Department <span className="text-danger">*</span>
                </label>
                <select
                  className="form-select"
                  name="department"
                  value={formik.values.department}
                  onChange={formik.handleChange}
                  style={{
                    height: "45px"
                  }}
                >
                  <option value="">Select Department</option>
                  {departments.map((department) => (
                    <option key={department.id} value={department.id}>
                      {department.name}
                    </option>
                  ))}
                </select>
                {formik.touched.department && formik.errors.department && (
                  <div className="text-danger">{formik.errors.department}</div>
                )}
              </div>
            </div>

            <div className="col-sm-6">
              <div className="input-block mb-3">
                <label className="col-form-label">
                  National Id <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="nationalId"
                  value={formik.values.nationalId}
                  onChange={formik.handleChange}
                />
                {formik.touched.nationalId && formik.errors.nationalId && (
                  <div className="text-danger">{formik.errors.nationalId}</div>
                )}
              </div>
            </div>

            <div className="col-sm-2">
              <div className="input-block mb-3">
                <label className="col-form-label">
                  Marital Status <span className="text-danger">*</span>
                </label>
                <select
                  className="form-select"
                  name="maritalStatus"
                  value={formik.values.maritalStatus}
                  onChange={formik.handleChange}
                  style={{
                    height: "45px"
                  }}
                >
                  <option value=""></option>
                  {maritalStatuses.map((maritalStatus) => (
                    <option key={maritalStatus} value={maritalStatus}>
                      {maritalStatus}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="col-sm-4">
              <div className="input-block mb-3">
                <label className="col-form-label">
                  Date of Birth
                  <span className="text-danger">*</span>
                </label>
                <div className="">
                  <input
                    className="form-control"
                    type="date"
                    name="dateOfBirth"
                    value={formik.values.dateOfBirth}
                    onChange={formik.handleChange}
                  />
                </div>
                {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
                  <div className="text-danger">{formik.errors.dateOfBirth}</div>
                )}
              </div>
            </div>

            <div className="col-sm-4">
              <div className="input-block mb-3">
                <label className="col-form-label">
                  Position <span className="text-danger">*</span>
                </label>
                <select
                  className="form-select"
                  name="position"
                  value={formik.values.position}
                  onChange={formik.handleChange}
                  style={{
                    height: "45px"
                  }}
                >
                  <option value=""></option>
                  {positions.map((position) => (
                    <option key={position.id} value={position.id}>
                      {position.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="col-sm-4">
              <div className="input-block mb-3">
                <label className="col-form-label">
                  Gender <span className="text-danger">*</span>
                </label>
                <select
                  className="form-select"
                  name="gender"
                  value={formik.values.gender}
                  onChange={formik.handleChange}
                  style={{
                    height: "45px"
                  }}
                >
                  <option value=""></option>
                  {gender.map((gender) => (
                    <option key={gender} value={gender}>
                      {gender}
                    </option>
                  ))}
                </select>
                {formik.touched.gender && formik.errors.gender && (
                  <div className="text-danger">{formik.errors.gender}</div>
                )}
              </div>
            </div>

            <div className="col-sm-4">
              <div className="input-block mb-3">
                <label className="col-form-label">
                  Postal City <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="postalCity"
                  value={formik.values.postalCity}
                  onChange={formik.handleChange}
                  className="form-control floating"
                />
                {formik.touched.postalCity && formik.errors.postalCity && (
                  <div className="text-danger">{formik.errors.postalCity}</div>
                )}
              </div>
            </div>

            <div className="col-sm-6">
              <div className="input-block mb-3">
                <label className="col-form-label">Phone Number 1 </label>
                <input
                  type="text"
                  name="phoneNumber1"
                  value={formik.values.phoneNumber1}
                  onChange={formik.handleChange}
                  className="form-control"
                />
                {formik.touched.phoneNumber1 && formik.errors.phoneNumber1 && (
                  <div className="text-danger">
                    {formik.errors.phoneNumber1}
                  </div>
                )}
              </div>
            </div>

            <div className="col-sm-6">
              <div className="input-block mb-3">
                <label className="col-form-label">
                  Phone Number 2 (Optional){" "}
                </label>
                <input
                  type="text"
                  name="phoneNumber2"
                  value={formik.values.phoneNumber2}
                  onChange={formik.handleChange}
                  className="form-control"
                />
                {formik.touched.phoneNumber2 && formik.errors.phoneNumber2 && (
                  <div className="text-danger">
                    {formik.errors.phoneNumber2}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="col-sm-4">
            <div className="input-block mb-3">
              <label className="col-form-label">
                Employement Status <span className="text-danger">*</span>
              </label>
              <select
                className="form-select"
                name="employeeStatus"
                value={formik.values.employeeStatus}
                onChange={formik.handleChange}
                style={{
                  height: "45px"
                }}
              >
                <option value=""></option>
                {empStatus.map((empStatus) => (
                  <option key={empStatus} value={empStatus}>
                    {empStatus}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {isLoading ? (
            <Loading />
          ) : (
            <div className="submit-section">
              <button className="btn btn-primary submit-btn" type="submit">
                Save Employee
              </button>
            </div>
          )}
        </form>
      </div>
    </Fragment>
  );
};

export default AddEmployeeForm;
