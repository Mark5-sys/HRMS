/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { Fragment } from "react";
import Swal from "sweetalert2";
import { useDeleteDepartmentMutation, useUpdateDepartmentMutation } from "../../../store/api/apiSlice";
import Loading from "../../../components/loader/loading";

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

  const handleDeleteDepartment = async () => {
    await deleteDepartment({ id: department.id })
  }

  return (
    <Fragment>
      { isLoading ? <Loading /> : 
        <tr>
        <td>{department.id}</td>
        <td>{department.name}</td>
        <td className="text-end">
          <div className="dropdown dropdown-action">
            <a
              className="action-icon dropsdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="material-icons">more_vert</i>
            </a>
            <div className="dropdown-menu dropdown-menu-right">
              <a
                className="dropdown-item"
                onClick={() => editDepartment()}
                data-bs-toggle="modal"
                data-bs-target="#edit_fdepartment"
              >
                <i className="fa-solid fa-pencil m-r-5"></i> Edit
              </a>
              <a
                className="dropdown-item"
                onClick={() => handleDeleteDepartment()}
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
