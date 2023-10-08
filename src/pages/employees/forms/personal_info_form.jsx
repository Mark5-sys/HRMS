import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";

const PersonalInfoFormModal = ({}) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    passport_number: "",
    nationality: "",
    religion: "",
    spouse_employment: null,
    no_children: null,
  };

  const validationSchema = yup.object().shape({
    passport_number: yup.string().nullable(),
    nationality: yup.string().nullable(),
    religion: yup.string().nullable(),
    spouse_employment: yup.boolean().nullable(),
    no_children: yup.number().nullable(),
  });

  const onSubmit = async (values, {}) => {};

  return (
    <Fragment>
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Personal Information</h5>
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
                <div className="row">
                  <div class="col-md-6">
                    <div class="input-block mb-3">
                      <label class="col-form-label">
                        Passport No (Optional)
                      </label>
                      <Field
                        type="text"
                        class="form-control"
                        name="passport_number"
                        id="passport_number"
                      />
                    </div>
                  </div>

                  <div class="col-md-6">
                    <div class="input-block mb-3">
                      <label class="col-form-label">Nationality</label>
                      <Field
                        type="text"
                        class="form-control"
                        name="nationality"
                        id="nationality"
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="input-block mb-3">
                      <label class="col-form-label">Religion</label>
                      <Field
                        type="text"
                        class="form-control"
                        name="religion"
                        id="religion"
                      />
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="input-block mb-3">
                      <label class="col-form-label">Number of Children</label>
                      <Field
                        type="number"
                        class="form-control"
                        name="no_children"
                        id="no_children"
                      />
                    </div>
                  </div>
                </div>
                <div class="submit-section">
                  <button class="btn btn-primary submit-btn">Submit</button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Fragment>
  );
};

export default PersonalInfoFormModal;
