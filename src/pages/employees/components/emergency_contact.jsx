import React, { Fragment, useEffect, useState } from "react";
import EmergencyContactFormModal from "../forms/emergency_contact_form";

const EmergencyContact = ({}) => {
  return (
    <Fragment>
      <div className="card profile-box flex-fill">
        <div className="card-body">
          <h3 className="card-title">
            Emergency Contact
            <a
              href="#"
              className="edit-icon"
              data-bs-toggle="modal"
              data-bs-target="#emergency_contact_modal"
            >
              <i className="fa-solid fa-pencil"></i>
            </a>
          </h3>
          <h5 className="section-title">Primary</h5>
          <ul className="personal-info">
            <li>
              <div className="title">Name</div>
              <div className="text">John Doe</div>
            </li>
            <li>
              <div className="title">Relationship</div>
              <div className="text">Father</div>
            </li>
            <li>
              <div className="title">Phone</div>
              <div className="text">9876543210, 9876543210</div>
            </li>
          </ul>
          <hr />
          <h5 className="section-title">Secondary</h5>
          <ul className="personal-info">
            <li>
              <div className="title">Name</div>
              <div className="text">Karen Wills</div>
            </li>
            <li>
              <div className="title">Relationship</div>
              <div className="text">Brother</div>
            </li>
            <li>
              <div className="title">Phone</div>
              <div className="text">9876543210, 9876543210</div>
            </li>
          </ul>
        </div>
      </div>

      <div
        id="emergency_contact_modal"
        class="modal custom-modal fade"
        role="dialog"
      >
        <div
          class="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <EmergencyContactFormModal />
        </div>
      </div>
    </Fragment>
  );
};

export default EmergencyContact;
