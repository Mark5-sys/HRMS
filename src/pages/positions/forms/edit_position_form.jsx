import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import { getAllPositions } from "../../../services/api";
import { positionsActions } from "../../../store/position_store/positionSlice";
import Loading from "../../../components/loader/loading";
import { API } from "../../../config";
import { useEditPositionMutation } from "../../../store/api/apiSlice";

const EditPositionForm = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const [editPost, { isLoading }] = useEditPositionMutation()

  const position = useSelector((state) => state.position.position);

  const initialValues = {
    name: position.name || "",
  };

  const validationSchema = yup.object().shape({
    name: yup.string().required("Please Enter Position Name"),
  });

  const pascalCase = (str) => {
    return str
      .split(" ")
      .map((word) => {
        if (word.length > 0) {
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }
        return word;
      })
      .join(" ");
  };

  const onSubmitPatch = async (values, { setSubmitting, resetForm }) => {
    setLoading(true);

    const apiValues = {
      name: pascalCase(values.name),
    };

    console.log("onSubmitPatch", apiValues);

    try {
      // const response = await fetch(`${API}/position/${position.id}`, {
      //   method: "PATCH",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(apiValues),
      // });
      // const responseData = await response.json();
      // console.log(responseData.data);
      await editPost({id: position.id, name: apiValues.name})
      // if (response.ok) {
      //   const positions = await getAllPositions();
      //   dispatch(
      //     positionsActions.setPositions({
      //       positions: positions,
      //     })
      //   );
        // setLoading(false);
        console.log(position);
       if (!isLoading) {
        resetForm();
       }
      // }
    } catch (error) {
      console.log(error);
    } finally {
      // setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <Fragment>
      {position && (
        <div
          id="edit_position"
          className="modal custom-modal fade"
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Position </h5>
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
                    touched,
                    errors,
                  }) => (
                    <Form>
                      <div className="input-block mb-3">
                        <label className="col-form-label">
                          Position Name <span className="text-danger">*</span>
                        </label>
                        <Field
                          className="form-control"
                          type="text"
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
                            disabled={isSubmitting}
                            onClick={handleSubmit}
                            style={{
                              borderRadius: "10px",
                            }}
                          >
                            Save Position
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

export default EditPositionForm;
