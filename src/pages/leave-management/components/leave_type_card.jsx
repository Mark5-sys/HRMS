import React, { Fragment, useEffect, useState } from "react";

const LeaveTypeCard = ({ leaveType }) => {
  return (
    <Fragment>
      <div class="card leave-box" id="leave_annual">
        <div class="card-body">
          <div class="h3 card-title with-switch">
            {leaveType.name}
            <div class="onoffswitch">
              <input
                type="checkbox"
                name="onoffswitch"
                class="onoffswitch-checkbox"
                id="switch_custom01"
                checked=""
              />
              <label class="onoffswitch-label" for="switch_custom01">
                <span class="onoffswitch-inner"></span>
                <span class="onoffswitch-switch"></span>
              </label>
            </div>
            <button class="btn btn-danger leave-delete-btn" type="button">
              Delete
            </button>
          </div>
          <div class="leave-item">
            <div class="leave-row">
              <div class="leave-left">
                <div class="input-box">
                  <div class="input-block mb-3">
                    <label class="col-form-label">Employee Days</label>
                    <input
                      type="number"
                      value={22}
                      class="form-control"
                      disabled={true}
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
                  <div class="input-block mb-3">
                    <label class="col-form-label">HOD & Director Days</label>
                    <input
                      type="number"
                      value={45}
                      class="form-control"
                      disabled={true}
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
                <p>{leaveType.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default LeaveTypeCard;
