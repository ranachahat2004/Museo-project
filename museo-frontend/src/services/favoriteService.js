import axios from "axios";

const API_URL = "http://localhost:5000/api/users";

/* =========================
   GET FAVORITE ARTIFACTS
========================= */

export const getFavoriteArtifacts = async (token) => {
  const response = await axios.get(
    `${API_URL}/favorites`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

/* =========================
   ADD FAVORITE
========================= */

export const addFavorite = async (
  token,
  artifactId
) => {
  const response = await axios.post(
    `${API_URL}/favorites/${artifactId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

/* =========================
   REMOVE FAVORITE
========================= */

export const removeFavorite = async (
  token,
  artifactId
) => {
  const response = await axios.delete(
    `${API_URL}/favorites/${artifactId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};