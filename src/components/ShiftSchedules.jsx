import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Modal, Button } from "react-bootstrap";
import moment from "moment";
import PageHeader from "./page_header";

const ShiftSchedules = ({ shifts }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedShift, setSelectedShift] = useState(null);

  const handleEventClick = (info) => {
    setSelectedShift(info.event.extendedProps);
    setShowModal(true);
  };

  return (
    <div className="page-wrapper">
      <div className="container mt-4">
      <PageHeader
          activePage={"Schedule"}
          modalName={"Add schedule"}
          // toggleModal={"#add_time"}
        />
        <div className="calendar-wrapper ">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="timeGridWeek"
            events={shifts}
            eventClick={handleEventClick}
            editable
            droppable
            height="auto" // Ensures the calendar fits within the container
          />
        </div>
        {selectedShift && (
          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Shift Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>
                <strong>Task:</strong> {selectedShift.task}
              </p>
              <p>
                <strong>Location:</strong> {selectedShift.location}
              </p>
              <p>
                <strong>Shift Duration:</strong> {selectedShift.duration}
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default ShiftSchedules;
