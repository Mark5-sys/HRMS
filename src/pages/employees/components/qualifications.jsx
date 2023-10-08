import React, { Fragment, useEffect, useState } from "react";
import AddEducationalInfo from "../forms/educational_info";

const Qualifications = ({}) => {
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
                <li>
                  <div class="experience-user">
                    <div class="before-circle"></div>
                  </div>
                  <div class="experience-content">
                    <div class="timeline-content">
                      <a href="#/" class="name">
                        International College of Arts and Science (UG)
                      </a>
                      <div>Bsc Computer Science</div>
                      <span class="time">2000 - 2003</span>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="experience-user">
                    <div class="before-circle"></div>
                  </div>
                  <div class="experience-content">
                    <div class="timeline-content">
                      <a href="#/" class="name">
                        International College of Arts and Science (PG)
                      </a>
                      <div>Msc Computer Science</div>
                      <span class="time">2000 - 2003</span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <AddEducationalInfo />
    </Fragment>
  );
};

export default Qualifications;
