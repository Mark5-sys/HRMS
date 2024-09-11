import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ data }) => {
  // Prepare the labels and data
  const labels = data.map(entry => entry.name);
  const timeInData = data.map(entry => new Date(`1970-01-01T${entry.time_in}`).getHours());
  const timeOutData = data.map(entry => new Date(`1970-01-01T${entry.time_out}`).getHours());

  // Chart Data Configuration
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Time In (Hours)',
        data: timeInData,
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
      {
        label: 'Time Out (Hours)',
        data: timeOutData,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Time and Attendance Analysis',
      },
    },
  };

  return (
    <div className="chart-container mt-4 p-4 border rounded">
      <h3 className="text-center mb-4">Time and Attendance Analysis</h3>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChart;
