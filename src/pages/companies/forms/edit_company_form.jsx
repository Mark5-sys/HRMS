import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API } from "../../../config";
import { getAllCompanies } from "../../../services/api";
import { companyActions } from "../../../store/companies_store";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import Loading from "../../../components/loader/loading";

const EditCompanyForm = ({}) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const companyEdit = useSelector((state) => state.company.companyEdit);

  const initialValues = {
    name: companyEdit.name || "",
  };

  const validationSchema = yup.object().shape({
    name: yup.string().required("Please Enter Company Name"),
  });

  const onSubmitPatch = async (values, { setSubmitting, resetForm }) => {
    setLoading(true);

    const apiValues = {
      name: values.name.toUpperCase()
    };

    console.log("onSubmitPatch", apiValues);

    try {
      const response = await fetch(`${API}/company/${companyEdit.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiValues),
      });
      const responseData = await response.json();
      console.log(responseData.data);
      if (response.ok) {
        const companies = await getAllCompanies();
        dispatch(
          companyActions.setCompanies({
            companies: companies,
          })
        );

        setLoading(false);
        resetForm();
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
      {companyEdit && (
        <div
          id="edit_department"
          className="modal custom-modal fade"
          role="dialog"
          style={{}}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Company </h5>
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
                  onSubmit={onSubmitPatch}
                  validationSchema={validationSchema}
                >
                  {({ values, isSubmitting, handleSubmit, handleChange }) => (
                    <Form>
                      <div className="input-block mb-3">
                        <label className="col-form-label">
                          Company Name <span className="text-danger">*</span>
                        </label>
                        <Field
                          type="text"
                          className="form-control"
                          name="name"
                          id="name"
                          value={values.name}
                          onChange={handleChange}
                        />
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="submit-section">
                        {loading ? (
                          <Loading />
                        ) : (
                          <button
                            className="btn btn-primary submit-btn"
                            type="submit"
                            disabled={isSubmitting}
                            onClick={handleSubmit}
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
      )}
    </Fragment>
  );
};

export default EditCompanyForm;
