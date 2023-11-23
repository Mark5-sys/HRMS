import React, { Fragment, useEffect, useState } from "react";
// import EditDepartmentForm from "../forms/edit_department_form";
import { useDispatch } from "react-redux";
import { departmentsActions } from "../../../store/department_store";
import Loading from "../../../components/loader/loading";
import { useDeleteDepartmentMutation, useUpdateDepartmentMutation } from "../../../store/api/apiSlice";
import Swal from "sweetalert2";

const DepartmentItem = ({ department }) => {
  const [updateDepartment, { isLoading }] = useUpdateDepartmentMutation()
  const [deleteDepartment] = useDeleteDepartmentMutation()

  const editDepartment = () => {
    console.log(department.name);
    !isLoading ? Swal.fire({
      title: "edit department",
      html: `
        <form>
          <input type="text" id=${department.id} value=${department.name.replace(/\s/g, '')} />
        </form>
      `,
      confirmButtonText: "Save",
      showCancelButton: true,
      cancelButtonText: "Cancel",
      preConfirm: () => {
        const departmentId = document.getElementById(department.id)
        const departmentName = departmentId.value
        return departmentName
      },
     }).then((result) => {
      if(result.isConfirmed) {
        updateDepartment({id: department.id, name: result.value})
      } else {
        Swal.close()
      }
     }) : <Loading />;
  };

  return (
    <Fragment>
      { isLoading ? <Loading /> : 
        <tr>
        <td>{department.id}</td>
        <td>{department.name}</td>
        <td class="text-end">
          <div class="dropdown dropdown-action">
            <a
              className="action-icon dropsdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="material-icons">more_vert</i>
            </a>
            <div className="dropdown-menu dropdown-menu-right">
              <a
                class="dropdown-item"
                onClick={() => editDepartment()}
                data-bs-toggle="modal"
                data-bs-target="#edit_department"
              >
                <i className="fa-solid fa-pencil m-r-5"></i> Edit
              </a>
              <a
                class="dropdown-item"
                href="#"
                data-bs-toggle="modal"
                data-bs-target="#delete_fdepartment"
              >
                <i className="fa-regular fa-trash-can m-r-5"></i>
                Delete
              </a>
            </div>
          </div>
        </td>
      </tr>
      }
    </Fragment>
  );
};

export default DepartmentItem;
