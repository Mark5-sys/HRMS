import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { companyActions } from "../../../store/companies_store";

const CompaniesTable = () => {
  const companies = useSelector((state) => state.company.companies) || [];

  const dispatch = useDispatch();

  const setEditCompany = (company) => {
    dispatch(
      companyActions.setEditCompany({
        companyEdit: company,
      })
    );
  };

  return (
    <Fragment>
      <table class="table table-striped custom-table mb-0 datatable">
        <thead>
          <tr>
            <th class="width-thirty">#</th>
            <th>Company Name</th>
            <th class="text-end">Action</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company) => (
            <tr>
              <td>{company.id}</td>
              <td
                style={{
                  cursor: "pointer",
                }}
              >
                <Link to={`/company/${company.id}`}>{company.name}</Link>
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
                      onClick={() => setEditCompany(company)}
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
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default CompaniesTable;
