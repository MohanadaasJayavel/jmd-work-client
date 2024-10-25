import React from 'react';
import TaskCard from './TaskCard';
import { Task } from '../App';

interface TaskGridProps {
  tasks: Task[];
  deleteTask: (id: number) => void;
  setEditingTask: (task: Task) => void;
  handleCheckboxChange: (taskId: number, checked: boolean) => void;
}

const TaskGrid: React.FC<TaskGridProps> = ({ tasks, deleteTask, setEditingTask, handleCheckboxChange }) => {
  const statuses: Array<Task['status']> = ['To Do', 'In Progress', 'Completed'];

  return (
    <div className="task-grid">
      {statuses.map(status => (
        <div key={status} className="task-column">
          <h2>{status}</h2>
          {tasks
            .filter(task => task.status === status)
            .map(task => (
              <TaskCard
                key={task.id}
                task={task}
                deleteTask={deleteTask}
                setEditingTask={setEditingTask}
                handleCheckboxChange={handleCheckboxChange}
              />
            ))}
        </div>
      ))}
    </div>
  );
};

export default TaskGrid;
