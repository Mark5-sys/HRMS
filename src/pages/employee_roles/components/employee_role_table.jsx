import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { employeesActions } from "../../../store/employee_store";
import { getAllEmployeRoles } from "../../../services/api";
import EmployeeRoleItem from "./employee_role_item";

const EmployeeRoleTable = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllRoles = async () => {
      const roles = await getAllEmployeRoles();
      dispatch(
        employeesActions.setEmployeeRoles({
          employeRoles: roles,
        })
      );
    };
    fetchAllRoles();
  }, []);

  const roles = useSelector((state) => state.employees.employeRoles);

  return (
    <Fragment>
      <div>
        <table class="table table-striped custom-table mb-0 datatable">
          <thead>
            <tr>
              <th class="width-thirty">#</th>
              <th>Role Name</th>
              <th class="text-end">Action</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role, index) => (
              <EmployeeRoleItem key={role.id} role={role} />
            ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

export default EmployeeRoleTable;
