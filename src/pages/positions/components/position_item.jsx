import React, { Fragment, useEffect, useState } from "react";

const PositionsItem = ({ position }) => {
  return (
    <Fragment>
      <tr>
        <td>{position.id}</td>
        <td>{position.name}</td>
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
                data-bs-target="#edit_department"
              >
                <i className="fa-solid fa-pencil m-r-5"></i> Edit
              </a>
              <a
                className="dropdown-item"
                href="#"
                data-bs-toggle="modal"
                data-bs-target="#delete_department"
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

export default PositionsItem;
