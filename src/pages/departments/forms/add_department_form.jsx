import { Fragment } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import Loading from "../../../components/loader/loading";
import { useAddNewDepartmentMutation } from "../../../store/api/apiSlice";

const AddDepartmentForm = () => {
  const [addNewDepartment, { isLoading }] = useAddNewDepartmentMutation()

  const initialValues = {
    name: "",
  };

  const validationSchema = yup.object().shape({
    name: yup.string().required("Please Enter Department Name"),
  });

  const onSubmit = async (formData, { resetForm }) => {
    const apiData = {
      name: formData.name.toUpperCase(),
    }
    try {
      await addNewDepartment(apiData).unwrap()
        // navigate("/departments");
        resetForm();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <div id="add_department" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Department</h5>
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
                {({ isSubmitting, handleSubmit }) => (
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
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className="submit-section">
                      {isLoading ? (
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
    </Fragment>
  );
};

export default AddDepartmentForm;
