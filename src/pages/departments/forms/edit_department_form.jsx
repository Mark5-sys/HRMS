import React, { Fragment, useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import { API } from "../../../config";
import Loading from "../../../components/loader/loading";
import { useDispatch, useSelector } from "react-redux";
import { getAllDepartments } from "../../../services/api";
import { departmentsActions } from "../../../store/department_store";

const EditDepartmentForm = () => {

  const [loading, setLoading] = useState(false);
  const departmentEdit = useSelector(
    (state) => state.department.departmentEdit
  );
  const [department, setDepartment] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    setDepartment(departmentEdit);
  }, [departmentEdit]);

  const initialValues = {
    name: department.name || "",
  };

  const validationSchema = yup.object().shape({
    name: yup.string().required("Please Enter Department Name"),
  });

  const onSubmitPatch = async (values, { setSubmitting, resetForm }) => {
    setLoading(true);
    console.log("onSubmitPatch", values);
    try {
      const response = await fetch(`${API}/department/${department.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
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
      {department && (
        <div
          id="edit_department"
          className="modal custom-modal fade"
          role="dialog"
          style={{}}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Department </h5>
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
                          Department Name <span className="text-danger">*</span>
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

export default EditDepartmentForm;
