import React, { useState, useEffect } from "react";
import TaskFormModal from "./components/TaskFormModal";
import TaskGrid from "./components/TaskGrid";
import "./styles/App.css";
import "./styles/TaskModal.css";
import { getTasks, createTask, updateTask, deleteTasks } from './services/taskService';

export interface Task {
  _id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: "To Do" | "In Progress" | "Completed";
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedTaskIds, setSelectedTaskIds] = useState<string[]>([]);

  // Load tasks from backend on mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await getTasks();
        setTasks(fetchedTasks);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  // Add a new task
  const addTask = async (newTask: Task) => {
    try {
      const createdTask = await createTask(newTask);
      setTasks([...tasks, createdTask]);
      setModalOpen(false);
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };

  // Update an existing task
  const handleUpdateTask = async (updatedTask: Task) => {
    try {
      const task = await updateTask(updatedTask._id, updatedTask);
      setTasks(
        tasks.map((t) => (t._id === updatedTask._id ? task : t))
      );
      setEditingTask(null);
      setModalOpen(false);
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  // Delete selected tasks
  const deleteSelectedTasks = async () => {
    try {
      await deleteTasks(selectedTaskIds);
      setTasks(tasks.filter((task) => !selectedTaskIds.includes(task._id)));
      setSelectedTaskIds([]);
    } catch (error) {
      console.error("Failed to delete tasks:", error);
    }
  };

  // Handle checkbox changes for task selection
  const handleCheckboxChange = (taskId: string, checked: boolean) => {
    setSelectedTaskIds((prev) =>
      checked ? [...prev, taskId] : prev.filter((id) => id !== taskId)
    );
  };

  return (
    <div className="App">
      <h1>Task Management Dashboard</h1>
      <button onClick={() => setModalOpen(true)}>Add Task</button>
      {selectedTaskIds.length > 0 && (
        <button onClick={deleteSelectedTasks}>Delete Selected</button>
      )}
      <TaskGrid
        tasks={tasks}
        deleteTask={(id) => setTasks(tasks.filter((task) => task._id !== id))}
        setEditingTask={(task) => {
          setEditingTask(task);
          setModalOpen(true);
        }}
        handleCheckboxChange={handleCheckboxChange}
      />
      {isModalOpen && (
        <TaskFormModal
          addTask={addTask}
          updateTask={handleUpdateTask}
          editingTask={editingTask}
          closeModal={() => {
            setModalOpen(false);
            setEditingTask(null);
          }}
        />
      )}
    </div>
  );
};

export default App;
