import React, { useState, useEffect } from 'react';
import { Table, Alert, Badge, Button, Form } from 'react-bootstrap';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PageHeader from './page_header';

const AbsenteeismTardiness = ({ attendanceRecords }) => {
  const [lateEmployees, setLateEmployees] = useState([]);
  const [absentEmployees, setAbsentEmployees] = useState([]);
  const [timeEntries, setTimeEntries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const fixedStartTime = moment('07:45 AM', 'hh:mm A');

  useEffect(() => {
    const fetchTimeEntries = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/entries');
        const data = await response.json();
        setTimeEntries(data);
      } catch (error) {
        console.error('Error fetching time entries:', error);
      }
    };

    fetchTimeEntries();
  }, []);

  // Filter records based on search term
  const filteredEntries = timeEntries.filter((entry) => 
    entry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.date.includes(searchTerm)
  );

  // Print functionality
  const handlePrint = () => {
    const originalContent = document.body.innerHTML;
    const printContent = document.getElementById("printableTable").outerHTML;
    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload(); // Reload the page to restore the original content after printing
  };

  return (
    <div className="page-wrapper">
      <div className="container mt-4">
        <PageHeader activePage={"Absenteeism And Tardiness List"} />
        <ToastContainer />

        <Alert variant="warning" hidden={lateEmployees.length === 0}>
          <strong>Warning:</strong> Some employees were late today.
        </Alert>
        <Alert variant="danger" hidden={absentEmployees.length === 0}>
          <strong>Alert:</strong> Some employees are absent without notice.
        </Alert>

        {/* Search filter and print button */}
        <div className="d-flex justify-content-between mb-3">
          <Form.Control 
            type="text"
            placeholder="Search by Employee or Date"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ maxWidth: '300px' }}
          />
          <Button variant="primary" onClick={handlePrint}>Print</Button>
        </div>

        <Table striped bordered hover id="printableTable">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Date</th>
              <th>Check-In Time</th>
              <th>Expected In Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredEntries.map((entry) => {
              const checkInTime = entry.time_in ? moment(entry.time_in, 'HH:mm') : null;
              const isLate = checkInTime && checkInTime.isAfter(fixedStartTime);

              return (
                <tr key={entry.id}>
                  <td>{entry.name}</td>
                  <td>{entry.date}</td>
                  <td>{checkInTime ? checkInTime.format('hh:mm A') : 'Absent'}</td>
                  <td>{fixedStartTime.format('hh:mm A')}</td>
                  <td>
                    {!checkInTime ? (
                      <Badge bg="danger">Absent</Badge> 
                    ) : isLate ? (
                      <Badge bg="warning">Late</Badge>
                    ) : (
                      <Badge bg="success">On Time</Badge>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default AbsenteeismTardiness;
