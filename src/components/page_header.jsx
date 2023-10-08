import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PageHeader = ({ activePage, toggleModal, modalName }) => {
  return (
    <Fragment>
      <div class="page-header">
        <div class="row align-items-center">
          <div class="col">
            <h3 class="page-title">{ activePage }</h3>
            <ul class="breadcrumb">
              <li class="breadcrumb-item">
                <Link to={"/"}>Dashboard</Link>
              </li>
              <li class="breadcrumb-item active">{activePage}</li>
            </ul>
          </div>
          <div class="col-auto float-end ms-auto">
            <a
              href="#"
              class="btn add-btn"
              data-bs-toggle="modal"
              data-bs-target={toggleModal}
            >
              <i class="fa-solid fa-plus"></i> { modalName }
            </a>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PageHeader;

// #add_department
