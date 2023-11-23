import { Fragment } from "react";
import PropTypes from "prop-types";
import DepartmentItem from "./department_item";
import { useGetDepartmentsQuery } from "../../../store/api/apiSlice";

import Loading from "../../../components/loader/loading";

let DepartmentExcerpt = ({ departments }) => {
  return (
    <div>
      <table className="table table-striped custom-table mb-0 datatable">
        <thead>
          <tr>
            <th className="width-thirty">#</th>
            <th>Department Name</th>
            <th className="text-end">Action</th>
          </tr>
        </thead>
        <tbody>
          {departments.data.map((department) => (
            <DepartmentItem key={department.id} department={department} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const DepartmentTable = () => {
  const {
    data: dpts,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetDepartmentsQuery();

  let content;

  // const departments = useSelector((state) => state.department.departments);

  if (isLoading) {
    content = <Loading />;
  } else if (isSuccess) {
    content = <DepartmentExcerpt departments={dpts} />;
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  return <Fragment>{content}</Fragment>;
};

DepartmentExcerpt.propTypes = {
  departments: PropTypes.object,
};

export default DepartmentTable;
