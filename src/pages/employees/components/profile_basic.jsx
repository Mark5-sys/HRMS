import React, { Fragment, useEffect, useState } from "react";
import EditEmployeeFormModal from "../forms/edit_employee_modal";

const ProfileCard = ({ employee }) => {
  return (
    <Fragment>
      <div className="card mb-0">
        <div className="card-body">
          <div className="row">
            <div className="col-md-12">
              <div className="profile-view">
                <div className="profile-img-wrap">
                  <div className="profile-img">
                    <a>
                      <img src="/assets/img/user.jpg" alt="User Image" />
                    </a>
                  </div>
                </div>
                {employee && (
                  <div className="profile-basic">
                    <div className="row">
                      <div className="col-md-5">
                        <div className="profile-info-left">
                          <h3 className="user-name m-t-0 mb-0">
                            {employee.first_name} {employee.surname}
                          </h3>

                          {employee.department && (
                            <h6 className="text-muted">
                              {employee.department.name}
                            </h6>
                          )}

                          {employee.position && (
                            <small className="text-muted">
                              {employee.position.name}
                            </small>
                          )}

                          <div className="staff-id">
                            Employee ID : {employee.code}{" "}
                          </div>
                          <div className="small doj text-muted">
                            {/* Date of Join : 1st Jan 2013 */}
                          </div>
                          <div className="staff-msg">
                            <a className="btn btn-custom">Send Email</a>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-7">
                        <ul className="personal-info">
                          <li>
                            <div className="title">Phone:</div>
                            <div className="text">
                              <a>{employee.phone_number_1}</a>
                            </div>
                          </li>
                          <li>
                            <div className="title">Phone 2:</div>
                            <div className="text">
                              <a>{employee.phone_number_2}</a>
                            </div>
                          </li>
                          <li>
                            <div className="title">Email:</div>
                            <div className="text">
                              <a href>
                                <span className="__cf_email__">
                                  {employee.email}
                                </span>
                              </a>
                            </div>
                          </li>
                          <li>
                            <div className="title">Birthday:</div>
                            <div className="text">{employee.date_of_birth}</div>
                          </li>
                          <li>
                            <div className="title">Address:</div>
                            <div className="text">{employee.address}</div>
                          </li>
                          <li>
                            <div className="title">Gender:</div>
                            <div className="text">{employee.gender}</div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                <div className="pro-edit">
                  <a
                    className="edit-icon"
                    data-bs-target="#profile_info"
                    data-bs-toggle="modal"
                  >
                    <i className="fa-solid fa-pencil"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="profile_info" class="modal custom-modal fade" role="dialog">
        <div
          class="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <EditEmployeeFormModal />
        </div>
      </div>
    </Fragment>
  );
};

export default ProfileCard;
