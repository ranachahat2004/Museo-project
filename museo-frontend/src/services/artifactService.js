import axios from "axios";

const API_URL = "http://localhost:5000/api/artifacts";

// Get all artifacts
export const getArtifacts = async () => {
  const response = await axios.get(API_URL);

  return response.data;
};

// Get featured artifacts
export const getFeaturedArtifacts = async () => {
  const response = await axios.get(
    `${API_URL}/featured`
  );

  return response.data;
};

// Get single artifact
export const getArtifactById = async (id) => {
  const response = await axios.get(
    `${API_URL}/${id}`
  );

  return response.data;
};