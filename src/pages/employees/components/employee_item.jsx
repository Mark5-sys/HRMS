import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const EmployeeItem = ({ employee }) => {
  return (
    <Fragment>
      <tr>
        <td>
          <h2 className="table-avatar">
            <a className="avatar">
              <img src="assets/img/user.jpg" alt="User Image" />
            </a>
            <Link to={`/employee/${employee.id}`}>
              {employee.first_name} {employee.surname}
            </Link>
          </h2>
        </td>
        <td>{employee.code}</td>
        <td>{employee.gender}</td>
        <td>{employee.department.name}</td>
        <td>{employee.position.name}</td>
        <td>{employee.phone_number_1}</td>
        <td>
          <span
            className="badge badge-pill badge-success"
            style={{
              padding: "6px 9px",
              borderRadius: "20px",
            }}
          >
            {employee.status}
          </span>
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
                data-bs-target="#edit_employee"
              >
                <i className="fa-solid fa-pencil m-r-5"></i> Edit
              </a>
              <a
                className="dropdown-item"
                href="#"
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

export default EmployeeItem;
