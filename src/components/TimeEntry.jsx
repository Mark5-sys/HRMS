import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TimeEntry = ({ onAddEntry }) => {
  const [entry, setEntry] = useState({ name: '', date: '', time_in: '', time_out: '' });
const navigate = useNavigate()

  const handleChange = (e) => {
    setEntry({ ...entry, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/entries', entry);
    //   onAddEntry(response.data);
      setEntry({ name: '', date: '', time_in: '', time_out: '' });
      navigate('/attendance/list')
    } catch (error) {
      console.error('Error submitting entry:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container p-4 mt-3 border rounded">
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          className="form-control"
          placeholder="Enter name"
          value={entry.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="date" className="form-label">Date</label>
        <input
          type="date"
          name="date"
          id="date"
          className="form-control"
          value={entry.date}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="time_in" className="form-label">Time In</label>
        <input
          type="time"
          name="time_in"
          id="time_in"
          className="form-control"
          value={entry.time_in}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="time_out" className="form-label">Time Out</label>
        <input
          type="time"
          name="time_out"
          id="time_out"
          className="form-control"
          value={entry.time_out}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="btn btn-primary">Add Entry</button>
    </form>
  );
};

export default TimeEntry;
