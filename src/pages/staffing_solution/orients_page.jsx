import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OrinetsTable from "./components/orients_table";
import { useDispatch } from "react-redux";
import { getAllCompanies, getAllOrients } from "../../services/api";
import { orientActions } from "../../store/orients_store";
import { companyActions } from "../../store/companies_store";

const OrientsPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const orientsAll = await getAllOrients();
      const companies = await getAllCompanies();
      dispatch(
        orientActions.setOrients({
          orients: orientsAll,
        })
      );

      dispatch(
        companyActions.setCompanies({
          companies: companies,
        })
      );
    };

    fetchData();
  }, []);

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
                <Link
                  to={"/add/orient"}
                  href="#"
                  className="btn add-btn"
                  style={{
                    marginLeft: "10px",
                  }}
                >
                  <i className="fa-solid fa-plus"></i> Add New Orient
                </Link>
                <Link
                  to={"/add/orients/excel"}
                  href="#"
                  className="btn add-btn"
                >
                  <i className="fas fa-file-excel"></i> Upload Excel
                </Link>
                <div className="view-icons"></div>
              </div>
            </div>
          </div>

          <OrinetsTable />
        </div>
      </div>
    </Fragment>
  );
};

export default OrientsPage;
