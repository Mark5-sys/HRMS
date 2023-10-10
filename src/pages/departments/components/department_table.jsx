import React, { Fragment, useEffect, useState } from "react";
import DepartmentItem from "./department_item";
import { useSelector } from "react-redux";

const DepartmentTable = ({}) => {
  const departments = useSelector((state) => state.department.departments);
  return (
    <Fragment>
      <div>
        <table class="table table-striped custom-table mb-0 datatable">
          <thead>
            <tr>
              <th class="width-thirty">#</th>
              <th>Department Name</th>
              <th class="text-end">Action</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((department, index) => (
              <DepartmentItem key={department.id} department={department} />
            ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

export default DepartmentTable;
