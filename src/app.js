import express from "express";
import { setCorsHeaders } from "./_cors.js";
import movieRoutes from "./routes/movieRoutes.js";
const app = express();
// Middleware
app.use(setCorsHeaders);
app.use(express.json());
// Health check
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    name: "Lurid Origins API",
    version: "1.0.0",
  });
});
// Routes
app.use("/api/movies", movieRoutes);
export default app;