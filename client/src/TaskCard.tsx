import React from 'react';
import { Task } from '../App';

interface TaskCardProps {
  task: Task;
  deleteTask: (id: number) => void;
  setEditingTask: (task: Task) => void;
  handleCheckboxChange: (taskId: number, checked: boolean) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, deleteTask, setEditingTask, handleCheckboxChange }) => {
  return (
    <div className="task-card">
      <input
        type="checkbox"
        onChange={(e) => handleCheckboxChange(task.id, e.target.checked)}
      />
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Start Date: {task.startDate}</p>
      <p>End Date: {task.endDate}</p>
      <button onClick={() => setEditingTask(task)}>Edit</button>
      <button onClick={() => deleteTask(task.id)}>Delete</button>
    </div>
  );
};

export default TaskCard;
