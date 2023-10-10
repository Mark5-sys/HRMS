import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import Loading from "../../../components/loader/loading";
import { API } from "../../../config";
import { getSingleEmployee } from "../../../services/api";
import { employeesActions } from "../../../store/employee_store";

const educationLevels = [
  "Grade 7",
  "ZJC",
  "Form 4",
  "Form 6",
  "Polytechnic",
  "Bachelors Degree",
  "Masters Degree",
  "Phd",
];

const AddEducationalInfo = ({ employeeId }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    school: "",
    start_date: "",
    end_date: "",
    educational_level: "",
    results: "",
    grade: "",
  };

  const validationSchema = yup.object().shape({
    school: yup.string().nullable(),
    start_date: yup.string().nullable(),
    end_date: yup.string().nullable(),
    educational_level: yup.string().required("Select the level of education"),
    results: yup.string().nullable(),
    grade: yup.string().nullable(),
  });

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    setLoading(true);
    console.log("submit", values);

    try {
      
      values.employee_id = employeeId;

      const response = await fetch(`${API}/qualifications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const responseData = await response.json();
      console.log("responseData", responseData);
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
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <Fragment>
      <div id="education_info" class="modal custom-modal fade" role="dialog">
        <div
          class="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Education Informations</h5>
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
                    <div class="form-scroll">
                      <div class="card">
                        <div class="card-body">
                          <h3 class="card-title">
                            Education Informations
                            <a class="delete-icon">
                              <i class="fa-regular fa-trash-can"></i>
                            </a>
                          </h3>

                          <div class="row">
                            <div class="col-md-6">
                              <div class="input-block mb-3 form-focus focused">
                                <Field
                                  type="text"
                                  class="form-control floating"
                                  name="school"
                                  id="school"
                                />
                                <ErrorMessage
                                  name="school"
                                  component="div"
                                  className="text-danger"
                                />
                                <label class="focus-label">
                                  Institution / School
                                </label>
                              </div>
                            </div>

                            <div class="col-md-6">
                              <div class="input-block mb-3 form-focus focused">
                                <Field
                                  as="select"
                                  class="form-control floating"
                                  name="educational_level"
                                  id="educational_level"
                                >
                                  <option value=""></option>
                                  {educationLevels.map((level) => (
                                    <option key={level} value={level}>
                                      {level}
                                    </option>
                                  ))}
                                </Field>
                                <ErrorMessage
                                  name="educational_level"
                                  component="div"
                                  className="text-danger"
                                />
                                <label class="focus-label">
                                  Education Level (Grade 7, Form 4 ...)
                                </label>
                              </div>
                            </div>

                            <div class="col-md-6 mt-3">
                              <div class="input-block mb-3 form-focus focused">
                                <div class="cal-icon">
                                  <Field
                                    type="text"
                                    name="start_date"
                                    id="start_date"
                                    class="form-control floating"
                                  />
                                  <ErrorMessage
                                    name="start_date"
                                    component="div"
                                    className="text-danger"
                                  />
                                </div>
                                <label class="focus-label">Starting Year</label>
                              </div>
                            </div>

                            <div class="col-md-6  mt-3">
                              <div class="input-block mb-3 form-focus focused">
                                <div class="cal-icon">
                                  <Field
                                    type="text"
                                    class="form-control floating "
                                    id="end_date"
                                    name="end_date"
                                  />
                                  <ErrorMessage
                                    name="end_date"
                                    component="div"
                                    className="text-danger"
                                  />
                                </div>
                                <label class="focus-label">End Year</label>
                              </div>
                            </div>

                            <div class="col-md-12 mt-3">
                              <div class="input-block mb-3 form-focus focused">
                                <Field
                                  type="text"
                                  name="results"
                                  id="results"
                                  class="form-control floating"
                                />
                                <label class="focus-label">Results</label>
                                <ErrorMessage
                                  name="results"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                            </div>

                            <div class="col-md-6">
                              <div class="input-block mb-3 form-focus focused">
                                <Field
                                  type="text"
                                  name="grade"
                                  id="grade"
                                  class="form-control floating"
                                />
                                <label class="focus-label">Grade</label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="submit-section">
                      {loading ? (
                        <Loading />
                      ) : (
                        <button
                          class="btn btn-primary submit-btn"
                          type="submit"
                        >
                          Submit
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
    </Fragment>
  );
};

export default AddEducationalInfo;
