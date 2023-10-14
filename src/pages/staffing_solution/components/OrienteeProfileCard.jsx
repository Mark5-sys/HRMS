import React, { Fragment, useEffect, useState } from "react";
import { convertToDateWord } from "../../../helpers/helpers";

const OrienteeProfileCard = ({ orientee }) => {
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
                {orientee && (
                  <div className="profile-basic">
                    <div className="row">
                      <div className="col-md-5">
                        <div className="profile-info-left">
                          <h3 className="user-name m-t-0 mb-0">
                            {orientee.first_name} {orientee.last_name}
                          </h3>

                          {orientee.company && (
                            <h6 className="text-muted">{orientee.company}</h6>
                          )}

                          <div className="staff-id">Employee ID : </div>
                          <div className="small doj text-muted">
                            Date of Orientation :{" "}
                            {/* {convertToDateWord(orientee.created_at)} */}
                          </div>
                          <div className="staff-msg">
                            {" "}
                            Deployment Status {"  "}
                            <span
                              className="badge badge-pill badge-info"
                              style={{
                                padding: "8px 11px",
                                borderRadius: "20px",
                              }}
                            > { orientee.deployement_status }</span>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-7">
                        <ul className="personal-info">
                          <li>
                            <div className="title">Phone:</div>
                            <div className="text">
                              <a>{orientee.phone_1}</a>
                            </div>
                          </li>
                          <li>
                            <div className="title">Phone 2:</div>
                            <div className="text">
                              <a>{orientee.phone_2}</a>
                            </div>
                          </li>
                          <li>
                            <div className="title">Email:</div>
                            <div className="text">
                              <a href>
                                <span className="__cf_email__">
                                  {/* {orientee.email} */}
                                </span>
                              </a>
                            </div>
                          </li>
                          <li>
                            <div className="title">Birthday:</div>
                            <div className="text">{orientee.date_of_birth}</div>
                          </li>
                          <li>
                            <div className="title">Address:</div>
                            <div className="text">{orientee.address}</div>
                          </li>
                          <li>
                            <div className="title">Gender:</div>
                            <div className="text">{orientee.gender}</div>
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
    </Fragment>
  );
};

export default OrienteeProfileCard;
