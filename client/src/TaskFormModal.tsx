import React, { useState, useEffect } from 'react';
import { Task } from '../App';

interface TaskFormModalProps {
  addTask: (newTask: Task) => void;
  updateTask: (task: Task) => void;
  editingTask: Task | null;
  closeModal: () => void;
}

const TaskFormModal: React.FC<TaskFormModalProps> = ({ addTask, updateTask, editingTask, closeModal }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [status, setStatus] = useState<'To Do' | 'In Progress' | 'Completed'>('To Do');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setStartDate(editingTask.startDate);
      setEndDate(editingTask.endDate);
      setStatus(editingTask.status);
    }
  }, [editingTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask = { id: editingTask ? editingTask.id : Date.now(), title, description, startDate, endDate, status };
    editingTask ? updateTask(newTask) : addTask(newTask);
    closeModal();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{editingTask ? 'Edit Task' : 'Add Task'}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Task Title
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Task Title" required />
          </label>
          <label>
            Description
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
          </label>
          <label>
            Start Date
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
          </label>
          <label>
            End Date
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
          </label>
          <label>
            Status
            <select value={status} onChange={(e) => setStatus(e.target.value as Task['status'])}>
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </label>
          <button type="submit">{editingTask ? 'Save' : 'Add Task'}</button>
          <button type="button" onClick={closeModal}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default TaskFormModal;
