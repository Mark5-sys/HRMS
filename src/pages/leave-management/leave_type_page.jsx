import React, { Fragment, useEffect, useState } from "react";
import NewLeaveTypeForm from "./forms/new_leave_type";
import LeaveTypeCard from "./components/leave_type_card";
import { useDispatch, useSelector } from "react-redux";
import { getAllLeaveTypes } from "../../services/api";
import { leavesActions } from "../../store/leave_store";

const LeaveType = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchLeaveTypes = async () => {
      const leaveTypes = await getAllLeaveTypes();
      dispatch(
        leavesActions.setLeaveTypes({
          leaveTypes: leaveTypes,
        })
      );
    };

    fetchLeaveTypes();
  }, []);

  const leaveTypes = useSelector((state) => state.leave.leaveTypes);

  return (
    <Fragment>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="page-title">Leave Settings</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="admin-dashboard.html">Dashboard</a>
                  </li>
                  <li className="breadcrumb-item active">Leave Settings</li>
                </ul>
              </div>
              <div className="col-auto float-end ms-auto">
                <a
                  className="btn add-btn"
                  data-bs-toggle="modal"
                  data-bs-target="#add_leave_type"
                >
                  <i className="fa-solid fa-plus"></i> Add Leave Type
                </a>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              {leaveTypes.map((leaveType, index) => (
                <LeaveTypeCard key={leaveType.id} leaveType={leaveType} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <NewLeaveTypeForm />
    </Fragment>
  );
};

export default LeaveType;
