import React, { Fragment, useEffect, useState } from "react";

const LeaveItem = () => {
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
              John Doe <span>Web Designer</span>
            </a>
          </h2>
        </td>
        <td>Medical Leave</td>
        <td>27 Feb 2019</td>
        <td>27 Feb 2019</td>
        <td>1 day</td>
        <td>Going to Hospital</td>
        <td className="text-center">
          <div className="dropdown action-label">
            <a
              className="btn btn-white btn-sm btn-rounded"
              href="#"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fa-regular fa-circle-dot text-success"></i> Approved
            </a>
            <div className="dropdown-menu dropdown-menu-right">
              <a className="dropdown-item" href="#">
                <i className="fa-regular fa-circle-dot text-purple"></i> New
              </a>
              <a className="dropdown-item" href="#">
                <i className="fa-regular fa-circle-dot text-info"></i> Pending
              </a>
              <a
                className="dropdown-item"
                href="#"
                data-bs-toggle="modal"
                data-bs-target="#approve_leave"
              >
                <i className="fa-regular fa-circle-dot text-success"></i>{" "}
                Approved
              </a>
              <a className="dropdown-item" href="#">
                <i className="fa-regular fa-circle-dot text-danger"></i>{" "}
                Declined
              </a>
            </div>
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
