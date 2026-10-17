import axios from "axios";

const API_URL =
  "http://localhost:5000/api/timeline";

// Get all timeline events
export const getTimelineEvents = async () => {
  const response = await axios.get(
    API_URL
  );

  return response.data;
};

// Get single timeline event
export const getTimelineEventById = async (
  id
) => {
  const response = await axios.get(
    `${API_URL}/${id}`
  );

  return response.data;
};