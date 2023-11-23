import { Fragment } from "react";
import PageHeader from "../../components/page_header";
import AddDepartmentForm from "./forms/add_department_form";
import DepartmentTable from "./components/department_table";

const DepartmentsPage = () => {

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
        </div>
      </div>
    </Fragment>
  );
};

export default DepartmentsPage;
