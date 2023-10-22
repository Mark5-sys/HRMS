import React, { Fragment, useEffect, useState } from "react";

const NewLeaveTypeForm = () => {
  return (
    <Fragment>
      <div id="add_leave_type" class="modal custom-modal fade" role="dialog">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">ADD NEW LEAVE TYPE</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default NewLeaveTypeForm;
