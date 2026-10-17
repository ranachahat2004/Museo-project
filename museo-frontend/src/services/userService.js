import axios from "axios";

const API_URL = "http://localhost:5000/api/users";

// Get logged-in user's profile
export const getMyProfile = async (token) => {
  const response = await axios.get(
    `${API_URL}/profile`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// Update logged-in user's profile
export const updateMyProfile = async (
  token,
  userData
) => {
  const response = await axios.put(
    `${API_URL}/profile`,
    userData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};