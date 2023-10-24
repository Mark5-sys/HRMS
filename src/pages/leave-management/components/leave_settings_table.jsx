import React, { Fragment, useEffect, useState } from "react";
import LeaveSettingsItem from "./leave_settings_items";

const LeaveSettingsTable = ({ selectedEmployee }) => {
  return (
    <Fragment>
      <div className="table-responsive mt-4">
        <table class="table table-hover table-nowrap leave-table mb-0">
          <thead>
            <tr>
              <th class="l-name">#</th>
              <th class="l-name">Name</th>
              <th class="l-days">Employee Code</th>
              <th class="">Department</th>
              <th class="">Opening Bal</th>
              <th>Closing Leave Balance</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <LeaveSettingsItem employee={selectedEmployee} />
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

export default LeaveSettingsTable;
