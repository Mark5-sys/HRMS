import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import Loading from "../../../components/loader/loading";
import { getSingleEmployee } from "../../../services/api";
import { employeesActions } from "../../../store/employee_store";
import { API } from "../../../config";

const EmergencyContactFormModal = ({ employeeId }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    relationship: "",
    phone1: "",
    phone2: "",
  };

  const validationSchema = yup.object().shape({
    name: yup.string().required("Please enter name"),
    relationship: yup.string().required("Please enter relationship"),
    phone1: yup.string().required("Please enter phone number"),
    phone2: yup.string().nullable(),
  });

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    setLoading(true);

    values.employee_id = employeeId;

    try {
      const response = await fetch(`${API}/emergency/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const responseData = await response.json();
      console.log("JSON response", responseData);
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
      setSubmitting(false);
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Emergency Contact</h5>
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
                <div className="card">
                  <div className="card-body">
                    <h3 className="card-title">Emergency Contact</h3>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="input-block mb-3">
                          <label className="col-form-label">
                            Name <span className="text-danger">*</span>
                          </label>
                          <Field
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                          />
                          <ErrorMessage
                            name="name"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="input-block mb-3">
                          <label className="col-form-label">
                            Relationship
                            <span className="text-danger">*</span>
                          </label>
                          <Field
                            className="form-control"
                            type="text"
                            name="relationship"
                            id="relationship"
                          />
                          <ErrorMessage
                            name="relationship"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="input-block mb-3">
                          <label className="col-form-label">
                            Phone <span className="text-danger">*</span>
                          </label>
                          <Field
                            className="form-control"
                            type="text"
                            name="phone1"
                            id="phone1"
                          />
                          <ErrorMessage
                            name="phone1"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="input-block mb-3">
                          <label className="col-form-label">Phone 2</label>
                          <Field
                            className="form-control"
                            type="text"
                            name="phone2"
                            id="phone2"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {loading ? (
                  <Loading />
                ) : (
                  <div className="submit-section">
                    <button className="btn btn-primary submit-btn" type="submit">
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

export default EmergencyContactFormModal;
