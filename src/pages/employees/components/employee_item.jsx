import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const EmployeeItem = ({ employee }) => {

  
  return (
    <Fragment>
      <tr>
        <td>
          <h2 class="table-avatar">
            <a class="avatar">
              <img src="assets/img/P.png" alt="User Image" />
            </a>
            <Link to={`/employee/${employee.id}`}>
              { employee.first_name} {" "} { employee.surname} 
            </Link>
          </h2>
        </td>
        <td>{ employee.code}</td>
        <td>
         { employee.gender }
        </td>
        <td>{ employee.department.name }</td>
        <td>{ employee.position.name}</td>
        <td>{ employee.phone_number_1}</td>
        <td>
          <a class="btn btn-white btn-sm btn-rounded ">
           { employee.status }
          </a>
        </td>
        <td class="text-end">
          <div class="dropdown dropdown-action">
            <a
              href="#"
              class="action-icon dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="material-icons">more_vert</i>
            </a>
            <div class="dropdown-menu dropdown-menu-right">
              <a
                class="dropdown-item"
                href="#"
                data-bs-toggle="modal"
                data-bs-target="#edit_employee"
              >
                <i class="fa-solid fa-pencil m-r-5"></i> Edit
              </a>
              <a
                class="dropdown-item"
                href="#"
                data-bs-toggle="modal"
                data-bs-target="#delete_employee"
              >
                <i class="fa-regular fa-trash-can m-r-5"></i>
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
