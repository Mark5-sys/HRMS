import React, { Fragment, useEffect, useState } from "react";
import * as yup from "yup";
import { API } from "../../../config";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { orientActions } from "../../../store/orients_store";
import Loading from "../../../components/loader/loading";
import { getAllOrients } from "../../../services/api";

const gender = ["Male", "Female"];

const NewOrientForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    first_name: "",
    last_name: "",
    qualifications: "",
    deployement_status: "Pending",
    gender: "",
    company: "",
    date_of_birth: "",
    address: "",
    phone_1: "",
    phone_2: "",
  };

  const validationSchema = yup.object().shape({
    first_name: yup.string().required("Please enter first name"),
    last_name: yup.string().required("Please enter last name"),
    qualifications: yup.string().nullable(),
    gender: yup.string().required("Please Select Gender"),
    company: yup.string().nullable(),
    date_of_birth: yup.date().nullable(),
    address: yup.string().nullable(),
    phone_1: yup.string().nullable(),
    phone_2: yup.string().nullable(),
  });

  const pascalCase = (str) => {
    return str
      .split(" ")
      .map((word) => {
        if (word.length > 0) {
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }
        return word;
      })
      .join(" ");
  };

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    const postData = {
      first_name: values.first_name.toUpperCase(),
      last_name: values.last_name.toUpperCase(),
      qualifications: pascalCase(values.qualifications),
      gender: values.gender,
      company: values.company.toLowerCase(),
      date_of_birth: values.date_of_birth,
      address: pascalCase(values.address),
      phone_1: values.phone_1,
      phone_2: values.phone_2,
      deployement_status: values.deployement_status
    };

    console.log(postData)
    setLoading(true);
    try {
      const response = await fetch(`${API}/orientation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      const responseData = await response.json();
      console.log(responseData.data);
      if (response.ok) {
        //dispatch actions here

        const orientsAll = await getAllOrients();
        dispatch(
          orientActions.setOrients({
            orients: orientsAll,
          })
        );
      }

      setLoading(false);
      resetForm();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };
  return (
    <Fragment>
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
                <div className="col-md-8">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="input-block mb-3">
                        <label className="col-form-label">First Name</label>
                        <Field
                          type="text"
                          className="form-control"
                          id="first_name"
                          name="first_name"
                        />
                        <ErrorMessage
                          name="first_name"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="input-block mb-3">
                        <label className="col-form-label">Last Name</label>
                        <Field
                          type="text"
                          className="form-control"
                          id="last_name"
                          name="last_name"
                        />
                        <ErrorMessage
                          name="last_name"
                          component="div"
                          className="text-danger"
                        />
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

                  <div className="row">
                    <div className="col-md-12">
                      <div className="input-block mb-3">
                        <label className="col-form-label">Address</label>
                        <Field
                          type="text"
                          className="form-control"
                          id="address"
                          name="address"
                          onChange={handleChange}
                        />
                        <ErrorMessage
                          name="address"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="input-block mb-3">
                        <label className="col-form-label">Date of Birth</label>
                        <div className="">
                          <Field
                            className="form-control datetimepicker"
                            type="date"
                            name="date_of_birth"
                            id="date_of_birth"
                            onChange={handleChange}
                          />
                          <ErrorMessage
                            name="date_of_birth"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-md-8">
                      <div className="input-block mb-3">
                        <label className="col-form-label">Qualifications</label>
                        <Field
                          type="text"
                          className="form-control"
                          id="qualifications"
                          name="qualifications"
                          onChange={handleChange}
                        />
                        <ErrorMessage
                          name="qualifications"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="input-block mb-3">
                        <label className="col-form-label">Phone Number 1</label>
                        <Field
                          type="text"
                          className="form-control"
                          name="phone_1"
                          id="phone_1"
                        />{" "}
                        <ErrorMessage
                          name="phone_1"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="input-block mb-3">
                        <label className="col-form-label">
                          Phone Number 2 (Optional)
                        </label>
                        <Field
                          type="text"
                          className="form-control"
                          name="phone_2"
                          id="phone_2"
                        />{" "}
                        <ErrorMessage
                          name="phone_2"
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
    </Fragment>
  );
};

export default NewOrientForm;
