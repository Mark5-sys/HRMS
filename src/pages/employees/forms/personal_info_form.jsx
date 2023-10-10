import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import Loading from "../../../components/loader/loading";
import { API } from "../../../config";
import { getSingleEmployee } from "../../../services/api";
import { employeesActions } from "../../../store/employee_store";

const PersonalInfoFormModal = ({ employeeId }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    passport_number: "",
    nationality: "",
    religion: "",
    spouse_employment: null,
    no_children: 0,
  };

  const validationSchema = yup.object().shape({
    passport_number: yup.string().nullable(),
    nationality: yup.string().nullable(),
    religion: yup.string().nullable(),
    spouse_employment: yup.boolean().nullable(),
    no_children: yup.number().nullable(),
  });

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    setLoading(true);

    const infoData = {
      passport_number: values.passport_number,
      nationality: values.nationality,
      religion: values.religion,
      spouse_employment: Boolean(values.spouse_employment),
      no_children: values.no_children,
    };

    infoData.employee_id = employeeId;

    console.log("Submitted", infoData);
    // personal/info
    try {
      const response = await fetch(`${API}/personal/info`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(infoData),
      });

      const responseData = await response.json();
      if(response.ok){
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
    }
  };

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
                        onChange={handleChange}
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
                        onChange={handleChange}
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
                        onChange={handleChange}
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
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Spouse Employment
                      </label>
                      <Field
                        as="select"
                        className="form-control"
                        name="spouse_employment"
                        id="spouse_employment"
                        onChange={handleChange}
                      >
                        <option value="">Select an option</option>
                        <option value="true">Employed</option>
                        <option value="false">Unemployed</option>
                      </Field>
                      <ErrorMessage
                        name="spouse_employment"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                  </div>
                </div>
                <div class="submit-section">
                  {loading ? (
                    <Loading />
                  ) : (
                    <button class="btn btn-primary submit-btn" type="submit">
                      Submit
                    </button>
                  )}
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
