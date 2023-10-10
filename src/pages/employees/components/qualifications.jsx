import React, { Fragment, useEffect, useState } from "react";
import AddEducationalInfo from "../forms/educational_info";

const Qualifications = ({ employeeId, employee }) => {
  return (
    <Fragment>
      <div class="col-md-6 d-flex">
        <div class="card profile-box flex-fill">
          <div class="card-body">
            <h3 class="card-title">
              Education Informations
              <a
                href="#"
                class="edit-icon"
                data-bs-toggle="modal"
                data-bs-target="#education_info"
              >
                <i class="fa-solid fa-pencil"></i>
              </a>
            </h3>
            <div class="experience-box">
              <ul class="experience-list">
                {employee.qualifications.map((qualification) => (
                  <li key={qualification.id}>
                    <div class="experience-user">
                      <div class="before-circle"></div>
                    </div>
                    <div class="experience-content">
                      <div class="timeline-content">
                        <a href="#/" class="name">
                          {qualification.school}
                        </a>
                        <div>{qualification.educational_level}</div>
                        <span class="time">
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
