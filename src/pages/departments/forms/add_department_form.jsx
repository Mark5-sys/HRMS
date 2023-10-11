import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import { API } from "../../../config";
import Loading from "../../../components/loader/loading";
import { getAllDepartments } from "../../../services/api";
import { departmentsActions } from "../../../store/department_store";

const AddDepartmentForm = ({}) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    name: "",
  };

  const validationSchema = yup.object().shape({
    name: yup.string().required("Please Enter Department Name"),
  });

  const onSubmit = async (formData, { setSubmitting, resetForm }) => {
    const apiData = {
      name: formData.name.toUpperCase(),
    }
    setLoading(true);
    try {
      const response = await fetch(`${API}/department`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiData),
      });
      const responseData = await response.json();
      console.log(responseData.data);
      if (response.ok) {
        const departments = await getAllDepartments();
        dispatch(
          departmentsActions.setDepartments({
            departments: departments,
          })
        );
        // navigate("/departments");
        setLoading(false)
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
      <div id="add_department" class="modal custom-modal fade" role="dialog">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Add Department</h5>
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
                    <div class="input-block mb-3">
                      <label class="col-form-label">
                        Department Name <span class="text-danger">*</span>
                      </label>
                      <Field
                        type="text"
                        className="form-control"
                        name="name"
                        id="name"
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div class="submit-section">
                      {loading ? (
                        <Loading />
                      ) : (
                        <button
                          class="btn btn-primary submit-btn"
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
    </Fragment>
  );
};

export default AddDepartmentForm;
