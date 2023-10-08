import React, { Fragment, useEffect, useState } from "react";
import EmployeeItem from "./employee_item";
import { useDispatch, useSelector } from "react-redux";
import { employeesActions } from "../../../store/employee_store";
import { getAllEmployees } from "../../../services/api";

const EmployeeTable = ({}) => {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.activeEmployees);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const employees = await getAllEmployees();
        dispatch(
          employeesActions.setActiveEmployees({
            activeEmployees: employees,
          })
        );
      } catch (error) {
        console.log("There was an error while fetching stats ", error);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <Fragment>
      <div class="row">
        <div class="col-md-12">
          <div class="table-responsive">
            <table class="table table-striped custom-table datatable">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Employee Number</th>
                  <th>Gender</th>
                  <th>Department</th>
                  <th class="text-nowrap">Position</th>
                  <th>Phone</th>
                  <th>Working Status</th>
                  <th class="text-end no-sort">Action</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee, index) => (
                  <EmployeeItem key={employee.id} employee={employee} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EmployeeTable;
