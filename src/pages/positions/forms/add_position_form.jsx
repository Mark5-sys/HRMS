import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import { API } from "../../../config";
import { getAllPositions } from "../../../services/api";
import Loading from "../../../components/loader/loading";
import { positionsActions } from "../../../store/position_store/positionSlice";

const AddPositionForm = ({}) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    name: "",
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

  const onSubmit = async (formData, { setSubmitting, resetForm }) => {
    setLoading(true);

    const apiData = {
      name: pascalCase(formData.name),
    };

    try {
      const response = await fetch(`${API}/position`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiData),
      });

      const responseData = await response.json();
      console.log(responseData.data);
      if (response.ok) {
        const positions = await getAllPositions();
        dispatch(
          positionsActions.setPositions({
            positions: positions,
          })
        );
      }
      navigate("/positions");
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
      <div id="add_position" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add New Position</h5>
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
                {({ values, isSubmitting, handleSubmit, touched, errors }) => (
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
                      {loading ? (
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
                          Save Designation
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

export default AddPositionForm;
