import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import jsPDF from "jspdf";
import "jspdf-autotable";

const ReportGenerator = ({ entries = [] }) => {
  const [filter, setFilter] = useState('daily');

  // Get filtered data based on the selected filter
  const getFilteredData = () => {
    const now = new Date();

    if (!entries || !entries.length) return [];

    switch (filter) {
      case 'daily':
        return entries.filter(entry => {
          if (!entry.date) return false;
          return new Date(entry.date).toDateString() === now.toDateString();
        });
      case 'weekly':
        const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
        return entries.filter(entry => {
          if (!entry.date) return false;
          return new Date(entry.date) >= weekStart;
        });
      case 'monthly':
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        return entries.filter(entry => {
          if (!entry.date) return false;
          return new Date(entry.date) >= monthStart;
        });
      case 'yearly':
        const yearStart = new Date(now.getFullYear(), 0, 1);
        return entries.filter(entry => {
          if (!entry.date) return false;
          return new Date(entry.date) >= yearStart;
        });
      default:
        return entries;
    }
  };

  const filteredData = getFilteredData();

  // Calculate summary (e.g., total hours worked)
  const calculateSummary = () => {
    if (!filteredData.length) return "0.00"; 

    let totalHours = 0;
    filteredData.forEach(entry => {
      const timeIn = new Date(`1970-01-01T${entry.time_in}`);
      const timeOut = new Date(`1970-01-01T${entry.time_out}`);
      totalHours += (timeOut - timeIn) / (1000 * 60 * 60); 
    });
    return totalHours.toFixed(2);
  };

  // Download CSV report
  const downloadCSV = () => {
    if (!filteredData.length) {
      alert("No data available for the selected filter.");
      return;
    }
    
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Name,Date,Time In,Time Out\n";
    filteredData.forEach(entry => {
      csvContent += `${entry.name},${entry.date},${entry.time_in},${entry.time_out}\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `${filter}-attendance-report.csv`);
  };

  // Download PDF report
  const downloadPDF = () => {
    if (!filteredData.length) {
      alert("No data available for the selected filter.");
      return;
    }
    
    const doc = new jsPDF();
    doc.text(`${filter.charAt(0).toUpperCase() + filter.slice(1)} Attendance Report`, 20, 20);
    const tableData = filteredData.map(entry => [entry.name, entry.date, entry.time_in, entry.time_out]);
    doc.autoTable({
      head: [['Name', 'Date', 'Time In', 'Time Out']],
      body: tableData,
    });
    doc.save(`${filter}-attendance-report.pdf`);
  };

  return (
    <div className="report-generator container my-5">
      <h2 className="text-center mb-4">Time and Attendance Analysis</h2>

      <div className="row mb-4">
        <div className="col-md-4 offset-md-4">
          <label className="form-label">Filter by: </label>
          <select
            className="form-select"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
      </div>

      <div className="report-summary card shadow-sm p-4 mb-4">
        <h4>Summary:</h4>
        <p>Total Hours Worked: <strong>{calculateSummary()} hours</strong></p>
        <p>Entries: <strong>{filteredData.length}</strong></p>
      </div>

      <div className="report-buttons text-center">
        <button onClick={downloadCSV} className="btn btn-primary mx-2">
          Download CSV Report
        </button>
        <button onClick={downloadPDF} className="btn btn-secondary mx-2">
          Download PDF Report
        </button>
      </div>
    </div>
  );
};

export default ReportGenerator;
