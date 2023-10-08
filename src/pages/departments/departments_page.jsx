import React, { Fragment, useEffect, useState } from "react";
import PageHeader from "../../components/page_header";
import AddDepartmentForm from "./forms/add_department_form";
import DepartmentTable from "./components/department_table";
import EditDepartmentForm from "./forms/edit_department_form";

const DepartmentsPage = ({}) => {
  return (
    <Fragment>
      <div class="page-wrapper">
        <div class="content container-fluid">
          <PageHeader
            activePage={"Department"}
            modalName={"Add Department"}
            toggleModal={"#add_department"}
          />
          <div class="row">
            <div class="col-md-12">
              <DepartmentTable />
            </div>
          </div>

          <AddDepartmentForm />
          <EditDepartmentForm />
        </div>
      </div>
    </Fragment>
  );
};

export default DepartmentsPage;
