import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import Loading from "../../../components/loader/loading";

const EmergencyContactFormModal = ({}) => {
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

  const onSubmit = async (values, {}) => {};

  return (
    <Fragment>
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Emergency Contact</h5>
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
                <div class="card">
                  <div class="card-body">
                    <h3 class="card-title">Emergency Contact</h3>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="input-block mb-3">
                          <label class="col-form-label">
                            Name <span class="text-danger">*</span>
                          </label>
                          <Field
                            type="text"
                            class="form-control"
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

                      <div class="col-md-6">
                        <div class="input-block mb-3">
                          <label class="col-form-label">
                            Relationship
                            <span class="text-danger">*</span>
                          </label>
                          <Field
                            class="form-control"
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

                      <div class="col-md-6">
                        <div class="input-block mb-3">
                          <label class="col-form-label">
                            Phone <span class="text-danger">*</span>
                          </label>
                          <Field
                            class="form-control"
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

                      <div class="col-md-6">
                        <div class="input-block mb-3">
                          <label class="col-form-label">Phone 2</label>
                          <Field
                            class="form-control"
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
                  <div class="submit-section">
                    <button class="btn btn-primary submit-btn" type="submit">
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
