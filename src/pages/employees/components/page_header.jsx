import { Fragment } from "react";

const PageHeader = ({ routeLink, currentPage }) => {
  return (
    <Fragment>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Employee</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to={"/"}>Dashboard</Link>
              </li>
              <li className="breadcrumb-item active">Employee</li>
            </ul>
          </div>
          <div className="col-auto float-end ms-auto">
            <Link to={"/add/employee"} href="#" className="btn add-btn">
              <i className="fa-solid fa-plus"></i> Add Employee
            </Link>
            <div className="view-icons"></div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PageHeader;
