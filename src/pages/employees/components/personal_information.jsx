import React, { Fragment, useEffect, useState } from "react";
import PersonalInfoFormModal from "../forms/personal_info_form";

const PersonalInfomation = ({ employeeId, personalInfo }) => {
  return (
    <Fragment>
      <div class="card profile-box flex-fill">
        <div class="card-body">
          <h3 class="card-title">
            Personal Informations
            <a
              href="#"
              class="edit-icon"
              data-bs-toggle="modal"
              data-bs-target="#personal_info_modal"
            >
              <i class="fa-solid fa-pencil"></i>
            </a>
          </h3>
          <ul class="personal-info">
            {personalInfo.personal_info.passport_number && (
              <li>
                <div class="title">Passport No.</div>
                <div class="text">
                  {personalInfo.personal_info.passport_number}
                </div>
              </li>
            )}

            <li>
              <div class="title">Nationality</div>
              <div class="text">{personalInfo.personal_info.nationality}</div>
            </li>
            <li>
              <div class="title">Religion</div>
              <div class="text">{personalInfo.personal_info.religion}</div>
            </li>
            <li>
              <div class="title">Marital status</div>
              <div class="text">{personalInfo.marital_status}</div>
            </li>
            <li>
              <div class="title">Employment of spouse</div>
              {personalInfo.personal_info.spouse_employment === 1 ? (
                <span
                  className="badge badge-pill badge-success"
                  style={{
                    padding: "6px 9px",
                    borderRadius: "20px",
                  }}
                >
                  Employeed
                </span>
              ) : (
                <span
                  className="badge badge-pill badge-warning"
                  style={{
                    padding: "6px 9px",
                    borderRadius: "20px",
                  }}
                >
                  Unemployeed
                </span>
              )}
            </li>
            {personalInfo.personal_info.no_children > 0 && (
              <li>
                <div class="title">No. of children</div>
                <div class="text">{personalInfo.personal_info.no_children}</div>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div
        id="personal_info_modal"
        class="modal custom-modal fade"
        role="dialog"
      >
        <div
          class="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <PersonalInfoFormModal employeeId={employeeId} />
        </div>
      </div>
    </Fragment>
  );
};

export default PersonalInfomation;
