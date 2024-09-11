import React from "react";
import { Link } from "react-router-dom";

const ClientsItem = ({ client }) => {
  return (
    <>
      <tr>
        <td>{client.id}</td>
        <td>{client.name}</td>
        <td
          style={{
            cursor: "pointer",
          }}
        >
          <Link to={`/`}>{client.address}</Link>
        </td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>

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
                data-bs-toggle="modal"
                data-bs-target="#edit_department"
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
    </>
  );
};

export default ClientsItem;
