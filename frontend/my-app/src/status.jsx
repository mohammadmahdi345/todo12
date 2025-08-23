import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const TaskStatus = () => {
  
  const [status, setStatus] = useState({
    total_tasks: 0,
    completed_tasks: 0,
    incomplete_tasks: 0,
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await axios.get('http://localhost:8007/task-status/');
        setStatus(response.data);
      } catch (err) {
        setError('خطا در دریافت وضعیت تسک‌ها');
      }
    };

    fetchStatus();
  }, []);

  const chartData = {
    labels: ['انجام‌شده', 'باقی‌مانده'],
    datasets: [
      {
        label: 'تسک‌ها',
        data: [status.completed_tasks, status.incomplete_tasks],
        backgroundColor: ['#27ae60', '#3498db'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="task-status-container">
      <div className="header-row">
        <h2 className="task-status-title">وضعیت تسک‌ها</h2>
        <Link to="/tasks" className="back-to-tasks-btn">
          ← بازگشت به تسک‌ها
        </Link>
      </div>

      {error && <p className="error-messages">{error}</p>}

      {!error && (
        <>
          <ul className="status-list">
            <li>کل تسک‌ها: {status.total_tasks}</li>
            <li>تسک‌های انجام‌شده: {status.completed_tasks}</li>
            <li>تسک‌های باقی‌مانده: {status.incomplete_tasks}</li>
          </ul>

          <Pie data={chartData} />
        </>
      )}
    </div>
  );
};

export default TaskStatus;