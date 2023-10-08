import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import { API } from "../../../config";
import Loading from "../../../components/loader/loading";

const EditDepartmentForm = ({}) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const departmentEdit =
    useSelector((state) => state.department.departmentEdit);

  const initialValues = {
    name: departmentEdit.name,
  };

  const validationSchema = yup.object().shape({
    name: yup.string().required("Please Enter Department Name"),
  });

  const onSubmitPatch = async (
    departmentEdit,
    { setSubmitting, resetForm }
  ) => {
    setLoading(true);
    try {
      const response = await fetch(`${API}/department/${departmentEdit.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
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
      <div
        id="edit_department"
        class="modal custom-modal fade"
        role="dialog"
        style={{}}
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Edit Department</h5>
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
                onSubmit={onSubmitPatch}
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
              {/* <form>
                <div class="input-block mb-3">
                  <label class="col-form-label">
                    Department Name <span class="text-danger">*</span>
                  </label>
                  <input
                    class="form-control"
                    value="IT Management"
                    type="text"
                  />
                </div>
                <div class="submit-section">
                  <button class="btn btn-primary submit-btn">Save</button>
                </div>
              </form> */}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditDepartmentForm;
