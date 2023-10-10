import React, { Fragment, useEffect, useState } from "react";
import EmergencyContactFormModal from "../forms/emergency_contact_form";

const EmergencyContact = ({ employeeId, employee }) => {
  return (
    <Fragment>
      <div className="card profile-box flex-fill">
        <div className="card-body">
          <h3 className="card-title">
            Next Of Kin
            <a
              className="edit-icon"
              data-bs-toggle="modal"
              data-bs-target="#emergency_contact_modal"
            >
              <i className="fa-solid fa-pencil"></i>
            </a>
          </h3>
          <h5 className="section-title">Primary</h5>
          {employee && employee.emergency_contacts ? (
            employee.emergency_contacts.map((contact) => (
              <ul className="personal-info" key={contact.name}>
                <li>
                  <div className="title">Name</div>
                  <div className="text">{contact.name}</div>
                </li>
                <li>
                  <div className="title">Relationship</div>
                  <div className="text">{contact.relationship}</div>
                </li>
                <li>
                  <div className="title">Phone</div>
                  <div className="text">
                    {contact.phone1}, {contact.phone2}
                  </div>
                </li>
              </ul>
            ))
          ) : (
            <p>No emergency contacts found.</p>
          )}
        </div>
      </div>
      <div
        id="emergency_contact_modal"
        className="modal custom-modal fade"
        role="dialog"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <EmergencyContactFormModal employeeId={employeeId} />
        </div>
      </div>
    </Fragment>
  );
};

export default EmergencyContact;
