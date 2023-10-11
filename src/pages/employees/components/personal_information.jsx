import React, { Fragment, useEffect, useState } from "react";
import PersonalInfoFormModal from "../forms/personal_info_form";

const PersonalInfomation = ({ employeeId, personalInfo }) => {
  return (
    <Fragment>
      <div className="card profile-box flex-fill">
        <div className="card-body">
          <h3 className="card-title">
            Personal Information
            <a
              className="edit-icon"
              data-bs-toggle="modal"
              data-bs-target="#personal_info_modal"
            >
              <i className="fa-solid fa-pencil"></i>
            </a>
          </h3>
          <ul className="personal-info">
            {personalInfo && personalInfo.personal_info && personalInfo.personal_info.passport_number && (
              <li>
                <div className="title">Passport No.</div>
                <div className="text">
                  {personalInfo.personal_info.passport_number}
                </div>
              </li>
            )}
            <li>
              <div className="title">Nationality</div>
              <div className="text">{personalInfo?.personal_info?.nationality}</div>
            </li>
            <li>
              <div className="title">Religion</div>
              <div className="text">{personalInfo?.personal_info?.religion}</div>
            </li>
            <li>
              <div className="title">Marital status</div>
              <div className="text">{personalInfo?.marital_status}</div>
            </li>
            <li>
              <div className="title">Employment of spouse</div>
              {personalInfo?.personal_info?.spouse_employment === 1 ? (
                <span
                  className="badge badge-pill badge-success"
                  style={{
                    padding: "6px 9px",
                    borderRadius: "20px",
                  }}
                >
                  Employed
                </span>
              ) : (
                <span
                  className="badge badge-pill badge-warning"
                  style={{
                    padding: "6px 9px",
                    borderRadius: "20px",
                  }}
                >
                  Unemployed
                </span>
              )}
            </li>
            {personalInfo && personalInfo.personal_info && personalInfo.personal_info.no_children > 0 && (
              <li>
                <div className="title">No. of children</div>
                <div className="text">{personalInfo.personal_info.no_children}</div>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div
        id="personal_info_modal"
        className="modal custom-modal fade"
        role="dialog"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <PersonalInfoFormModal employeeId={employeeId} />
        </div>
      </div>
    </Fragment>
  );
};

export default PersonalInfomation;