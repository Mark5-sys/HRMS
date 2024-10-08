import React, { Fragment, useEffect, useState } from "react";
import { convertToDateWord } from "../../../helpers/helpers";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import orientSlice, { orientActions } from "../../../store/orients_store";

const OrientItem = ({ orientee }) => {
  const dispatch = useDispatch();

  const setOrienteeForDeployemnet = (orientee) => {
    dispatch(
      orientActions.setOrienteeToBeDeployed({
        toBeDeployedOrientee: orientee,
      })
    );
  };

  return (
    <Fragment>
      <tr>
        <td>{orientee.id}</td>
        <td>{convertToDateWord(orientee.created_at)}</td>
        <td
          style={{
            cursor: "pointer",
          }}
        >
          <Link to={`/orientee/${orientee.id}`}>
            {orientee.first_name} {orientee.last_name}
          </Link>
        </td>
        <td>{orientee.gender}</td>
        <td>
          <span className="badge bg-inverse-success">
            {orientee.national_id}
          </span>
        </td>
        <td>
          {orientee.marital_status}
        </td>
        <td>{orientee.qualifications}</td>
        <td>{orientee.phone_1}</td>
        <td>
          <a
            data-bs-target="#deploy_orientee"
            data-bs-toggle="modal"
            onClick={() => setOrienteeForDeployemnet(orientee)}
          >
            {orientee.deployement_status === "Pending" ? (
              <span
                className="badge bg-inverse-danger"
                style={{
                  padding: "6px 9px",
                  borderRadius: "20px",
                }}
              >
                {orientee.deployement_status}
              </span>
            ) : (
              <span
                className="badge bg-inverse-success"
                style={{
                  padding: "6px 9px",
                  borderRadius: "20px",
                }}
              >
                {orientee.deployement_status}
              </span>
            )}
          </a>
        </td>
        <td className="text-end">
          <div className="dropdown dropdown-action">
            <a
              className="action-icon dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="material-icons">:</i>
            </a>
            <div className="dropdown-menu dropdown-menu-right">
              <a
                className="dropdown-item"
                data-bs-toggle="modal"
                data-bs-target="#edit_employee"
              >
                <i className="fa-solid fa-pencil m-r-5"></i> Edit
              </a>
              <a
                className="dropdown-item"
                data-bs-toggle="modal"
                data-bs-target="#delete_employee"
              >
                <i className="fa-regular fa-trash-can m-r-5"></i>
                Delete
              </a>
            </div>
          </div>
        </td>
      </tr>
    </Fragment>
  );
};

export default OrientItem;
