import axios from "axios";

const API_URL =
  "http://localhost:5000/api/collections";

/* =========================
   CREATE COLLECTION
========================= */

export const createCollection = async (
  token,
  collectionData
) => {
  const response = await axios.post(
    API_URL,
    collectionData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

/* =========================
   GET MY COLLECTIONS
========================= */

export const getMyCollections = async (token) => {
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

/* =========================
   GET COLLECTION BY ID
========================= */

export const getCollectionById = async (
  token,
  id
) => {
  const response = await axios.get(
    `${API_URL}/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

/* =========================
   ADD ARTIFACT
========================= */

export const addArtifactToCollection = async (
  token,
  collectionId,
  artifactId
) => {
  const response = await axios.post(
    `${API_URL}/${collectionId}/artifacts`,
    {
      artifactId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

/* =========================
   REMOVE ARTIFACT
========================= */

export const removeArtifactFromCollection = async (
  token,
  collectionId,
  artifactId
) => {
  const response = await axios.delete(
    `${API_URL}/${collectionId}/artifacts/${artifactId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

/* =========================
   DELETE COLLECTION
========================= */

export const deleteCollection = async (
  token,
  collectionId
) => {
  const response = await axios.delete(
    `${API_URL}/${collectionId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};