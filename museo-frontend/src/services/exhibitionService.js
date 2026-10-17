import axios from "axios";

const API_URL = "http://localhost:5000/api/exhibitions";

// Get all exhibitions
export const getExhibitions = async () => {
  const response = await axios.get(`${API_URL}`);

  return response.data;
};

// Get featured exhibitions
export const getFeaturedExhibitions = async () => {
  const response = await axios.get(
    `${API_URL}/featured`
  );

  return response.data;
};

// Get single exhibition by ID
export const getExhibitionById = async (id) => {
  const response = await axios.get(
    `${API_URL}/${id}`
  );

  return response.data;
};