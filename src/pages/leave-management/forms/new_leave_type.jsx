import React, { Fragment, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { API } from "../../../config";
import { getAllLeaveTypes } from "../../../services/api";
import { leavesActions } from "../../../store/leave_store";
import Loading from "../../../components/loader/loading";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const availableTimes = [
  {
    id: 1,
    name: "Half Day",
  },
  {
    id: 2, // Should be a unique id
    name: "Full Day",
  },
  {
    id: 3, // Should be a unique id
    name: "Hours",
  },
];

const NewLeaveTypeForm = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const initialValues = {
    name: "",
    description: "",
    payroll_code: "",
    available_time_id: "",
  };
  const validationSchema = yup.object().shape({
    name: yup.string().required("Please provide a name of the leave"),
  });

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    const leaveTypeData = {
      name: values.name,
      description: values.description,
      payroll_code: values.payroll_code,
      available_time_id: parseInt(values.available_time_id),
    };

    setLoading(true);
    try {
      const response = await fetch(`${API}/leave/type`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(leaveTypeData),
      });

      const responseData = await response.json();
      if (response.ok) {
        const leaveTypes = await getAllLeaveTypes();
        dispatch(
          leavesActions.setLeaveTypes({
            leaveTypes: leaveTypes,
          })
        );

        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Created a new leave type.",
          timer: 4000,
          confirmButtonColor: "#007a41",
        });
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
        id="add_leave_type"
        className="modal custom-modal fade"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">ADD NEW LEAVE TYPE</h5>
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
                {({ isSubmitting }) => (
                  <Form>
                    <div className="row">
                      <div className="col-sm-8 mb-3">
                        <div className="form-floating">
                          <Field
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                          />
                          <label className="col-form-label" htmlFor="name">
                            Leave Name
                          </label>
                        </div>
                      </div>
                      <div className="col-sm-4 mb-3">
                        <div className="form-floating">
                          <Field
                            type="text"
                            className="form-control"
                            id="payroll_code"
                            name="payroll_code"
                            disabled={true}
                          />
                          <label
                            className="col-form-label"
                            htmlFor="payroll_code"
                          >
                            Payroll Code
                          </label>
                        </div>
                      </div>
                      <div className="col-sm-12 mb-3">
                        <div className="form-floating">
                          <Field
                            type="text"
                            className="form-control"
                            id="description"
                            name="description"
                          />
                          <label
                            className="col-form-label"
                            htmlFor="description"
                          >
                            Leave Description
                          </label>
                        </div>
                      </div>

                      <div className="col-sm-4 mb-3">
                        <div className="form-floating">
                          <Field
                            as="select"
                            className="form-select"
                            id="available_time_id"
                            name="available_time_id"
                          >
                            <option value=""></option>
                            {availableTimes.map((availableTime) => (
                              <option
                                key={availableTime.id}
                                value={availableTime.id}
                              >
                                {availableTime.name}
                              </option>
                            ))}
                          </Field>
                          <label className="col-form-label">
                            Available Time
                          </label>
                        </div>
                      </div>
                    </div>

                    {loading ? (
                      <Loading />
                    ) : (
                      <button
                        type="submit"
                        className="btn btn-primary submit-btn mt-3"
                        style={{
                          borderRadius: "10px",
                        }}
                        disabled={isSubmitting}
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

export default NewLeaveTypeForm;
