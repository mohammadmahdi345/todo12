import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Input from "./input";

const Tasks = () => {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [incompleteTasks, setIncompleteTasks] = useState([]);
  const [error, setError] = useState('');

  const fetchTasks = async () => {
    try {
      const response = await axios.get('https://todo12-2.onrender.com/task/');
      const tasks = response.data;

      const completed = tasks.filter(task => task.completed === true);
      const incomplete = tasks.filter(task => task.completed === false);

      setCompletedTasks(completed);
      setIncompleteTasks(incomplete);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setError('خطا در دریافت تسک‌ها');
    }
  };

  const handelClick = async (taskid) => {
    try {
      await axios.patch(`https://todo12-2.onrender.com/task-button/${taskid}/`);
      await fetchTasks();  // 👈 بروزرسانی لیست بعد از PATCH
    } catch (error) {
      console.error("Error completing task:", error);
      setError('خطا در ثبت تسک');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="tasks-container">

      <section className="tasks-section completed-tasks">
        <h2 className="tasks-title">تسک های انجام شده:</h2>
        {completedTasks.length > 0 ? (
          completedTasks.map(task => (
            <div key={task.id} className="task-card completed">
              <h3 className="task-title">{task.title}</h3>
              <p className="task-description">{task.description}</p>
              <p className="task-date">{task.date}</p>
              {task.time_slots.map(slot => (
                <p key={slot.id} className="task-time">
                  <span className="start-time">{slot.start_time}</span>
                  <span className="end-time">{slot.end_time}</span>
                </p>
              ))}
            </div>
          ))
        ) : (
          <p className="no-tasks-message">تسکی یافت نشد</p>
        )}
      </section>

      <section className="tasks-section incomplete-tasks">
        <h2 className="tasks-title">تسک های باقی مانده:</h2>
        {incompleteTasks.length > 0 ? (
          incompleteTasks.map(task => (
            <div key={task.id} className="task-card incomplete">
              <h3 className="task-title">{task.title}</h3>
              <p className="task-description">{task.description}</p>
              <p className="task-date">{task.date}</p>
              {task.time_slots.map(slot => (
                <p key={slot.id} className="task-time">
                  <span className="start-time">{slot.start_time}</span>
                  <span className="end-time">{slot.end_time}</span>
                </p>)
              )}
              <button className="task-button8" onClick={()=>handelClick(task.id)}>کامل شده</button>
            </div>
          ))
        ) : (
          <p className="no-tasks-message">تسکی یافت نشد</p>
        )}
      </section>

      <Link to='/task-status' className="task-status">دیدن نمودار وضعیت</Link>

      {error && <p className="error-messages">{error}</p>}
    </div>
  );
};

 
export default Tasks;