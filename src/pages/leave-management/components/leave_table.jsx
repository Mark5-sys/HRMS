import React, { Fragment, useEffect, useState } from "react";
import LeaveItem from "./leave_item";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllAppliedLeaves } from "../../../services/api";
import { leavesActions } from "../../../store/leave_store";

const LeaveTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeaveData = async () => {
      const appliedLeaves = await getAllAppliedLeaves();

      dispatch(
        leavesActions.setAppliedLeaves({
          appliedLeaves: appliedLeaves,
        })
      );
    };

    fetchLeaveData();
  }, []);

  const leaves = useSelector((state) => state.leave.appliedLeaves) || [];

  return (
    <Fragment>
      <div className="row">
        <div className="col-md-12">
          <div
            className="table-responsive"
            style={{
              overflowX: "hidden",
            }}
          >
            <div
              id="DataTables_Table_0_wrapper"
              className="dataTables_wrapper dt-bootstrap4 no-footer"
            >
              <div className="row">
                <div className="col-sm-12 col-md-6">
                  <div
                    className="dataTables_length"
                    id="DataTables_Table_0_length"
                  >
                    <label>
                      Show{" "}
                      <select
                        name="DataTables_Table_0_length"
                        aria-controls="DataTables_Table_0"
                        className="custom-select custom-select-sm form-control form-control-sm"
                      >
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                      </select>{" "}
                      entries
                    </label>
                  </div>
                </div>
                <div className="col-sm-12 col-md-6"></div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <table
                    className="table table-striped custom-table mb-0 datatable dataTable no-footer"
                    id="DataTables_Table_0"
                    role="grid"
                    aria-describedby="DataTables_Table_0_info"
                  >
                    <thead>
                      <tr role="row">
                        <th
                          className="sorting_asc"
                          tabindex="0"
                          aria-controls="DataTables_Table_0"
                          rowspan="1"
                          colspan="1"
                          aria-sort="ascending"
                          aria-label="Employee: activate to sort column descending"
                          style={{
                            width: "340.766px",
                          }}
                        >
                          Employee
                        </th>
                        <th
                          className="sorting"
                          tabindex="0"
                          aria-controls="DataTables_Table_0"
                          rowspan="1"
                          colspan="1"
                          aria-label="Leave Type: activate to sort column ascending"
                          style={{
                            width: "153.438px",
                          }}
                        >
                          Leave Type
                        </th>
                        <th
                          className="sorting"
                          tabindex="0"
                          aria-controls="DataTables_Table_0"
                          rowspan="1"
                          colspan="1"
                          aria-label="From: activate to sort column ascending"
                          style={{
                            width: "115.234px",
                          }}
                        >
                          From
                        </th>
                        <th
                          className="sorting"
                          tabindex="0"
                          aria-controls="DataTables_Table_0"
                          rowspan="1"
                          colspan="1"
                          aria-label="To: activate to sort column ascending"
                          style={{
                            width: "114.094px",
                          }}
                        >
                          To
                        </th>
                        <th
                          className="sorting"
                          tabindex="0"
                          aria-controls="DataTables_Table_0"
                          rowspan="1"
                          colspan="1"
                          aria-label="No of Days: activate to sort column ascending"
                          style={{
                            width: "112.688px",
                          }}
                        >
                          No of Days
                        </th>
                        <th
                          className="sorting"
                          tabindex="0"
                          aria-controls="DataTables_Table_0"
                          rowspan="1"
                          colspan="1"
                          aria-label="Reason: activate to sort column ascending"
                          style={{
                            width: "164.891px",
                          }}
                        >
                          Reason
                        </th>
                        <th
                          className="text-center sorting"
                          tabindex="0"
                          aria-controls="DataTables_Table_0"
                          rowspan="1"
                          colspan="1"
                          aria-label="Status: activate to sort column ascending"
                          style={{
                            width: "156.281px",
                          }}
                        >
                          Status
                        </th>
                        <th
                          className="text-end sorting"
                          tabindex="0"
                          aria-controls="DataTables_Table_0"
                          rowspan="1"
                          colspan="1"
                          aria-label="Actions: activate to sort column ascending"
                          style={{
                            width: "83.6094px",
                          }}
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {leaves.map((leave, i) => (
                        <LeaveItem key={leave.id} leave={leave} />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </Fragment>
  );
};

export default LeaveTable;
