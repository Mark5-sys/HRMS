import React, { Fragment, useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { API } from "../../../config";
import Loading from "../../../components/loader/loading";
import { orientActions } from "../../../store/orients_store";
import { getAllOrients } from "../../../services/api";

const DeployOrienteeModal = () => {
  const companies = useSelector((state) => state.company.companies);
  const readyOrientee = useSelector(
    (state) => state.orientation.toBeDeployedOrientee
  );
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const initialValues = {
    deployement_status: "",
    company: "",
  };

  const validationSchema = yup.object().shape({
    deployement_status: yup
      .string()
      .required("Please select deployment status"),
  });

  const onSubmitPatch = async (values, { setSubmitting, resetForm }) => {
    setLoading(true);
    const apiValues = {
      company_id: parseInt(values.company),
      deployement_status: values.deployement_status,
    };
    console.log(apiValues);
    try {
      const response = await fetch(
        `${API}/orientee/deploy/${readyOrientee.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(apiValues),
        }
      );
      const responseData = await response.json();
      console.log(responseData);
      if (response.ok) {
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
      <div
        id="deploy_orientee"
        className="modal custom-modal fade"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-start">Deploy Orientee</h5>
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
                onSubmit={onSubmitPatch}
                validationSchema={validationSchema}
              >
                {({
                  values,
                  isSubmitting,
                  handleSubmit,
                  handleChange,
                  touched,
                  errors,
                }) => (
                  <Form>
                    <div className="col-md-12">
                      <div className="form-floating">
                        <Field
                          as="select"
                          className={`form-select ${
                            touched.deployement_status &&
                            errors.deployement_status
                              ? "error-input"
                              : ""
                          }`}
                          id="deployement_status"
                          name="deployement_status"
                        >
                          <option value=""></option>
                          <option value="Pending">PENDING</option>
                          <option value="Deployed">DEPLOY</option>
                        </Field>
                        <label htmlFor="deployement_status">
                          DEPLOY ORIENTEE
                        </label>
                        <ErrorMessage
                          name="deployement_status"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </div>
                    {/* { deployement_status === "Deployed" &&  } */}
                    <div className="col-md-12 mt-3">
                      <div className="form-floating">
                        <Field
                          as="select"
                          className={`form-select ${
                            touched.company && errors.company
                              ? "error-input"
                              : ""
                          }`}
                          id="company"
                          name="company"
                          style={{
                            display:
                              values.deployement_status === "Deployed"
                                ? "block"
                                : "none",
                          }}
                        >
                          <option value=""></option>
                          {companies.map((company) => (
                            <option key={company.id} value={company.id}>
                              {company.name}
                            </option>
                          ))}
                        </Field>
                        <label
                          htmlFor="company_id"
                          style={{
                            display:
                              values.deployement_status === "Deployed"
                                ? "block"
                                : "none",
                          }}
                        >
                          COMPANY NAME
                        </label>
                        <ErrorMessage
                          name="company_id"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </div>

                    <div style={{ marginBottom: "15px" }}></div>
                    {loading ? (
                      <Loading />
                    ) : (
                      <button
                        className="btn btn-primary submit-btn"
                        type="submit"
                        style={{
                          borderRadius: "10px",
                          zIndex: "1000",
                        }}
                      >
                        Submit
                      </button>
                    )}
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

export default DeployOrienteeModal;
