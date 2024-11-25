import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import Swal from 'sweetalert2'; // SweetAlert2
import { useDispatch, useSelector } from 'react-redux';
import { API } from '../config';
import { employeesActions } from '../store/employee_store';

const TimeEntry = ({ onAddEntry }) => {
  const [entry, setEntry] = useState({ name: '', date: '', time_in: '', time_out: '' });
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const activeEmployees = useSelector((state) => state.employees.activeEmployees);

  useEffect(() => {
    const fetchEmployees = async () => {
      console.log('Time Entry Component');
      try {
        const response = await axios.get(`${API}/employee`);
        setEmployees(response.data.data);
        console.log('Employees', response.data.data);
        dispatch(
          employeesActions.setActiveEmployees({
            activeEmployees: response.data.data,
          })
        );
        setLoading(false);
      } catch (err) {
        setError('Error fetching employees.');
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleSelectChange = (selectedOption) => {
    setEntry({ ...entry, name: selectedOption?.value || '' });
  };

  const handleChange = (e) => {
    setEntry({ ...entry, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Show SweetAlert loader
    Swal.fire({
      title: 'Submitting Entry',
      text: 'Please wait while we save your data...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      await axios.post('http://127.0.0.1:8000/api/entries', entry);

      // Clear the form and navigate
      setEntry({ name: '', date: '', time_in: '', time_out: '' });

      // Success alert
      Swal.fire({
        icon: 'success',
        title: 'Entry Added',
        text: 'The time entry was successfully added!',
      });

      navigate('/attendance/list');
    } catch (error) {
      // Error alert
      Swal.fire({
        icon: 'error',
        title: 'Submission Failed',
        text: 'There was an error saving the entry. Please try again.',
      });

      console.error('Error submitting entry:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const options = activeEmployees.map((employee) => ({
    value: employee.first_name + ' ' + employee.surname,
    label: employee.first_name + ' ' + employee.surname + ' - (' + employee.department.name + ')',
  }));

  return (
    <form onSubmit={handleSubmit} className="container p-4 mt-3 border rounded">
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <Select
          options={options}
          value={options.find((option) => option.value === entry.name) || null}
          onChange={handleSelectChange}
          placeholder="Select an employee"
          isClearable
        />
      </div>

      <div className="mb-3">
        <label htmlFor="date" className="form-label">
          Date
        </label>
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
        <label htmlFor="time_in" className="form-label">
          Time In
        </label>
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
        <label htmlFor="time_out" className="form-label">
          Time Out
        </label>
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

      <button type="submit" className="btn btn-primary">
        Add Entry
      </button>
    </form>
  );
};

export default TimeEntry;
