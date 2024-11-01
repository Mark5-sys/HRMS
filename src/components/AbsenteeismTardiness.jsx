import React,{ useState, useEffect } from 'react';
import { Table, Alert, Badge } from 'react-bootstrap';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AbsenteeismTardiness = ({ attendanceRecords }) => {
    const [lateEmployees, setLateEmployees] = useState([]);
    const [absentEmployees, setAbsentEmployees] = useState([]);
  

    return (
      <div className="container mt-4">
        <h4>Absenteeism and Tardiness</h4>
        <ToastContainer />
        <Alert variant="warning" hidden={lateEmployees.length === 0}>
          <strong>Warning:</strong> Some employees were late today.
        </Alert>
        <Alert variant="danger" hidden={absentEmployees.length === 0}>
          <strong>Alert:</strong> Some employees are absent without notice.
        </Alert>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Check-In Time</th>
              <th>Expected In Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {attendanceRecords.map((record) => (
              <tr key={record.id}>
                <td>{record.employeeName}</td>
                <td>{record.checkIn ? moment(record.checkIn).format('HH:mm') : 'Absent'}</td>
                <td>{moment(record.expectedIn).format('HH:mm')}</td>
                <td>
                  {!record.checkIn ? (
                    <Badge variant="danger">Absent</Badge>
                  ) : moment(record.checkIn).isAfter(moment(record.expectedIn)) ? (
                    <Badge variant="warning">Late</Badge>
                  ) : (
                    <Badge variant="success">On Time</Badge>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  };
  

export default AbsenteeismTardiness;