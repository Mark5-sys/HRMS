import React, { useState } from 'react';
import moment from 'moment'; // Moment.js for time calculations

const AttendanceList = ({ entries }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Function to calculate total hours worked
  const calculateWorkingHours = (time_in, time_out) => {
    const start = moment(time_in, 'HH:mm');
    const end = moment(time_out, 'HH:mm');
    const duration = moment.duration(end.diff(start));
    return duration.asHours();
  };

  // Filter entries based on search query
  const filteredEntries = entries.filter((entry) => {
    const hoursWorked = calculateWorkingHours(entry.time_in, entry.time_out).toFixed(2);
    const searchString = `${entry.name} ${entry.date} ${hoursWorked}`.toLowerCase();
    return searchString.includes(searchQuery.toLowerCase());
  });

  // Total Employees
  const totalEmployees = entries.length;

  // Total Working Hours Calculation
  const totalWorkingHours = entries.reduce((total, entry) => {
    return total + calculateWorkingHours(entry.time_in, entry.time_out);
  }, 0);

  // Average Working Hours
  const averageWorkingHours = totalEmployees ? (totalWorkingHours / totalEmployees).toFixed(2) : 0;

  // Print Function
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container mt-4">
      <h3>Attendance Analysis</h3>
      <div className="row mb-3">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5>Total Employees</h5>
              <p>{totalEmployees}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5>Total Working Hours</h5>
              <p>{totalWorkingHours.toFixed(2)} hours</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5>Average Working Hours per Employee</h5>
              <p>{averageWorkingHours} hours</p>
            </div>
          </div>
        </div>
      </div>

      <h3>Search Attendance</h3>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by name, date, or hours worked"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <button className="btn btn-secondary mb-3" onClick={handlePrint}>
        Print
      </button>

      <h3>Attendance List</h3>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Time In</th>
            <th>Time Out</th>
            <th>Total Hours Worked</th>
          </tr>
        </thead>
        <tbody>
          {filteredEntries.length > 0 ? (
            filteredEntries.map((entry, index) => {
              const hoursWorked = calculateWorkingHours(entry.time_in, entry.time_out).toFixed(2);
              return (
                <tr key={index}>
                  <td>{entry.name}</td>
                  <td>{entry.date}</td>
                  <td>{entry.time_in}</td>
                  <td>{entry.time_out}</td>
                  <td>{hoursWorked} hours</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="5" className="text-center">No matching records found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceList;
