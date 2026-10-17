import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import exhibitionRoutes from "./routes/exhibitionRoutes.js";
import artifactRoutes from "./routes/artifactRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import timelineRoutes from "./routes/timelineRoutes.js";
import collectionRoutes from "./routes/collectionRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

const app = express();

connectDB();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/api/test", (req, res) => {
  res.status(200).json({
    success: true,
    message:
      "MUSEO Backend API is working!",
  });
});

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message:
      "Welcome to MUSEO Backend API",
  });
});

/* =========================
   API ROUTES
========================= */

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/users",
  userRoutes
);

app.use(
  "/api/exhibitions",
  exhibitionRoutes
);

app.use(
  "/api/artifacts",
  artifactRoutes
);

app.use(
  "/api/categories",
  categoryRoutes
);

app.use(
  "/api/timeline",
  timelineRoutes
);

app.use(
  "/api/collections",
  collectionRoutes
);

/* =========================
   ADMIN ROUTES
========================= */

app.use(
  "/api/admin",
  adminRoutes
);

/* =========================
   404
========================= */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found",
  });
});

/* =========================
   SERVER
========================= */

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `MUSEO Backend Server running on http://localhost:${PORT}`
  );
});