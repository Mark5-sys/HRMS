import React, { Fragment, useEffect, useState } from "react";
import { formatDateShort } from "../../../helpers/helpers";

const LeaveItem = ({ leave }) => {
  const leaveStatus = (status) => {
    if (status === "New") {
      return (
        <a className="dropdown-item">
          <i className="fa-regular fa-circle-dot text-purple"></i> {status}
        </a>
      );
    } else if (status === "Pending") {
      return (
        <a className="dropdown-item">
          <i className="fa-regular fa-circle-dot text-info"></i> {status}
        </a>
      );
    } else if (status === "Approved") {
      return (
        <a className="dropdown-item">
          <i className="fa-regular fa-circle-dot text-success"></i> Approved
        </a>
      );
    } else {
      return (
        <a className="dropdown-item">
          <i className="fa-regular fa-circle-dot text-danger"></i> {status}
        </a>
      );
    }
  };

  return (
    <Fragment>
      <tr className="odd">
        <td className="sorting_1">
          <h2 className="table-avatar">
            <a href="profile.html" className="avatar">
              <img src="assets/img/user.jpg" alt="User Image" />
            </a>
            <a>
              {" "}
              {leave.employee.first_name} {leave.employee.surname} <span></span>
            </a>
          </h2>
        </td>
        <td>{leave.leave_type.name}</td>
        <td>{formatDateShort(leave.start_date)}</td>
        <td>{formatDateShort(leave.end_date)}</td>
        <td>{leave.duration} day (s)</td>
        <td>{leave.reason}</td>
        <td className="text-center">
          <div className="dropdown action-label btn btn-white btn-sm btn-rounded">
            {leaveStatus(leave.status)}
          </div>
        </td>
        <td className="text-end">
          <div className="dropdown dropdown-action">
            <a
              href="#"
              className="action-icon dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="material-icons">more_vert</i>
            </a>
            <div className="dropdown-menu dropdown-menu-right">
              <a
                className="dropdown-item"
                href="#"
                data-bs-toggle="modal"
                data-bs-target="#edit_leave"
              >
                <i className="fa-solid fa-pencil m-r-5"></i> Edit
              </a>
              <a
                className="dropdown-item"
                href="#"
                data-bs-toggle="modal"
                data-bs-target="#delete_approve"
              >
                <i className="fa-regular fa-trash-can m-r-5"></i> Delete
              </a>
            </div>
          </div>
        </td>
      </tr>
    </Fragment>
  );
};

export default LeaveItem;
