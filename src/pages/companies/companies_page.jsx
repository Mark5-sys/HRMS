import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CompaniesTable from "./components/companies_table";
import PageHeader from "../../components/page_header";
import AddCompanyForm from "./forms/add_company_form";
import { useSelector } from "react-redux";
import EditCompanyForm from "./forms/edit_company_form";

const CompaniesPage = ({}) => {
  const companyEdit = useSelector((state) => state.company.companyEdit);
  return (
    <Fragment>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <PageHeader
            activePage={"Company"}
            modalName={"Add Company"}
            toggleModal={"#add_company"}
          />

          <div className="row">
            <div className="col-md-12">
              <CompaniesTable />
            </div>
          </div>

          <AddCompanyForm />
          {companyEdit && <EditCompanyForm />}
        </div>
      </div>
    </Fragment>
  );
};

export default CompaniesPage;
