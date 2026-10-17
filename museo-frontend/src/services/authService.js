import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

// Register user
export const registerUser = async (userData) => {
  const response = await axios.post(
    `${API_URL}/register`,
    userData
  );

  return response.data;
};

// Login user
export const loginUser = async (loginData) => {
  const response = await axios.post(
    `${API_URL}/login`,
    loginData
  );

  return response.data;
};