import React, { Fragment, useEffect, useState } from "react";
import PageHeader from "../../components/page_header";
import EmployeeRoleTable from "./components/employee_role_table";

const EmployeeRoles = () => {
  return (
    <Fragment>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <PageHeader
            activePage={"Empployee Role"}
            modalName={"Add New Role"}
            toggleModal={"#add_role"}
          />
          <div className="row">
            <div className="col-md-12">
                <EmployeeRoleTable />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EmployeeRoles;
