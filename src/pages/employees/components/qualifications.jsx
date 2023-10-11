import React, { Fragment, useEffect, useState } from "react";
import AddEducationalInfo from "../forms/educational_info";

const Qualifications = ({ employeeId, employee }) => {
  return (
    <Fragment>
      <div className="col-md-6 d-flex">
        <div className="card profile-box flex-fill">
          <div className="card-body">
            <h3 className="card-title">
              Education
              <a
                href="#"
                className="edit-icon"
                data-bs-toggle="modal"
                data-bs-target="#education_info"
              >
                <i className="fa-solid fa-pencil"></i>
              </a>
            </h3>
            <div className="experience-box">
              <ul className="experience-list">
                {employee.qualifications && employee.qualifications.map((qualification) => (
                  <li key={qualification.id}>
                    <div className="experience-user">
                      <div className="before-circle"></div>
                    </div>
                    <div className="experience-content">
                      <div className="timeline-content">
                        <a  className="name">
                          {qualification.school}
                        </a>
                        <div>{qualification.educational_level}</div>
                        <span className="time">
                          {qualification.start_date} - {qualification.end_date}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <AddEducationalInfo employeeId={employeeId} />
    </Fragment>
  );
};

export default Qualifications;