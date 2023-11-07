import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BirthdayCard = ({ employee }) => {
  return (
    <Fragment>
      <div className="dash-section">
        <div className="dash-sec-content">
          <div className="dash-info-list">
            <a href="#" className="dash-card text-danger">
              <div className="dash-card-container">
                <div className="dash-card-icon">
                  <i className="fa-regular fa-hourglass"></i>
                </div>
                <div className="dash-card-content">
                  <p>
                    {employee.first_name} {employee.surname}
                  </p>
                </div>
                <div className="dash-card-avatars">
                  <div className="e-avatar">
                    <img
                      src="assets/img/profiles/avatar-09.jpg"
                      alt="User Image"
                    />
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default BirthdayCard;
