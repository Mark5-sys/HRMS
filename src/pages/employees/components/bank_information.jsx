import React, { Fragment, useEffect, useState } from "react";

const BankInformation = ({}) => {
  return (
    <Fragment>
      <div class="col-md-6 d-flex">
        <div class="card profile-box flex-fill">
          <div class="card-body">
            <h3 class="card-title">Bank information</h3>
            <ul class="personal-info">
              <li>
                <div class="title">Bank name</div>
                <div class="text">ICICI Bank</div>
              </li>
              <li>
                <div class="title">Bank account No.</div>
                <div class="text">159843014641</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default BankInformation;
