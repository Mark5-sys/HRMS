import React, { Fragment, useEffect, useState } from "react";

const LeaveSettingsItem = ({ employee }) => {
  return (
    <Fragment>
      <tr>
        <td>{ employee.value }</td>
        <td>
          <a class="avatar">
            <img src="assets/img/user.jpg" alt="User Image" />
          </a>
          <a>{ employee.label }</a>
        </td>
        <td>{ employee.employeeCode} </td>
        <td>{ employee.department}</td>
        <td>{ employee.leaveBalance.opening_bal.toFixed(2)}</td>
        <td>{ employee.leaveBalance.closing_bal.toFixed(2)}</td>

        <td class="text-end">
          <div class="dropdown dropdown-action">
            <a
              aria-expanded="false"
              data-bs-toggle="dropdown"
              class="action-icon dropdown-toggle"
            >
              <i class="material-icons">more_vert</i>
            </a>
            <div class="dropdown-menu dropdown-menu-right">
              <a
                class="dropdown-item"
                data-bs-toggle="modal"
                data-bs-target="#edit_custom_policy"
              >
                <i class="fa-solid fa-pencil m-r-5"></i> Edit
              </a>
              <a
                class="dropdown-item"
                data-bs-toggle="modal"
                data-bs-target="#delete_custom_policy"
              >
                <i class="fa-regular fa-trash-can m-r-5"></i> Delete
              </a>
            </div>
          </div>
        </td>
      </tr>
    </Fragment>
  );
};

export default LeaveSettingsItem;
