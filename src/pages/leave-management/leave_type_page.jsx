import React, { Fragment, useEffect, useState } from "react";
import NewLeaveTypeForm from "./forms/new_leave_type";

const LeaveType = () => {
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
              <div class="card leave-box" id="leave_annual">
                <div class="card-body">
                  <div class="h3 card-title with-switch">
                    Annual
                    <div class="onoffswitch">
                      <input
                        type="checkbox"
                        name="onoffswitch"
                        class="onoffswitch-checkbox"
                        id="switch_annual"
                        checked=""
                      />
                      <label class="onoffswitch-label" for="switch_annual">
                        <span class="onoffswitch-inner"></span>
                        <span class="onoffswitch-switch"></span>
                      </label>
                    </div>
                  </div>
                  <div class="leave-item">
                    <div class="leave-row">
                      <div class="leave-left">
                        <div class="input-box">
                          <div class="input-block mb-3">
                            <label class="col-form-label">Days</label>
                            <input
                              type="text"
                              class="form-control"
                              disabled=""
                            />
                          </div>
                        </div>
                      </div>
                      <div class="leave-right">
                        <button class="leave-edit-btn">Edit</button>
                      </div>
                    </div>

                    <div class="leave-row">
                      <div class="leave-left">
                        <div class="input-box">
                          <label class="d-block col-form-label">
                            Carry forward
                          </label>
                          <div class="leave-inline-form">
                            <div class="form-check form-check-inline">
                              <input
                                class="form-check-input"
                                type="radio"
                                name="inlineRadioOptions"
                                id="carry_no"
                                value="option1"
                                disabled=""
                              />
                              <label class="form-check-label" for="carry_no">
                                No
                              </label>
                            </div>
                            <div class="form-check form-check-inline">
                              <input
                                class="form-check-input"
                                type="radio"
                                name="inlineRadioOptions"
                                id="carry_yes"
                                value="option2"
                                disabled=""
                              />
                              <label class="form-check-label" for="carry_yes">
                                Yes
                              </label>
                            </div>
                            <div class="input-group">
                              <span class="input-group-text">Max</span>
                              <input
                                type="text"
                                class="form-control"
                                disabled=""
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="leave-right">
                        <button class="leave-edit-btn">Edit</button>
                      </div>
                    </div>

                    <div class="leave-row">
                      <div class="leave-left">
                        <div class="input-box">
                          <label class="d-block col-form-label">
                            Earned leave
                          </label>
                          <div class="leave-inline-form">
                            <div class="form-check form-check-inline">
                              <input
                                class="form-check-input"
                                type="radio"
                                name="inlineRadioOptions"
                                id="earned_no"
                                value="option1"
                                disabled=""
                              />
                              <label class="form-check-label" for="earned_no">
                                No
                              </label>
                            </div>
                            <div class="form-check form-check-inline">
                              <input
                                class="form-check-input"
                                type="radio"
                                name="inlineRadioOptions"
                                id="earned_yes"
                                value="option2"
                                disabled=""
                              />
                              <label class="form-check-label" for="earned_yes">
                                Yes
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="leave-right">
                        <button class="leave-edit-btn">Edit</button>
                      </div>
                    </div>
                  </div>

                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <NewLeaveTypeForm />
    </Fragment>
  );
};

export default LeaveType;
