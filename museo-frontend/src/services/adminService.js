import axios from "axios";

const API_URL =
  "http://localhost:5000/api/admin";

/* =========================
   ADMIN DASHBOARD
========================= */

export const getAdminDashboard = async (
  token
) => {
  const response = await axios.get(
    `${API_URL}/dashboard`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

/* =========================
   GET ALL USERS
========================= */

export const getAllUsers = async (
  token
) => {
  const response = await axios.get(
    `${API_URL}/users`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

/* =========================
   UPDATE USER STATUS
========================= */

export const updateUserStatus = async (
  token,
  userId,
  isActive
) => {
  const response = await axios.put(
    `${API_URL}/users/${userId}/status`,
    {
      isActive,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};