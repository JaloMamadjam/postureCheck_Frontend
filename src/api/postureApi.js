import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const getLatestPosture = () =>
  axios.get(`${API_URL}/posture/latest`);

export const getPostureHistory = () =>
  axios.get(`${API_URL}/posture/history`);

export const calibrateSensor = async(data) => {
  try {
    const response = await axios.post(`${API_URL}/posture/calibrate`, data);
    return response.data;
  } catch (error) {
    console.error(error); // veja o erro real do servidor aqui
    throw error;
  }
}
