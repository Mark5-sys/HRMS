import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const OrientsPage = () => {
  return (
    <Fragment>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="page-title">Orients</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to={"/"}>Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Orients</li>
                </ul>
              </div>
              <div className="col-auto float-end ms-auto">
                <Link to={"/add/orient"} href="#" className="btn add-btn">
                  <i className="fa-solid fa-plus"></i> Add New Orient
                </Link>
                <div className="view-icons"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default OrientsPage;
