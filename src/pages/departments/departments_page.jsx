import React, { Fragment, useEffect, useState } from "react";
import PageHeader from "../../components/page_header";
import AddDepartmentForm from "./forms/add_department_form";
import DepartmentTable from "./components/department_table";
import EditDepartmentForm from "./forms/edit_department_form";
import { useSelector } from "react-redux";

const DepartmentsPage = ({}) => {
  const departmentEdit = useSelector(
    (state) => state.department.departmentEdit
  );

  return (
    <Fragment>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <PageHeader
            activePage={"Department"}
            modalName={"Add Department"}
            toggleModal={"#add_department"}
          />
          <div className="row">
            <div className="col-md-12">
              <DepartmentTable />
            </div>
          </div>

          <AddDepartmentForm />
          {departmentEdit && <EditDepartmentForm />}
        </div>
      </div>
    </Fragment>
  );
};

export default DepartmentsPage;
