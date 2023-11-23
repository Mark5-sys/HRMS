import React, { Fragment, useEffect, useState } from "react";
import EditDepartmentForm from "../forms/edit_department_form";
import { useDispatch } from "react-redux";
import { departmentsActions } from "../../../store/department_store";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const DepartmentItem = ({ department }) => {
  const dispatch = useDispatch();

  const setEditDepartment = (department) => {
    dispatch(
      departmentsActions.setDepartmentEdit({
        departmentEdit: department,
      })
    );
  };

  const editDepartment = () => {
    Swal.fire({
      title: "Edit Department",
      html: `
        <form id="editDepartmentForm">
          <label for="departmentName">Department Name:</label>
          <input type="text" id="departmentName" value="${newDepartmentName}" />
        </form>
      `,
      showCancelButton: true,
      confirmButtonText: "Save",
    }).then((result) => {
      if (result.isConfirmed) {
        const editedDepartment = {
          ...department,
          name: document.getElementById("departmentName").value,
        };
        setEditDepartment(editedDepartment);
        // You may want to dispatch an action to save the changes to the server or update the state accordingly.
      }
    });
  };

  return (
    <Fragment>
      <tr>
        <td>{department.id}</td>
        <td>
          <Link to={`/department/${department.id}`}>{department.name}</Link>
        </td>
        <td class="text-end">
          <div class="dropdown dropdown-action">
            <a
              class="action-icon dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="material-icons">more_vert</i>
            </a>
            <div class="dropdown-menu dropdown-menu-right">
              <a
                class="dropdown-item"
                onClick={() => editDepartment()}
                data-bs-toggle="modal"
                data-bs-target="#editt_department"
              >
                <i class="fa-solid fa-pencil m-r-5"></i> Edit
              </a>
              <a
                class="dropdown-item"
                data-bs-toggle="modal"
                data-bs-target="#delete_department"
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

export default DepartmentItem;
