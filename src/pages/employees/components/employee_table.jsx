import React, { Fragment, useEffect, useState } from "react";
import EmployeeItem from "./employee_item";
import { useDispatch, useSelector } from "react-redux";
import { employeesActions } from "../../../store/employee_store";
import { getAllEmployees } from "../../../services/api";
import { useGetEmployeesQuery } from "../../../store/api/employeeSlice";
import Loading from "../../../components/loader/loading";
import { useGetDepartmentsQuery } from "../../../store/api/apiSlice";

const EmployeeTable = () => {
  const {
    data: emps,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetEmployeesQuery();

  const { data: dpts } = useGetDepartmentsQuery();

  const dispatch = useDispatch();
  const employees =
    useSelector((state) => state.employees.activeEmployees) || [];
  const positions = useSelector((state) => state.position.positions);

  const [employeeName, setEmployeeName] = useState("");
  const [employeeCode, setEmployeeCode] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState([]);

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

  const handleSearch = () => {
    const filteredEmployees = employees.filter((employee) => {
      const codeMatch =
        employeeCode !== "" && employee.code
          ? employee.code.toLowerCase().includes(employeeCode.toLowerCase())
          : false;

      const nameMatch =
        employeeName !== "" &&
        (employee.first_name
          .toLowerCase()
          .includes(employeeName.toLowerCase()) ||
          employee.surname.toLowerCase().includes(employeeName.toLowerCase()));
      return codeMatch || nameMatch;
    });
    setFilteredEmployees(filteredEmployees);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "employeeCode") {
      setEmployeeCode(value);
    } else if (name === "employeeName") {
      setEmployeeName(value);
    }
  };

  useEffect(() => {
    console.log("emps", emps);

    if (employeeCode === "" && employeeName === "") {
      setFilteredEmployees([]);
    } else {
      handleSearch();
    }
  }, [employeeCode, employeeName]);

  let content;

  if (isLoading) {
    content = <Loading />;
  } else if (isSuccess) {
    content = emps.ids.map((id) => (
      <EmployeeItem key={id} employee={emps.entities[id]} />
    ));
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  return (
    <Fragment>
      <div className="row filter-row">
        <div className="col-sm-6 col-md-4">
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control floating"
              name="employeeCode"
              value={employeeCode}
              onChange={handleInputChange}
            />
            <label className="focus-label">Employee ID</label>
          </div>
        </div>
        <div className="col-sm-6 col-md-4">
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              name="employeeName"
              value={employeeName}
              onChange={handleInputChange}
            />
            <label className="focus-label">Employee Name</label>
          </div>
        </div>
        <div className="col-sm-6 col-md-4">
          <div className="d-grid">
            <a className="btn btn-success w-100" onClick={handleSearch}>
              Search
            </a>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="table-responsive">
            <table className="table table-striped custom-table datatable">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Employee Number</th>
                  <th>Gender</th>
                  <th>Department</th>
                  <th className="text-nowrap">Position</th>
                  <th>Phone</th>
                  <th>Working Status</th>
                  <th className="text-end no-sort">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.length > 0
                  ? filteredEmployees.map((employee) => (
                      <EmployeeItem key={employee.id} employee={employee} />
                    ))
                  : content}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EmployeeTable;
