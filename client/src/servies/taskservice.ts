import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const getTasks = async () => {
  const response = await axios.get(`${API_URL}/tasks`);
  return response.data;
};

export const createTask = async (task: any) => {
  const response = await axios.post(`${API_URL}/tasks`, task);
  return response.data;
};

export const updateTask = async (taskId: string, task: any) => {
  const response = await axios.put(`${API_URL}/tasks/${taskId}`, task);
  return response.data;
};

export const deleteTasks = async (taskIds: string[]) => {
  const response = await axios.delete(`${API_URL}/tasks`, { data: { ids: taskIds } });
  return response.data;
};
