import React, { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import Loading from "../../../components/loader/loading";
import { API } from "../../../config";
import { getSingleEmployee } from "../../../services/api";
import { employeesActions } from "../../../store/employee_store";
import {
  useGetEmployeesQuery,
  useUpdatePersonalInfoMutation,
} from "../../../store/api/employeeSlice";

const PersonalInfoFormModal = ({ employeeId, showModal, handleClose }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [updatePersonalInfo, { isLoading }] = useUpdatePersonalInfoMutation();

 


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

    const initialInfo = {
      passport_number: values.passport_number,
      nationality: values.nationality,
      religion: values.religion,
      spouse_employment: Boolean(values.spouse_employment),
      no_children: values.no_children,
    };

    try {
      const result = await updatePersonalInfo({
        initialInfo,
        employeeId,
      }).unwrap();

    
      resetForm();

     
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  return (
    <Fragment>
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Personal Information</h5>
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
                  <div className="col-md-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Passport No (Optional)
                      </label>
                      <Field
                        type="text"
                        className="form-control"
                        name="passport_number"
                        id="passport_number"
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">Nationality</label>
                      <Field
                        type="text"
                        className="form-control"
                        name="nationality"
                        id="nationality"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">Religion</label>
                      <Field
                        type="text"
                        className="form-control"
                        name="religion"
                        id="religion"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Number of Children
                      </label>
                      <Field
                        type="number"
                        className="form-control"
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
                <div className="submit-section">
                  {loading ? (
                    <Loading />
                  ) : (
                    <button
                      className="btn btn-primary submit-btn"
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
    </Fragment>
  );
};

export default PersonalInfoFormModal;
