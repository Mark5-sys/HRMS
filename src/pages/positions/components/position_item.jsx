import React, { Fragment, useEffect, useState } from "react";

const PositionsItem = ({ position }) => {
  return (
    <Fragment>
      <tr>
        <td>{position.id}</td>
        <td>{position.name}</td>
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
                data-bs-target="#edit_department"
              >
                <i class="fa-solid fa-pencil m-r-5"></i> Edit
              </a>
              <a
                class="dropdown-item"
                href="#"
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

export default PositionsItem;
